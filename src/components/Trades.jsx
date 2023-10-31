import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form } from 'semantic-ui-react'

const Trades = props => {
  const [tradesArray, setTradesArray] = useState([])

  const searchHistory = (e) => {
    e.preventDefault();
    let ticker = e.target.ticker.value
    searchTrades(ticker)
  }

  let inputs;
  const searchTrades =  (ticker) => {
    let newArray = []
    for (let i=0; i<props.savedTrades.data.length; i++) {
      if (props.savedTrades.data[i]['Ticker'] === ticker) {
        newArray.push(props.savedTrades.data[i])
      }
    }
    debugger
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <section className="bg-verydark trades" id="graphs">
        <div className="container-wide">
          <div className="foreground bg-dark">
          <Form onSubmit={searchHistory}>
            <input placeholder="Ticker" required type='text' name="ticker" id="ticker"/>
            <button className="ui button" id="loadChart" type="submit">Search</button>
          </Form>       
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

export default connect(mapStateToProps)(Trades);