import React, { useState } from "react";
import { Icon, Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { logout, updateRisk } from "../modules/auth";
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
    let risk = e.target.risk.value/100
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

  return (
    <>
      {redirect === true && <Redirect to='/'/>}
      <div id="pannel" className={pannel ?  "pannel-in" : "pannel-out"} >
        {props.userAttrs === null ? (
          <h2>Not Logged In</h2>
        ) : (
          <>
            <h2 id="pannel-name">{props.userAttrs.nickname}</h2>
            <div className="pannel-switch">
              <Icon onClick={() => togglePannel() } 
                color='red' 
                name={pannel === false ? 'arrow alternate circle right outline' : 'arrow alternate circle left outline'} />
            </div>
            <Button id="logout" onClick={() => onLogout()}>Logout</Button>
            <div id="border-pannel"></div>
            <div id="pannel-info">
              { props.savedTrades !== null && (
                <>
                  <h4 id="pannel-title">Account: </h4>
                  <h5>{props.userAttrs.email}</h5>
                  <h5>Trade Count: {props.savedTrades.length}</h5>
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
                <h4 id="user-risk">{props.userAttrs.risk*100} %</h4>
              </>
            ) : (
              <>
                <form id="risk-form" onSubmit={setRisk}>
                  <label htmlFor="">Risk</label>
                  <input required type='float' placeholder="%" name="risk" id="pannel-risk"/>
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
            <h4></h4>
          </>
        )}
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
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pannel);