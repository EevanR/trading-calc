import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

const Plays = props => {
  const [tickers, setTickers] = useState(null)

  const getTickers = () => {
    let storage = JSON.parse(sessionStorage.getItem('tickers'))
    setTickers(storage.reverse())
  }

  const deleteItem = (e) => {
    let tickers = []
    let storage = JSON.parse(sessionStorage.getItem('tickers'))
    storage.forEach(item => {
      if (item[0] !== e) {
        tickers.push(item)
      }
    })
    sessionStorage.setItem('tickers', JSON.stringify(tickers))
    getTickers()
  }

  useEffect(() => {
    if (props.count > 0) {
      getTickers()
    }
  }, [props.count, props.message])

  return (
    <>
      <h2>{props.message}</h2>
      <h2>Plays</h2>
      <div className="plays-grid">
        <h4>Ticker</h4>
        <h4>Entry</h4>
        <h4>Shares</h4>
        <h4>Target Prices</h4>
        <h4>Stop Price</h4>
        <h4>Stop $</h4>
        <h4>Setup</h4>
        <h4>Delete</h4>
        { tickers !== null && (
          tickers.map(ticker => {
            let name = ticker[1].inputs["ticker"]
            let entry = ticker[1].inputs["stockPrice"]
            return (
            <>
              <p>${name.toUpperCase()}</p>
              <p>$ {entry}</p>
              <p>{ticker[1].shares}</p>
              <p>{ticker[1].tradeParams["pts"][0]}, {ticker[1].tradeParams["pts"][1]}, {ticker[1].tradeParams["pts"][2]}</p>
              <p>{ticker[1].tradeParams["stopPrice"]}</p>
              <p>{ticker[1].inputs["stop"]}</p>
              <p>{ticker[1].setup}</p>
              <h4 onClick={() => deleteItem(ticker[0])} id="delete" className="ticker">X</h4>
            </>
            )
          })
        )}
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    count: state.count,
    message: state.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCount: data => {
      dispatch({ type: "SET_COUNT", payload: data });
    },
    setMessage: string => {
      dispatch({ type: "SET_MESSAGE", payload: string })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plays);