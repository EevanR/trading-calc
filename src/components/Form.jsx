import React, { useState, useEffect } from "react";
import Plays from './Plays'
import SetUp from './SetUp'
import Pannel from './Pannel'
import ProfitChart from "./ProfitChart"
import GapStats from "./GapStats"
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
  const [riskDollar, setRisk] = useState(0)
  const [buyPower, setBuyingPower] = useState(0)

  const submit = (e) => {
    e.preventDefault();
    if (props.preReq === props.checkList.length) {
      let risk = riskDollar
      let stop = parseFloat(e.target.price.value - e.target.stop.value)
      let stockPrice = parseFloat(e.target.price.value)
      let ticker = e.target.ticker.value

      let maxShares = Math.floor(risk / stop)
      let bpMax = Math.floor(buyPower / stockPrice)

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
        setStockPrice(stockPrice.toFixed(2))
        setGood(true)
      } else {
        setAnswer(maxShares)
        setStop(stop.toFixed(2))
        setTicker(ticker)
        setStockPrice(stockPrice.toFixed(2))
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
    props.setCount(props.count + 1)
  }

  const onChangeHandler = (e) => {
    let value = e.target.value*props.userAttrs.risk
    setRisk(value)
    let buyPower = e.target.value*4
    setBuyingPower(buyPower)
  }

  useEffect(() => {
    if (good === true ) {
      setStorage()
    }
  }, [good])
  
  return (
    <>
      <Pannel />
      <h2 id="title">Trading Position Calculator </h2>
      <div className="ui form">
        <form id="main-form" onSubmit={submit}>
          <div className="fields">
            <div className="field">
              <label>Equity</label>
              <input
                required
                type="text"
                placeholder="$"
                name="equity"
                id="equity"
                onChange={onChangeHandler}
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
            <div id="risk-block" className="field">
              <label id="risk">Risk $</label>
              <p className="risk" >${riskDollar.toFixed(2)}</p>
            </div>
            <div id="bp-block" className="field">
              <label id="bp">Buying Power $</label>
              <p className="bp" >${buyPower.toFixed(2)}</p>
            </div>
          </div>
          <SetUp />
          <br/>
          <button id='calculate'>Calculate</button>
        </form>
      </div>
      { props.count > 0 && (
      <>
        <div className="info">
          <div className="details">
            <h2 className="details-heading" >Details</h2>
            <h3>Entry</h3>    
            <h3>Position Size</h3>
            <h3 id="risk">Stop Price</h3>
            <h3 id="risk">Stop</h3>
            <h3>${stockPrice}</h3> 
            <h3><span id="color"> {answer}</span></h3>
            <h3 id="risk">${stopPrice}</h3>
            <h3 id="risk">${stop}</h3>
          </div>
          <div className="targets">
            <h2 className="result-heading" >Targets</h2>
            <h3>1R Target</h3>
            <h3>2R Target</h3>
            <h3>3R Target</h3>
            <h3><span id="green"> ${targetPrice}</span></h3>
            <h3><span id="green"> ${targetPrice2}</span></h3>
            <h3><span id="green"> ${targetPrice3}</span></h3>
          </div>
        </div>
        <Plays />
      </>
      )}
      <ProfitChart />
      <GapStats />
    </>
  );
};

const mapStateToProps = state => {
  return {
    preReq: state.preReq,
    checkList: state.checkList,
    setUp: state.setUp,
    count: state.count,
    userAttrs: state.userAttrs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPrereq: data => {
      dispatch({ type: "SET_PREREQ", payload: data });
    },
    setCheckList: array => {
      dispatch({ type: "SET_CHECKLIST", payload: array });
    },
    setCount: data => {
      dispatch({ type: "SET_COUNT", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);