import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form } from 'semantic-ui-react'

const Trades = ({ savedTrades }) => {
  const [tradesArray, setTradesArray] = useState([]);
  const [stats, setStats] = useState({ Wins: 0, PnL: 0, Largest: 0, Smallest: 0 });

  const searchHistory = (e) => {
    e.preventDefault();
    const ticker = (e.target.ticker.value).toUpperCase();
    const newArray = savedTrades.data.filter((trade) => trade.Ticker === ticker);
    if (newArray.length !== 0) {
      setTradesArray(newArray);
      findStats(newArray);
    } else {
      alert(`No trade history for ${ticker}!`)
      setTradesArray([])
    }
  };

  const findStats = (trades) => {
    const newStats = trades.reduce(
      (accumulator, trade) => {
        const grossProfit = Number(trade.GrossProfit.toFixed(2));
        if (grossProfit > 0) {
          accumulator.Wins++;
          accumulator.PnL += grossProfit;
          accumulator.Largest = Math.max(accumulator.Largest, grossProfit);
        } else {
          accumulator.PnL += grossProfit;
          accumulator.Smallest = Math.min(accumulator.Smallest, grossProfit);
        }
        return accumulator;
      },
      { Wins: 0, PnL: 0, Largest: 0, Smallest: 0 }
    );
    setStats(newStats);
  };

  return (
    <>
      <section className="bg-verydark trades" id="graphs">
        <div className="container-wide">
          <div className="foreground bg-dark">
            <Form onSubmit={searchHistory}>
              <input placeholder="Ticker" required type="text" name="ticker" id="ticker" />
              <button className="ui button" id="loadChart" type="submit">
                Search
              </button>
            </Form>
          </div>
        </div>
        {tradesArray.length > 0 && (
          <div>
            <h2>New Array Contents:</h2>
            <h3># of Trades: {tradesArray.length}</h3>
            <p>
              Track Record: {stats.Wins} Wins out of {tradesArray.length} trades
              <br />
              Total Profits: ${stats.PnL}
              <br />
              Largest Winning Trade: ${stats.Largest}
              <br />
              Largest Losing Trade: ${stats.Smallest}
            </p>
          </div>
        )}
      </section>
      <section className="footer bg-dark">
        <p>Copyright © TradeLogs 2022. All rights reserved.</p>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    savedTrades: state.savedTrades,
  };
};

export default connect(mapStateToProps)(Trades);