import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateRisk } from "../modules/auth";
import { Dimmer, Loader } from 'semantic-ui-react'
import { showUser } from "../modules/auth";

const Pannel = props => {
  const [pannel, setPannel] = useState("pannel-up")
  const [loader, setLoader] = useState(false)
  const [riskValue, setRiskValue] = useState(null)

  const setRisk = async (e) => {
    e.preventDefault();
    setLoader(true)
    let risk = e.target.risk.value / 100
    let response = await updateRisk(props.userAttrs.id, risk);
    if (response.status === 200) {
      setLoader(false)
      props.setUser(response.data)
      setRiskValue("")
    } else {
      setLoader(false)
      alert("Update Failed")
      setRiskValue("")
    }
  }

  const clickHandler = () => {
    setRiskValue(null)
  }
  
  useEffect(() => {(async() => {
    if (props.userAttrs === null && props.savedTrades !== null) {
      let response = await showUser(props.savedTrades.user_id)
      response.status === 200 && props.setUser(response.data)
    }
  })()}, [props.userAttrs, props.savedTrades])

  return (
    <section className={pannel} >
      <div className="bg-verydark">
        {props.userAttrs === null ? (
          <>
            <h2>Not Logged In</h2>
          </>
        ) : (
          <>
            <div className="pannel-inner split">
              <div>
                <p>Account: {props.userAttrs.email}</p>
                {props.userAttrs.role === "subsciber" ? <p>Subscribed</p> : <p>Limited Profile</p>}
              </div>
              {props.stats !== null && props.savedTrades !== null && (
                <>
                  <p>Trades Won</p>
                  <i id="gap-show-arrow" className="angle double right icon"></i>
                  <p>{props.stats['wins']}</p>
                  <p>Trades Loss</p>
                  <i id="gap-show-arrow" className="angle double right icon"></i>
                  <p>{props.stats['loss']}</p>
                  <p>Profit/Loss Ratio</p>
                  <i id="gap-show-arrow" className="angle double right icon"></i>
                  <p>{((props.stats['gains']/props.stats['negGains'])*-1).toFixed(2)}</p>
                  <p>Average Win</p>
                  <i id="gap-show-arrow" className="angle double right icon"></i>
                  <p className="green">${(props.stats['gains']/props.stats['wins']).toFixed(2)}</p>
                  <p>Average Loss</p>
                  <i id="gap-show-arrow" className="angle double right icon"></i>
                  <p className="red-bold">${(props.stats['negGains']/props.stats['loss']).toFixed(2)}</p>
                </>
              )}
              <p>Risk / trade:</p>
              <form id="risk-form" onSubmit={setRisk}>
                <input 
                  required 
                  type='float' 
                  placeholder={`${props.userAttrs.risk * 100} %`} 
                  name="risk"
                  value={riskValue}
                  onClick= {clickHandler}
                />
                <button className="ui button">update</button>
              </form>
              {loader === true && (
                <Dimmer active>
                  <Loader />
                </Dimmer>
              )}
            </div>
          </>
        )}
      </div>
      <i onClick={() => pannel === "pannel-up" ? setPannel("pannel pannel-down") : setPannel("pannel-up")} className="bars icon"></i>
    </section>
  )
}

const mapStateToProps = state => {
  return {
    userAttrs: state.userAttrs,
    savedTrades: state.savedTrades,
    stats: state.stats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => {
      dispatch({ type: "SET_USER", payload: data });
    },
    setStrategies: array => {
      dispatch({ type: "SET_STRATEGIES", payload: array });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pannel);