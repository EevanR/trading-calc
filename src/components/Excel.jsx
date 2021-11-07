import React, { useState } from 'react';
import * as XLSX from 'xlsx'
import { connect } from "react-redux";
import { sendExcel, destroyExcel, updateExcel } from '../modules/trades';

const Excel = props => {
  const [uploadBox, setUploadBox] = useState(["hidden", 0])

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
      props.setSavedTrades(response.data)
    }
  }

  const updateEntry = async (data) => {
    typeof(data) === "number" ? option = "shortFees" : option = "trades"
    let response = await updateExcel(data, option, props.savedTrades.id)
    if (response.status === 200) {
      props.setSavedTrades(response.data)
    }
  }

  const deleteExcel = async () => {
    let response = await destroyExcel(props.savedTrades.id)
    if (response.status === 200) {
      props.setMessage(`${response.data.message}. Charts will clear next time you sign in.`)
      props.setSavedTrades(null)
      setTimeout(() => {
        props.setMessage("")
      }, 3000);
    }
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

  return (
    <>
      <div className="excel section-5 bg-ivory">
        <div className="split">
          <button onClick={() => setUploadBox(["visible", 1])} className="ui button">Upload</button> 
          <button className="ui button">Clear Uploaded Data</button> 
          <div className="signin container">
            <div style={
                {visibility: `${uploadBox[0]}`, 
                opacity: `${uploadBox[1]}`}
                }
              className="signin-box">
              <i onClick={() => setUploadBox(["hidden", 0])} className="x icon icon"></i>
              <input 
                type="file" 
                onChange={(e) => {
                  const file = e.target.files[0]
                  readExcel(file)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    savedTrades: state.savedTrades,
    savedFees: state.savedFees,
    message: state.message
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Excel)