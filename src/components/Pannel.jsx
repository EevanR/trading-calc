import React, { useState } from "react";
import { Icon, Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { logout, updateRisk } from "../modules/auth";
import { deleteTrades } from "../modules/trades";
import { Redirect } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react'

const Pannel = props => {
  const [pannel, setPannel] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [editRisk, setEditRisk] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [loader, setLoader] = useState(false)

  const togglePannel = () => {
    pannel === false ? setPannel(true) : setPannel(false)
  }

  const onLogout = async () => {
    let response = await logout();
    if (response.data.success === true) {
      setRedirect(true)
      sessionStorage.clear()
      props.setUser(null)
      props.setCount(0)
      props.setPrereq(null)
      props.setCheckList([])
      props.setSetUp("")
    } else {
      alert("SignOut failed unexpectedly")
    }
  }

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

  const clearTrades = async () => {
    let response = await deleteTrades();
    if (response) {
      props.resetTrades(null)
      alert("Trade log deleted. Sign back in for changes.")
    } else {
      alert("Trades could not be deleted. Try again later.")
    }
  }

  const openCommentMenu = () => {
    showMenu === false ? setShowMenu(true) : setShowMenu(false);
  }

  let successTrades = 0
  let tradeWins = 0
  let tradeLoss = 0
  let setupStats;
  if (props.savedTrades !== null) {
    let setups = []
    props.savedTrades.forEach(trade => {
      if (!setups.includes(trade['setup'])) {
        setups.push(trade['setup'])
      }
    })
    let profits = []
    let groupedTrades = []
    for (let i = 0; i < setups.length; i++) {
      props.savedTrades.forEach(trade => {
        if (trade['setup'] === setups[i]) {
          profits.push(trade['profit'])
        }
      })
      groupedTrades.push([setups[i], profits])
      profits = []
    }
    setupStats = groupedTrades.map(setup => {
      let pos = 0
      let neg = 0
      let win = 0
      let loss = 0 
      setup[1].forEach(profit => {
        if (profit > 0) {
          pos += profit
          win += 1
          successTrades += 1
          tradeWins += profit
        } else {
          neg += profit
          loss += 1
          tradeLoss += profit
        } 
      })
      return (
        <div className="setups-pannel">
          <h5 id="border-pannel-single">{setup[0]}</h5>
          <h5 className="setup-details">P/L Ratio: 
            <span id="pL">{(pos / (neg * -1)).toFixed(2)}</span>
          </h5>
          <h5 className="setup-details">Win Percentage: 
            <span id="pL">{((win/(win+loss))*100).toFixed(2)}%</span>
          </h5>
        </div>
      )
    })
  }

  return (
    <>
      {redirect === true && <Redirect to='/' />}
      <div id="pannel" className={pannel ? "pannel-in" : "pannel-out"} >
        {props.userAttrs === null ? (
          <h2>Not Logged In</h2>
        ) : (
          <>
            <h2 id="pannel-name">{props.userAttrs.nickname}</h2>
            <div className="pannel-switch">
              <Icon onClick={() => togglePannel()}
                color='red'
                name={pannel === false ? 'arrow alternate circle right outline' : 'arrow alternate circle left outline'} />
            </div>
            <div id="border-pannel"></div>
            <div id="pannel-info">
              {props.savedTrades !== null && (
                <>
                  <h4 id="pannel-title">Account: </h4>
                  <h5>{props.userAttrs.email}</h5>
                  <h4 id="pannel-title">Stats: </h4>
                  <div className="stats-grid">
                    <h5 id="left-column">Trade Count: </h5>
                    <h5 id="right-column">{props.savedTrades.length}</h5>
                    <h5 id="left-column">Trades Won: </h5>
                    <h5 id="right-column">{successTrades}</h5>
                    <h5 id="left-column">Win Percentage: </h5>
                    <h5 id="right-column">{((successTrades/props.savedTrades.length)*100).toFixed(2)}%</h5>
                    <h5 id="left-column">Gross Profits: </h5>
                    <h5 id="right-column">${tradeWins.toFixed(2)}</h5>
                    <h5 id="left-column">Gross Loss:</h5>
                    <h5 id="right-column" style={{marginLeft: "-6px"}}>${tradeLoss.toFixed(2)}</h5>
                    <h5 id="left-column">Profit/Loss: </h5>
                    <h5 id="right-column">{(tradeWins/tradeLoss*-1).toFixed(2)}</h5>
                    <h5 id="left-column">Average Win: </h5>
                    <h5 id="right-column">${(tradeWins/props.savedTrades.length).toFixed(2)}</h5>
                    <h5 id="left-column">Average Loss: </h5>
                    <h5 id="right-column">${(tradeLoss/props.savedTrades.length).toFixed(2)}</h5>
                  </div>
                </>
              )}
            </div>
            <h4 id="pannel-title">Risk / trade:
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
            <h4 id="pannel-title">Setup Performance:</h4>
            <div className="preformance">{setupStats}</div>
            <Button className="clearTades" onClick={() => clearTrades()}>Clear Trade Log</Button>

          </>
        )}
        <Button className="logout" onClick={() => onLogout()}>Logout</Button>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    userAttrs: state.userAttrs,
    savedTrades: state.savedTrades
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => {
      dispatch({ type: "SET_USER", payload: data });
    },
    setCount: data => {
      dispatch({ type: "SET_COUNT", payload: data });
    },
    setPrereq: data => {
      dispatch({ type: "SET_PREREQ", payload: data });
    },
    setCheckList: array => {
      dispatch({ type: "SET_CHECKLIST", payload: array });
    },
    setSetUp: string => {
      dispatch({ type: "SET_SETUP", payload: string });
    },
    resetTrades: string => {
      dispatch({ type: "SET_SAVEDTRADES", payload: string });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pannel);