import React, { useState } from "react";
import { Icon, Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { logout, updateRisk } from "../modules/auth";
import { Redirect } from 'react-router-dom';

const Pannel = props => {
  const [pannel, setPannel] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [editRisk, setEditRisk] = useState(false)

  const togglePannel = () => {
    pannel === false ? setPannel(true) : setPannel(false)
  }

  const onLogout = async () => {
    let response = await logout();
    if (response.data.success === true) {
      setRedirect(true)
      sessionStorage.clear()
      props.setUser(null)
    } else {
      alert("SignOut failed unexpectedly")
    }
  }

  const setRisk = async (e) => {
    e.preventDefault();
    let risk = e.target.risk.value/100
    let response = await updateRisk(props.userAttrs.id, risk);
    if (response.status === 200) {
      props.setUser(response.data)
      setEditRisk(false)
    } else {
      alert("Update Failed")
    }
  }

  return (
    <>
      {redirect === true && <Redirect to='/'/>}
      <div id="pannel" className={pannel ?  "pannel-in" : "pannel-out"} >
        {props.userAttrs !== null && (
          <h2 id="pannel-name">{props.userAttrs.nickname}</h2>
        )}
        <div className="pannel-switch">
          <Icon onClick={() => togglePannel() } 
            color='red' 
            name={pannel === false ? 'arrow alternate circle right outline' : 'arrow alternate circle left outline'} />
        </div>
        <Button id="logout" onClick={() => onLogout()}>Logout</Button>
        <div id="border-pannel"></div>
        <div id="pannel-info">
          <h4>Account: </h4>
          <h4>{props.userAttrs.email}</h4>
        </div>
        <h4>Risk / trade: </h4>
        {!editRisk ? (
          <>
            <h4 id="user-risk" style={{ color: "red" }}>{props.userAttrs.risk*100} %</h4>
            <button onClick={() => setEditRisk(true)}>Edit</button>
          </>
        ) : (
          <form id="risk-form" onSubmit={setRisk}>
            <label htmlFor="">Risk</label>
            <input required type='float' placeholder="%" name="risk" id="risk"/>
            <button id='update-risk'>update</button>
            <button onClick={() => setEditRisk(false)}>Cancel</button>
          </form>
        )}
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    userAttrs: state.userAttrs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => {
      dispatch({ type: "SET_USER", payload: data });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pannel);