import React from 'react';

const HowTo = () => {

  return (
    <>
      <div className="panes bg-dark">
        <div>
          <a href="/"><img src="/TradeLogs.png"  alt="TradeLogs Logo"/></a>
        </div>
      </div>
      <section className='container terms'>
        <h1>How To</h1>
        <h3>Get Started</h3>
        <p>Register account and log in</p>

        <h3>Dashboard</h3>
        <p>Welcome to TradeLogs! Once logged in, familiarize yourself with the dashboard and the various secion tabs.</p>
        <p>Clicking the TradeLogs Logo at the top left of the page will take you back to the Sign in page, logging you out.</p>

        <h3>Upload Trades</h3>
        <p>Currently Supported Brokers: TradeZero </p>
        <p>
          1. Log in to your TradeZero account
          <br />
          2. Head over to Account Summary
        </p>
      </section>
      <section className="section-6 bg-dark">
        <div className="container-wide">
          <div className="split">
            <div>
              <img id="logo" src="/TradeLogs.png"  alt="TradeLogs Logo"/>
            </div>
            <div>
            </div>
            <div>
              <h4>ABOUT US</h4>
              <a href='/terms'><p>TERMS OF SERVICE</p></a>
              <p>FAQ</p>
              <p>PRIVACY POLICY</p>
            </div>
            <div>
              <h4>QUICK LINKS</h4>
              <a href='/howto'><p>HOW TO</p></a>
            </div>
            <div>
              <h4>CONNECT</h4>
              <p>CONTACT US</p>
            </div>
          </div>
          <div id="copyright">
            <i className="envelope outline icon"></i>
            <p >Copyright © TradeLogs 2022. All rights reserved.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default HowTo;