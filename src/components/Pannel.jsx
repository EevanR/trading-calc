import React, { useState, useEffect } from "react";
import { Icon, Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { logout } from "../modules/auth";
import { Redirect } from 'react-router-dom';

const Pannel = props => {
  const [pannel, setPannel] = useState(false)

  const togglePannel = () => {
    pannel === false ? setPannel(true) : setPannel(false)
  }

  const onLogout = async () => {
    let response = await logout();
    if (response.data.success === true) {
      sessionStorage.removeItem("credentials")
      props.setUser(null)
    } else {
      alert("SignOut failed unexpectedly")
    }
  }

  return (
    <>
      {props.userAttrs === null && <Redirect to='/'/>}
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