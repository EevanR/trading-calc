import React from 'react';
import * as XLSX from 'xlsx'
import { connect } from "react-redux";
import { sendExcel, destroyExcel, updateExcel } from '../modules/trades';
import { logout } from "../modules/auth";
import { createPortal } from "../modules/subscription";

const Excel = props => {
  let option = "update"

  const organizeExcel = async (d, option) => {
    let groupedTrades = []
    let groups = {}

    for (let i=0; i<d.length; i++) {
      let ticker = d[i]["Symbol"]

      groups[ticker] === undefined && (groups[ticker] = {Ticker: ticker, NetProfit: 0, GrossProfit: 0, ShareCount: 0, TimeStamp: 0, Date: "", Commissions: 0})
      groups[ticker]["NetProfit"] += d[i]["Net Proceeds"]
      groups[ticker]["GrossProfit"] += d[i]["Gross Proceeds"]
      groups[ticker]["ShareCount"] === 0 && (groups[ticker]["TimeStamp"] = d[i]["Exec Time"]) && (groups[ticker]["Date"] = d[i]["T/D"])
      d[i]["Side"] === "B" || d[i]["Side"] === "BC" ? groups[ticker]["ShareCount"] += d[i]["Qty"] : groups[ticker]["ShareCount"] -= d[i]["Qty"]
      groups[ticker]["Commissions"] += (d[i]["Comm"] + d[i]["NSCC"])

      if (groups[ticker]["ShareCount"] === 0) {
        groupedTrades.push(groups[ticker])
        delete groups[ticker]
      }
    }
    option === "update" ? updateEntry(groupedTrades) : createEntry(groupedTrades)
  }

  const organizeShortFees = async (d, option) => {
    let sum = 0
    for (let i=0; i<d.length; i++) {
      if (d[i]["Note"].split(" ", 1)[0] === "Pre-Borrow" || d[i]["Note"].split(" ", 1)[0] === "Locate" || d[i]["Note"].split(" ", 1)[0] === "Short") {
        sum -= d[i]["Withdraw"]
        sum += d[i]["Deposit"]
    }}
    option === "update" ? updateEntry(sum) : createEntry(sum)
  }

  const createEntry = async (data) => {
    typeof(data) === "number" ? option = "shortFees" : option = "trades"
    let response = await sendExcel(data, option)
    if (response.status === 200) {
      props.setSavedTrades(response.data.excel)
    }
  }

  const updateEntry = async (data) => {
    typeof(data) === "number" ? option = "shortFees" : option = "trades"
    let response = await updateExcel(data, option, props.savedTrades.id)
    if (response.status === 200) {
      props.setSavedTrades(response.data.excel)
    }
  }

  const deleteExcel = () => {
    const runDestroy = async () => {
      let response = await destroyExcel(props.savedTrades.id)
      if (response.status === 200) {
        alert("Charts will clear next time you sign in.")
        props.setSavedTrades(null)
        setTimeout(() => {
          props.setMessage("")
        }, 3000);
      }
    }
    props.savedTrades === null ? alert("No data to delete") : runDestroy()
  }

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e) => {
        const bufferArray = e.target.result

        const wb = XLSX.read(bufferArray, { type: 'buffer' })

        const wsname = wb.SheetNames[0]

        const ws = wb.Sheets[wsname]

        const data = XLSX.utils.sheet_to_json(ws)

        resolve(data)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })

    promise.then((d) => {
      switch (true) {
        case d[0]["T/D"] === undefined && props.savedTrades !== null:
          let q1 = window.confirm("Short Fees Detected. Add to or overwrite current DataSet?");
          if (q1 == true) {
            organizeShortFees(d, option);
          } else {
            props.setMessage = "Short Fees not added";
          }
          break;
        case d[0]["T/D"] !== undefined && props.savedTrades !== null:
          let q2 = window.confirm("Trade Summary Detected. Add to current DataSet?");
          if (q2 == true) {
            organizeExcel(d, option);
          } else {
            props.setMessage = "Trade Summary not added";
          }
          break;
        case d[0]["T/D"] !== undefined && props.savedTrades === null:
          organizeExcel(d);
          break;
        default: organizeShortFees(d);
      }
    })
  }

  const onLogout = async () => {
    sessionStorage.clear()
    let response = await logout();
    if (response.data.success !== true) {
      alert("SignOut failed unexpectedly")
    }
  }

  const portalSession = async () => {
    let response = await createPortal()
  }

  let subscribe;
  if (props.userAttrs !== null && props.userAttrs.role === "subscriber") {
    subscribe = (
      <>
        <h4 onClick={() => portalSession()}>
          Manage Subscription
        </h4>
      </>
    )
  } else {
    subscribe = (
      <>
        <h4 onClick={() => props.paywall === "paywall-up" ? props.setPaywall("paywall") : props.setPaywall("paywall-up")}>Subscribe</h4>
      </>
    )
  }
  
  return (
    <>
      <div className="excel bg-dark">
        {subscribe}
        <label>
          <input 
            type="file" 
            onChange={(e) => {
              const file = e.target.files[0]
              readExcel(file)
            }}
          />
          <span className="upload-btn">Upload</span>
        </label>
        <h4 onClick={() => deleteExcel()}>Clear Data</h4>
        <a href="/"><h4 onClick={() => onLogout()}>Logout</h4></a>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    savedTrades: state.savedTrades,
    savedFees: state.savedFees,
    message: state.message,
    userAttrs: state.userAttrs,
    paywall: state.paywall
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSavedTrades: data => {
      dispatch({ type: "SET_SAVEDTRADES", payload: data });
    },
    setSavedFees: data => {
      dispatch({ type: "SET_SAVEDFEES", payload: data });
    },
    setMessage: string => {
      dispatch({ type: "SET_MESSAGE", payload: string })
    },
    setPaywall: paywall => {
      dispatch({ type: "SET_PAYWALL", payload: paywall })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Excel)