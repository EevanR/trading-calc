import React, { useEffect, useState } from 'react';
import { register } from "../modules/auth";
import { Form, Button } from 'semantic-ui-react'

const Signin = () => {

  const submitFormHandler = async event => {
    event.preventDefault();
    let response = await register(
      event.target.email.value,
      event.target.username.value,
      event.target.password.value,
      event.target.passCon.value
    );
    if (response.status === 200) {
      alert(`Welcome ${response.data.data.nickname}`)
      // response.data.data
    } else {
      alert(response)
    }
  }

  return (
    <div>
      <div className="signin-box">
        <img className="sign-up-img" src="/favicon.png" alt=""/>
        <h1>
          TradeLogs Sign Up  
        </h1>
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
      </div>
    </div>
  )
}

export default Signin;