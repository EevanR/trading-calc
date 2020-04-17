import React, { useState, useEffect } from "react";
import Plays from './Plays'
import SetUp from './SetUp'
import { connect } from "react-redux";

const Form = props => {
  const [answer, setAnswer] = useState(null)
  const [targetPrice, setTargetPrice] = useState(null)
  const [targetPrice2, setTargetPrice2] = useState(null)
  const [targetPrice3, setTargetPrice3] = useState(null)
  const [stopPrice, setStopPrice] = useState(null)
  const [stop, setStop] = useState(null)
  const [ticker, setTicker] = useState(null)
  const [stockPrice, setStockPrice] = useState(null)
  const [good, setGood] = useState(false)
  const [count, setCount] = useState(0)

  const submit = (e) => {
    e.preventDefault();
    if (props.preReq === props.checkList.length) {
      let bp = parseFloat(e.target.bp.value)
      let risk = parseFloat(e.target.risk.value)
      let stop = parseFloat(e.target.price.value - e.target.stop.value)
      let stockPrice = parseFloat(e.target.price.value)
      let ticker = e.target.ticker.value

      let maxShares = Math.floor(risk / stop)
      let bpMax = Math.floor(bp / stockPrice)

      let pt = stockPrice + stop
      let pt2 = stockPrice + stop + stop
      let pt3 = stockPrice + stop*3
      let sp = stockPrice - stop
      setTargetPrice(pt.toFixed(2))
      setTargetPrice2(pt2.toFixed(2))
      setTargetPrice3(pt3.toFixed(2))
      setStopPrice(sp.toFixed(2))

      if (bpMax < maxShares) {
        setAnswer(bpMax)
        setStop(stop.toFixed(2))
        setTicker(ticker)
        setStockPrice(stockPrice)
        setGood(true)
      } else {
        setAnswer(maxShares)
        setStop(stop.toFixed(2))
        setTicker(ticker)
        setStockPrice(stockPrice)
        setGood(true)
      }
    } else {
      alert("Trade doesn't meet requirements!!!")
    }
  }

  const setStorage = () => {
    const input = {
      ticker: ticker, 
      stockPrice: stockPrice, 
      shares: answer, 
      tp: targetPrice, 
      sp: stopPrice, 
      stop: stop,
      targets: [targetPrice, targetPrice2, targetPrice3],
      setup: props.setUp,
      date: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    }
    let tickers = []
    if (sessionStorage.getItem('tickers')) {
      tickers = JSON.parse(sessionStorage.getItem('tickers'))
    }
    tickers.push([Math.floor(Math.random() * 1000), input])
    sessionStorage.setItem('tickers', JSON.stringify(tickers))
    setGood(false)
    setCount(count + 1)
  }

  useEffect(() => {
    if (good === true ) {
      setStorage()
    }
  }, [good])
  
  return (
    <>
      <div className="ui form">
        <form id="main-form" onSubmit={submit}>
          <div className="fields">
            <div className="field">
              <label>Buying Power</label>
              <input
                required
                type="text"
                placeholder="$"
                name="bp"
                id="bp"
              />
            </div>
            <div className="field">
              <label>$Ticker</label>
              <input
                required
                type="text"
                name="ticker"
                id="ticker"
              />
            </div>
            <div className="field">
              <label>Upper Line</label>
              <input
                required
                type="text"
                placeholder="$"
                name="price"
                id="price"
              />
            </div>
            <div className="field">
              <label id="risk">Stop Price</label>
              <input
                type="text"
                required
                placeholder="$"
                name="stop"
                id="stop"
              />
            </div>
            <div className="field">
              <label id="risk">Risk $</label>
              <input
                type="text"
                required
                placeholder="$"
                defaultValue={7}
                name="risk"
                id="risk"
              />
            </div>
          </div>
          <SetUp />
          <br/>
          <button id='calculate'>Calculate</button>
        </form>
      </div>
      { count > 0 && (
      <>
        <div className="info">
          <div>
            <h2 className="result-heading" >Details</h2>
            <h3>Entry: {stockPrice.toFixed(2)}</h3>    
            <h3>Position Size: <span id="color"> {answer}</span></h3>
            <h3 id="risk">Stop: {stopPrice}</h3>
          </div>
          <div>
            <h2 className="result-heading" >Targets</h2>
            <h3>1R Target: <span id="green"> ${targetPrice}</span></h3>
            <h3>2R Target: <span id="green"> ${targetPrice2}</span></h3>
            <h3>3R Target: <span id="green"> ${targetPrice3}</span></h3>
          </div>
        </div>
        <Plays count={count} />
      </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    preReq: state.preReq,
    checkList: state.checkList,
    setUp: state.setUp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPrereq: data => {
      dispatch({ type: "SET_PREREQ", payload: data });
    },
    setCheckList: array => {
      dispatch({ type: "SET_CHECKLIST", payload: array });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);