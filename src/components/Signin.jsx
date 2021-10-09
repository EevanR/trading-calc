import React, { useState } from 'react';
import { register, signIn } from "../modules/auth";
import { Form, Button, Tab, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

const Signin = props => {
  const [redirect, setRedirect] = useState(false)
  const [loader, setLoader] = useState(false)
  const [menu, setMenu] = useState("hidden")

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

  const menuVisibility = () => {
    menu === "hiddden" ? setMenu("visible") : setMenu("hidden")
  }

  const panes = [
    { 
      menuItem: 'SignIn', render: () => (
        <Tab.Pane>
          <>
            <div>
              <img src="/favicon.png" alt="TradeLogs logo"/>
              <h1>
                TradeLogs Sign In  
              </h1>
            </div>
            <div className="form">
              <Form onSubmit={submitSignInHandler}>
                <label>Email</label>
                <br/>
                <input name="email" type="email" id="email"></input>
                <label>Password</label>
                <br/>
                <input name="password" type="password" id="password"></input>
                <button className="big ui button" id="submit" type="submit" >Sign In</button>
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
            <div>
              <img src="/favicon.png" alt="TradeLogs Logo"/>
              <h1>
                TradeLogs Sign Up  
              </h1>
            </div>
            <div className="form">
              <Form onSubmit={submitFormHandler} >
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
                <button className="big ui button" id="submit" type="submit" >Sign Up</button>
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
      <i onClick={() => setMenu("visible")} className="bars icon"></i>
        <div className="container container--narrow">
          <div style={{visibility: `${menu}`}} className="header-grid">
            <i onClick={() => setMenu("hidden")} className="x icon icon"></i>
            <div className="border-right">
              <div>
                <h4>PROFIT CHART</h4>
                <p>Gross or Net</p>
                <i className="angle down icon"></i>
              </div>
            </div>
            <div className="border-right">
              <div>
                <h4>FEES</h4>
                <p>Platform fees, Locate fees, Commissions</p>
                <i className="angle down icon"></i>
              </div>
            </div>
            <div className="border-right">
              <div>
                <h4>BREAKDOWN</h4>
                <p>Your statistics</p>
                <i className="angle down icon"></i>
              </div>
            </div>
            <div className="border-right">
              <div>
                <h4>STRATEGIES</h4>
                <p>Save, display, track</p>
                <i className="angle down icon"></i>
              </div>
            </div>
            <div className="no-border-right">
              <div>
                <h4>GAP STATS</h4>
                <p>Stock History Statistics</p>
                <i className="angle down icon"></i>
              </div>
            </div>
          </div>
          <h1>Quick. Easy. Tradelogs.</h1>
          <p>Dynamic representations of your trade data</p>
          <button className="big ui button">Sign In</button>
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
            {redirect === true && <Redirect to='/panes'/>}
            <div className="signin container">
              <div className="signin-box">
                <Tab panes={panes} />
                {loader === true && (
                  <Dimmer active>
                    <Loader />
                  </Dimmer>
                )}
              </div>
            </div>
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
        <section className="bg-secondary section-4">
          <div className="container">
            <div className="main">
              <div className="sec-1">
                <h2>The Breakdown.</h2>
              </div>
              <div className="sec-2 white-border">
                <h4>Hourly</h4>
                <p>Cumulative PnL by hour of the day</p>
                <i className="hourglass outline icon"></i>
              </div>
              <div className="sec-3 white-border">
                <h4>Hourly Fequency</h4>
                <p>Number of Trades by hour of the day</p>
                <i className="chart bar outline icon"></i>
              </div>
              <div className="sec-4 white-border">
                <h4>Daily Combined Avg</h4>
                <p>Average Pnl logged each day of the week</p>
                <i className="calculator icon"></i>
              </div>
              <div className="sec-5 white-border">
                <h4>DoW Win Avg & Lose Avg</h4>
                <p>Average win day and average losing day for each day of the week</p>
                <i className="calendar outline icon"></i>
              </div>
              <div className="sec-6 white-border">
                <h4>Gross or Net</h4>
                <p>Ability to switch between Gross data or net data</p>
                <i className="chart line icon"></i>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-light section-5">
        <h1>Additional Features</h1>
        <div className="container split">
          <div>
            <div>
              <p>STRATEGY JOURNAL / PERFORMANCE</p>
            </div>
            <div className="text-center">
              <p>Coming Soon</p>
            </div>
          </div>
          <div>
            <div>
              <p>GAP STASTITICS</p>
            </div>
            <div className="text-center">
            </div>
              <p>Take advantage of our ticker history scanner. Stastistics gathered from all previous gaps. Displayed as a list of probable outcomes, including possible day 2 probabilities.</p>
          </div>
        </div>
        <div className="text-center">
          <button className="big ui button">Subsciption Details</button>
        </div>
      </section>

      <div>
        <section className="bg-secondary section-5">
          <div className="container">
          </div>
        </section>
      </div>

      <section className="bg-ivory">
        <div>
          footer
        </div>
      </section>
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