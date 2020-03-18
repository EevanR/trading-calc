import React, { useState, useEffect } from "react";
import Plays from './Plays'

const Form = () => {
  const [answer, setAnswer] = useState(null)
  const [targetPrice, setTargetPrice] = useState(null)
  const [stopPrice, setStopPrice] = useState(null)
  const [stop, setStop] = useState(null)
  const [ticker, setTicker] = useState(null)
  const [stockPrice, setStockPrice] = useState(null)
  const [good, setGood] = useState(false)
  const [count, setCount] = useState(0)

  const submit = (e) => {
    e.preventDefault();
    let bp = parseFloat(e.target.bp.value)
    let risk = parseFloat(e.target.risk.value)
    let stop = parseFloat(e.target.stop.value)
    let stockPrice = (parseFloat(e.target.price.value) + 0.05)
    let ticker = e.target.ticker.value

    let maxShares = Math.floor(risk / stop)
    let bpMax = Math.floor(bp / stockPrice)

    let pt = stockPrice + stop
    let sp = stockPrice - stop
    setTargetPrice(pt.toFixed(2))
    setStopPrice(sp.toFixed(2))

    if (bpMax < maxShares) {
      setAnswer(bpMax)
      setStop(stop)
      setTicker(ticker)
      setStockPrice(stockPrice)
      setGood(true)
    } else {
      setAnswer(maxShares)
      setStop(stop)
      setTicker(ticker)
      setStockPrice(stockPrice)
      setGood(true)
    }
  }

  const setStorage = () => {
    const input = {
      ticker: ticker, 
      stockPrice: stockPrice, 
      shares: answer, 
      tp: targetPrice, 
      sp: stopPrice, 
      stop: stop
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
        <form onSubmit={submit}>
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
              <label>Line</label>
              <input
                required
                type="text"
                placeholder="$"
                name="price"
                id="price"
              />
            </div>
            <div className="field">
              <label id="risk">Stop $</label>
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
                defaultValue={10}
                name="risk"
                id="risk"
              />
            </div>
          </div>
          <button id='calculate'>Calculate</button>
        </form>
      </div>
      { count > 0 && (
      <>
        <h3>Entry: {stockPrice.toFixed(2)}</h3>    
        <h3>Position Size: <span id="color"> {answer}</span></h3>
        <h3 id="green">Target: {targetPrice}</h3>
        <h3 id="risk">Stop: {stopPrice}</h3>
        <Plays count={count} />
      </>
      )}
    </>
  );
};

export default Form;