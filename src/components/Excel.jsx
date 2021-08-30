import React, { useState } from 'react';
import * as XLSX from 'xlsx'
import { connect } from "react-redux";
import { sendExcel, destroyExcel } from '../modules/trades';

const Excel = props => {
  const [excelType, setExcelType] = useState("")

  const saveExcel = async (d) => {
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

    let response = await sendExcel(groupedTrades)
    if (response.status === 200) {
      props.setSavedTrades(response.data)
    }
  }

  const deleteOldExcel = async (d) => {
    let response = await destroyExcel(props.savedTrades.id)
    if (response.status === 200) {
      saveExcel(d)
    }
  }

  const saveFees = async (d) => {
    let sum = 0
    for (let i=0; i<d.length; i++) {
      if (d[i]["Note"].split(" ", 1)[0] === "Pre-Borrow" || d[i]["Note"].split(" ", 1)[0] === "Locate") {
        sum -= d[i]["Withdraw"]
        sum += d[i]["Deposit"]
    }}

    let response = await sendFees(sum)
    if (response.status === 200) {
      props.setSavedFees(sum)
    }
  }

  const deleteOldfees = async () => {
    let response = await sendFees()
    if (response.status === 200) {
      saveFees(d)
    }
  }

  const dropdownOptions = [
    {key: 1, value: 1, text: "Trades/Comms"},
    {key: 2, value: 2, text: "Locate Fees"}
  ]

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
      if (d[0]["T/D"] === undefined) {
        props.savedFees === null ? saveFees(d) : deleteOldfees(d)
      } else {
        props.savedTrades === null ? saveExcel(d) : deleteOldExcel(d)
      }
    })
  }

  return (
    <>
      <div>
        <input 
          type="file" 
          onChange={(e) => {
            const file = e.target.files[0]
            readExcel(file)
          }}
        />
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    savedTrades: state.savedTrades,
    savedFees: state.savedFees
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSavedTrades: data => {
      dispatch({ type: "SET_SAVEDTRADES", payload: data });
    },
    setSavedFees: data => {
      dispatch({ type: "SET_SAVEDFEES", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Excel)