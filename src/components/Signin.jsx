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
    <>
      <header className="text-center header-image">
        <div className="container container--narrow">
          <h1>Welcome to Tradelogs</h1>
          <p>Dynamic representations of your trade data</p>
        </div>
      </header>

      <section className="bg-light section-1 line-chart-bg ">
        <div className="container">
          <h1 className="text-center">Follow your profit curve with the click of one button</h1>
          <div>
            <div>
              <p>Upload years of trade history from any supported broker. We'll read the data and throw it on some easy-to-read graphs for you. Simple.</p>
            </div>
            <div>
              <img src="../images/profitchart.png" alt="profit chart example" />
            </div>
            {/* {redirect === true && <Redirect to='/panes'/>}
            <div className="signin-box">
              <Tab panes={panes} />
              {loader === true && (
                <Dimmer active>
                  <Loader />
                </Dimmer>
              )}
            </div> */}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container">
          <div>
            <div>
              <h1>Create an account and start uploading. Registration is Free.</h1>
            </div>
            <div className="text-center">
              <button className="big ui button">NEW ACCOUNT</button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light section-3">
        <div className="container-wide">
          <div className="split verticle-centre">
            <div>
              <h1>Check true Net Profitability by adding your <span className="red-bold">FEES</span> to the mix</h1>
            </div>
            <div>
              <img src="../images/commis1.png" alt="Commission chart example 1" />
            </div>
            <div>
              <img id="im-2" src="../images/commis2.png" alt="Commission chart example 2" />
            </div>
          </div>
        </div>
      </section>

      <div className="bull-icon">
        <section className="bg-secondary">
          <div className="container">
            <div className="split">
              <div>
                <h2>Another section</h2>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <div>
                <h2>Another section</h2>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signin);