import React, { useEffect } from "react";
import { connect } from "react-redux";

const Trades = props => {

  const getGroups = () => {
    let summary = {}
    for (let i=0; i<props.savedTrades.data.length; i++) { 
      let ticker = props.savedTrades.data[i]['Ticker']
      if (summary[ticker] === undefined ) {
        summary[ticker] = ticker
        summary["trades"] = 1
        props.savedTrades.data[i]["GrossProfit"] > 0 ? (summary["wins"] = 1) && (summary["successPercent"] = "100%") : (summary["wins"] = 0) && (summary["successPercent"] = "0%") 
        summary["pnl"] = props.savedTrades.data[i]["GrossProfit"]
      } else {
        
      }
    }
    
    getStats(summary)
  }

  let tradeHistory;
  const getStats = (history) => {
    for (let key in history) {
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