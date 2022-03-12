import React, { useState, useEffect } from "react";
import { Icon } from 'semantic-ui-react'
import { connect } from "react-redux";
import { updateRisk } from "../modules/auth";
import { Dimmer, Loader } from 'semantic-ui-react'
import { showUser } from "../modules/auth";

const Pannel = props => {
  const [pannel, setPannel] = useState("pannel-up")
  const [editRisk, setEditRisk] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [loader, setLoader] = useState(false)

  const setRisk = async (e) => {
    e.preventDefault();
    setLoader(true)
    let risk = e.target.risk.value / 100
    let response = await updateRisk(props.userAttrs.id, risk);
    if (response.status === 200) {
      setLoader(false)
      props.setUser(response.data)
      setEditRisk(false)
    } else {
      setLoader(false)
      alert("Update Failed")
    }
  }

  const openCommentMenu = () => {
    showMenu === false ? setShowMenu(true) : setShowMenu(false);
  }
  
  useEffect(() => {(async() => {
    if (props.userAttrs === null && props.savedTrades !== null) {
      let response = await showUser(props.savedTrades.user_id)
      response.status === 200 && props.setUser(response.data)
    }
  })()}, [props.userAttrs, props.savedTrades])

  return (
    <section id="pannel" className={pannel} >
      <div className="bg-verydark">
        {props.userAttrs === null ? (
          <>
            <h2>Not Logged In</h2>
          </>
        ) : (
          <>
            <div className="split">
              {props.stats !== null && props.savedTrades !== null && (
                <>
                  <p>Account: {props.userAttrs.email}</p>
                  <p>Trades Won</p>
                  <i id="gap-show-arrow" className="angle double right icon"></i>
                  <p>{props.stats['wins']}</p>
                  <p>Profit/Loss Ratio</p>
                  <i id="gap-show-arrow" className="angle double right icon"></i>
                  <p>{((props.stats['gains']/props.stats['negGains'])*-1).toFixed(2)}</p>
                  <p>Average Win</p>
                  <i id="gap-show-arrow" className="angle double right icon"></i>
                  <p className="green">${(props.stats['gains']/props.stats['wins']).toFixed(2)}</p>
                  <p>Average Loss</p>
                  <i id="gap-show-arrow" className="angle double right icon"></i>
                  <p className="red-bold">${(props.stats['negGains']/props.stats['loss']).toFixed(2)}</p>
                  <p>Risk / trade:</p>
                  {!editRisk ? (
                    <>
                      <p id="user-risk">{props.userAttrs.risk * 100} %</p>
                    </>
                  ) : (
                    <>
                      <form id="risk-form" onSubmit={setRisk}>
                        <label htmlFor="">Risk</label>
                        <input required type='float' placeholder="%" name="risk" />
                        <button id='update-risk'>update</button>
                        <button onClick={() => setEditRisk(false)}>Cancel</button>
                      </form>
                      {loader === true && (
                        <Dimmer active>
                          <Loader />
                        </Dimmer>
                      )}
                    </>
                  )}
                  <div id="elipse"
                    onClick={() => openCommentMenu()}
                    className={showMenu ? "elipse-open" : "elipse-close"}
                  >
                    {showMenu === true && (
                      <button onClick={() => setEditRisk(true)}>Edit</button>
                    )}
                    <Icon id="risk-elipse" name='ellipsis vertical' />
                  </div>
                </>
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