import React from 'react';

const HowTo = () => {

  return (
    <>
      <div className="panes bg-dark">
        <div className="two-column-grid">
          <div>
            <a href="/"><img src="/TradeLogs.png"  alt="TradeLogs Logo"/></a>
          </div>
          <div>
  
          </div>
        </div>
      </div>
      <section className='container'>

      </section>
      <section className="section-6 bg-secondary">
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
              <p>HOW TO</p>
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