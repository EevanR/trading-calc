import React from 'react';
import { connect } from "react-redux";

const Trades = props => {
  
  let tradeHistory;
  if (props.savedTrades !== null) {
    let history = {}
    for (let i=0; i<props.savedTrades.data.length; i++) { 
      let group = props.savedTrades.data[i]['Ticker']
      if (history[group] === undefined ) {
        history[group] = [props.savedTrades.data[i]]
      } else {
        history[group].push(props.savedTrades.data[i])
      }
    }
  } else {
    tradeHistory = "No Trade History"
  }

  return (
    <div>
      <section className="bg-verydark trades" id="graphs">
        <div className="container-wide">
          <div className="foreground bg-dark equity">
            <h3 className="left-align">Preformance</h3>
            <h4 className="left-align">Ticker List</h4>
            <div className="border-top">
              {tradeHistory}
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