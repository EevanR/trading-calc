import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dimmer, Loader } from 'semantic-ui-react'
import { createPortal } from "../modules/subscription";

const Success = () => {
  const [user, setUser] = useState({})
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [loader, setLoader] = useState(false)

  const portalSession = async (e) => {
    e.preventDefault();
    let response = await createPortal(e.target.session_id.value)
    if (response.status === 200) {
      // redirectToCheckout(response.data.id)
      setLoader(false)
    } else {
      setLoader(false)
    }
  }
  
  let date = Date().slice(0, 15)
  useEffect(() => {
    let storage = JSON.parse(sessionStorage.getItem('user'))
    setUser(storage)
  }, [])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    query.get('success') && setSuccess(true) && setSessionId(query.get('session_id'))
    query.get('canceled') && setSuccess(false);
  }, []);

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
      {loader === true ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <div className="success-page">
          <h1><i class="check circle icon"></i>SUCCESS</h1>
          <h4>Your TradeLogs subscription has successfully registered.</h4>
          <form id="create-portal-session" onSubmit={portalSession}>
            <input
              type="hidden"
              id="session-id"
              name="session_id"
              value={sessionId}
            />
            <button className="oval-button-white" id="checkout-and-portal-button" type="submit">
              Manage Subscription
            </button>
          </form>
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
          <p><Link to='/panes' >&larr; back to TradeLogs dashboard</Link></p>
        </div>
      )}
    </>
  )
}

export default Success;