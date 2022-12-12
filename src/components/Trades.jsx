import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form } from 'semantic-ui-react'

const Trades = props => {
  const [tradesArray, setTradesArray] = useState([])

  const getGroups = () => {
    let summary = {}
    for (let i=0; i<props.savedTrades.data.length; i++) { 
      let ticker = props.savedTrades.data[i]['Ticker']
      if (summary[ticker] === undefined ) {
        let details = {}
        details['ticker'] = ticker
        details['count'] = 1
        props.savedTrades.data[i]["GrossProfit"] > 0 ? (details["wins"] = 1) && (details["successPercent"] = 1) : (details["wins"] = 0) && (details["successPercent"] = 0) 
        details["pnl"] = props.savedTrades.data[i]["GrossProfit"]
        details['trades'] = [{date: props.savedTrades.data[i]['Date'], profit: props.savedTrades.data[i]["GrossProfit"]}]
        summary[ticker] = details
      } else {
        summary[ticker].count++
        summary[ticker].pnl = summary[ticker].pnl + props.savedTrades.data[i]["GrossProfit"]
        props.savedTrades.data[i]["GrossProfit"] > 0 && summary[ticker].wins++
        summary[ticker].successPercent = (summary[ticker].wins/summary[ticker].count)
        summary[ticker].trades.push({date: props.savedTrades.data[i]['Date'], profit: props.savedTrades.data[i]["GrossProfit"]})
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

  const searchHistory = () => {

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
          <Form onSubmit={searchHistory}>
            <input placeholder="Ticker" required type='text' name="ticker" id="ticker"/>
            <button className="ui button" id="loadChart" type="submit">Search</button>
          </Form>            
          {tradesArray.map(entry => {
              return (
                <div className="trades">
                  <h4 className="border-top">{entry.ticker}</h4><i className="angle down icon"></i>
                  <p>Total Profits: ${(entry.pnl).toFixed(2)}</p>
                  <p>Trade Count: {entry.count}</p>
                  <p>Wins: {entry.wins}</p>
                  <p>Win %: {((entry.wins/entry.count).toFixed(2))*100}</p>
                  <h4>Breakdown</h4>
                  {entry.trades.map(trade => {
                    debugger
                    return (
                      <>
                        <p>{trade.date}</p>
                        <p>${trade.profit.toFixed(2)}</p>
                      </>
                    )
                  })}
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