import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const Trades = props => {
  const [tradesArray, setTradesArray] = useState([])

  const getGroups = () => {
    let summary = {}
    for (let i=0; i<props.savedTrades.data.length; i++) { 
      let ticker = props.savedTrades.data[i]['Ticker']
      if (summary[ticker] === undefined ) {
        let details = {}
        details['ticker'] = ticker
        details['trades'] = 1
        props.savedTrades.data[i]["GrossProfit"] > 0 ? (details["wins"] = 1) && (details["successPercent"] = 1) : (details["wins"] = 0) && (details["successPercent"] = 0) 
        details["pnl"] = props.savedTrades.data[i]["GrossProfit"]
        summary[ticker] = details
      } else {
        summary[ticker].trades++
        summary[ticker].pnl = summary[ticker].pnl + props.savedTrades.data[i]["GrossProfit"]
        props.savedTrades.data[i]["GrossProfit"] > 0 && summary[ticker].wins++
        summary[ticker].successPercent = (summary[ticker].wins/summary[ticker].trades)
      }
    }
    buildArray(summary)
  }

  const buildArray = (summary) => {
    let list = [] 
    for (let key in summary) {
      list.push(summary[key])
    }
    setTradesArray(list)
  }

  useEffect(() => {
    if (props.savedTrades !== null) {
      getGroups()
    }
  }, [])

  return (
    <>
      <section className="bg-verydark trades" id="graphs">
        <div className="container-wide">
          <div className="foreground bg-dark">
            <h3 className="left-align">Preformance</h3>
            <h4 className="left-align border-top">Ticker List</h4>
            {tradesArray.map(entry => {
              return (
                <div className="trades">
                  <p>{entry.ticker}</p>
                  <p>{entry.trades}</p>
                  <p>{(entry.pnl).toFixed(2)}</p>
                  <p>{entry.wins}</p>
                  <p>Win %: {((entry.wins/entry.trades).toFixed(2))*100}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="footer bg-dark">
        <p >Copyright © TradeLogs 2022. All rights reserved.</p>
      </section>
    </>
  )
};

const mapStateToProps = state => {
  return {
    savedTrades: state.savedTrades
  };
};

export default connect(mapStateToProps)(Trades)