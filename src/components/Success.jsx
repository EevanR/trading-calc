import React, { useEffect, useState } from "react";

const Success = () => {
  const [user, setUser] = useState({})
  
  let date = Date().slice(0, 15)
  useEffect(() => {
    let storage = JSON.parse(sessionStorage.getItem('user'))
    setUser(storage)
  }, [])
  

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
      <div className="success-page">
        <h1><i class="check circle icon"></i>SUCCESS</h1>
        <h4>Your TradeLogs subscription has successfully registered.</h4>
        <button className="oval-button-white">Manage Subscription</button>
        <div className="box">
          <div className="two-column-grid">
            <div>
              <p className="left-align">Customer Email</p>
              <p className="left-align">Date</p>
              <p className="left-align">Transaction Status</p>
              <p className="left-align">Subscription Period</p>
              <p className="left-align">Payment Amount</p>
            </div>
            <div>
              <p className="right-align">{user.email}</p>
              <p className="right-align">{date}</p>
              <p className="right-align green">Success</p>
              <p className="right-align">Monthly</p>
              <p className="right-align">$12.00</p>
            </div>
          </div>
        </div>
        <p> <a>&larr; back to TradeLogs dashboard</a></p>
      </div>
    </>
  )
}

export default Success;