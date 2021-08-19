import React, { useState } from "react";
import { connect } from "react-redux";
import SetUp from "./SetUp";
import Plays from "./Plays"

const Calculator = props => {
  const [tradeDetails, setTradeDetails] = useState([])
  const [riskBp, setRiskBp] = useState([0, 0])

  const onChangeHandler = (e) => {
    let riskValue = e.target.value * props.userAttrs.risk
    let buyPower = e.target.value * 4
    setRiskBp([riskValue, buyPower])
  }

  const submit = (e) => {
    e.preventDefault();
    if (props.preReq === props.checkList.length) {
      const inputs = {
        stop: Number((e.target.price.value - e.target.stop.value).toFixed(2)),
        stockPrice: Number(e.target.price.value),
        ticker: e.target.ticker.value
      }
      const tradeParams = {
        maxShares: Math.floor(riskBp[0] / inputs["stop"]),
        bpMaxShares: Math.floor(riskBp[1] / inputs["stockPrice"]),
        pts: [(inputs["stockPrice"] + inputs["stop"] * 0.5).toFixed(2), (inputs["stockPrice"] + inputs["stop"]).toFixed(2), (inputs["stockPrice"] + inputs["stop"] * 2).toFixed(2)],
        stopPrice: inputs["stockPrice"] - inputs["stop"]
      }
      let answer;
      tradeParams["bpMaxShares"] < tradeParams["maxShares"] ? answer = tradeParams["bpMaxShares"] : answer = tradeParams["maxShares"]
      setTradeDetails([inputs["stop"].toFixed(2), inputs["ticker"], inputs["stockPrice"].toFixed(2), tradeParams["stopPrice"], tradeParams["pts"], answer])
      sendStorage(inputs, tradeParams, answer)
    } else {
      alert("Trade doesn't meet requirements!!!")
    }
  }

  const sendStorage = (inputs, tradeParams, answer) => {
    const trade = {
      inputs,
      tradeParams,
      shares: answer,
      setup: props.setUp,
      date: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    }
    let tickers = []
    if (sessionStorage.getItem('tickers')) {
      tickers = JSON.parse(sessionStorage.getItem('tickers'))
    }
    tickers.push([Math.floor(Math.random() * 1000), trade])
    sessionStorage.setItem('tickers', JSON.stringify(tickers))
    props.setCount(props.count + 1)
  }
  
  return (
    <>
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
              <p className="risk" >${riskBp[0].toFixed(2)}</p>
            </div>
            <div id="bp-block" className="field">
              <label id="bp">Buying Power $</label>
              <p className="bp" >${riskBp[1].toFixed(2)}</p>
            </div>
          </div>
          <SetUp />
          <br />
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
              <h3>${tradeDetails[2]}</h3>
              <h3><span id="color"> {tradeDetails[5]}</span></h3>
              <h3 id="risk">${tradeDetails[3]}</h3>
              <h3 id="risk">${tradeDetails[0]}</h3>
            </div>
            <div className="targets">
              <h2 className="result-heading" >Targets</h2>
              <h3>0.5R Target (1/2)</h3>
              <h3>1R Target (1/4)</h3>
              <h3>2R Target (1/4)</h3>
              <h3 id="green">${tradeDetails[4][0]} <span id="targets">{Math.floor(tradeDetails[4] / 2)} shrs</span></h3>
              <h3 id="green">${tradeDetails[4][1]} <span id="targets">{Math.floor(tradeDetails[4] / 4)} shrs</span></h3>
              <h3 id="green">${tradeDetails[4][2]} <span id="targets">{Math.floor(tradeDetails[4] / 4)} shrs</span></h3>
            </div>
          </div>
          <Plays />
        </>
      )}
    </>
  )
}

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
    setCount: data => {
      dispatch({ type: "SET_COUNT", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);