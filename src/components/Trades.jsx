import React, { useEffect } from "react";
import { connect } from "react-redux";

const Trades = props => {

  const getGroups = () => {
    let summary = {}
    for (let i=0; i<props.savedTrades.data.length; i++) { 
      let ticker = props.savedTrades.data[i]['Ticker']
      if (summary[ticker] === undefined ) {
        let details = {}
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
    getStats(summary)
  }

  let tradeHistory;
  const getStats = (summary) => {
    for (let key in summary) {
      return (
        <div>

        </div>
      )
    }
  }

  useEffect(() => {
    if (props.savedTrades !== null) {
      getGroups()
    }
  }, [])

  return (
    <div>
      <section className="bg-verydark trades" id="graphs">
        <div className="container-wide">
          <div className="foreground bg-dark equity">
            <h3 className="left-align">Preformance</h3>
            <h4 className="left-align">Ticker List</h4>
            <div className="border-top">
              <p>{tradeHistory}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="footer bg-dark">
        <p >Copyright © TradeLogs 2022. All rights reserved.</p>
      </section>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    savedTrades: state.savedTrades
  };
};

export default connect(mapStateToProps)(Trades)