import React, { useState } from 'react';
import { register, signIn } from "../modules/auth";
import { Form, Button, Tab, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

const Signin = props => {
  const [redirect, setRedirect] = useState(false)
  const [loader, setLoader] = useState(false)

  const submitFormHandler = async event => {
    event.preventDefault();
    setLoader(true)
    let response = await register(
      event.target.email.value,
      event.target.username.value,
      event.target.password.value,
      event.target.passCon.value
    );
    if (response.status === 200) {
      setLoader(false)
      props.setUser(response.data.data)
      setRedirect(true)
      alert(`Welcome ${response.data.data.nickname}`)
    } else {
      setLoader(false)
      alert(response)
    }
  }

  const submitSignInHandler = async event => {
    event.preventDefault();
    setLoader(true)
    let response = await signIn(event.target.email.value, event.target.password.value)
    if (response.status === 200) {
      setLoader(false)
      props.setUser(response.data.data)
      setRedirect(true)
    } else {
      setLoader(false)
      alert(response)
    }
  }

  const panes = [
    { 
      menuItem: 'SignIn', render: () => (
        <Tab.Pane>
          <>
            <div id="border">
              <img className="sign-up-img" src="/favicon.png" alt=""/>
              <h1>
                TradeLogs Sign In  
              </h1>
            </div>
            <div className="form">
              <Form onSubmit={submitSignInHandler} id="signin-form">
                <label>Email</label>
                <br/>
                <input name="email" type="email" id="email"></input>
                <label>Password</label>
                <br/>
                <input name="password" type="password" id="password"></input>
                <Button id="submit" type="submit" >Sign In</Button>
              </Form>
            </div>
          </>
        </Tab.Pane> 
      )
    },
    { 
      menuItem: 'Register', render: () => (
        <Tab.Pane>
          <>
            <div id="border">
              <img className="sign-up-img" src="/favicon.png" alt=""/>
              <h1>
                TradeLogs Sign Up  
              </h1>
            </div>
            <div className="form">
              <Form onSubmit={submitFormHandler} id="signup-form">
                <label>Email</label>
                <br/>
                <input name="email" type="email" id="email"></input>
                <br/>
                <label>UserName</label>
                <br/>
                <input name="username" type="text" id="username"></input>
                <br/>
                <label>Password</label>
                <br/>
                <input name="password" type="password" id="password"></input>
                <br/>
                <label>Confirm Password</label>
                <br/>
                <input name="passCon" type="password" id="passCon"></input>
                <br/>
                <Button id="submit" type="submit" >Sign Up</Button>
              </Form>
            </div>
          </>
        </Tab.Pane> 
      )
    }
  ]

  return (
    <div>
      {redirect === true && <Redirect to='/form'/>}
      <div className="signin-box">
        <Tab panes={panes} />
        {loader === true && (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )}
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signin);