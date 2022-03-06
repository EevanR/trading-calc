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
    <section  id="pannel" className={pannel} >
      <div className="bg-ivory container-wide">
        {props.userAttrs === null ? (
          <>
            <h2>Not Logged In</h2>
          </>
        ) : (
          <>
            <div>
              {props.stats !== null && props.savedTrades !== null && (
                <>
                  <h4>Account: </h4>
                  <h5>{props.userAttrs.email}</h5>
                  <h5>Trades Won: </h5>
                  <h5>{props.stats['wins']}</h5>
                  <h5>Gross Loss:</h5>
                  <h5>${(props.stats['negGains']).toFixed(2)}</h5>
                  <h5>Profit/Loss Ratio: </h5>
                  <h5>{((props.stats['gains']/props.stats['negGains'])*-1).toFixed(2)}</h5>
                  <h5>Average Win: </h5>
                  <h5>${(props.stats['gains']/props.stats['wins']).toFixed(2)}</h5>
                  <h5>Average Loss: </h5>
                  <h5>${(props.stats['negGains']/props.stats['loss']).toFixed(2)}</h5>
                </>
              )}
            </div>
            <h4>Risk / trade:
            <div id="elipse"
                onClick={() => openCommentMenu()}
                className={showMenu ? "elipse-open" : "elipse-close"}
              >
                {showMenu === true && (
                  <button id="risk-edit" onClick={() => setEditRisk(true)}>Edit</button>
                )}
                <Icon id="risk-elipse" name='ellipsis vertical' />
              </div>
            </h4>
            {!editRisk ? (
              <>
                <h4 id="user-risk">{props.userAttrs.risk * 100} %</h4>
              </>
            ) : (
                <>
                  <form id="risk-form" onSubmit={setRisk}>
                    <label htmlFor="">Risk</label>
                    <input required type='float' placeholder="%" name="risk" id="pannel-risk" />
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
          </>
        )}
      </div>
      <i onClick={() => pannel === "pannel-up" ? setPannel("pannel-down") : setPannel("pannel-up")} className="bars icon"></i>
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