import React from 'react';
import { connect } from "react-redux";

const Trades = props => {
  
  let tradeHistory;
  if (props.savedTrades !== null) {
    tradeHistory = props.savedTrades.map(entry => {
      return (
        <>
        
        </>
      )
    })
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