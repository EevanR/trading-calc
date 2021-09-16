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

      <section className="bg-light">
        <div className="container">
          <h2 className="text-center">Section 1</h2>
          <div className="split">
            <div>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                Why do we use it?
              </p>
            </div>
            <div>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                Why do we use it?
              </p>
            </div>
            <div>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                Why do we use it?
              </p>
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
          <div className="split">
            <div>
              <h2>First Section</h2>
              <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              Why do we use it?
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
            <div>
              <img src="" alt="Wall Street" />
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