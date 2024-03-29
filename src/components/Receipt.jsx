import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "../modules/subscription";
import { showUser } from "../modules/auth";

const Success = () => {
  const [user, setUser] = useState({})
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [params, setParams] = useState(false)

  const portalSession = async (e) => {
    e.preventDefault();
    let response = await createPortal(e.target.session_id.value)
    if (response.status === 200) {
      window.location.href = response.data;
    } else {
      alert("Unable to navigate to Stripe Billing Management")
    }
  }

  let date = Date().slice(0, 15)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get('success') && query.get('session_id')) {
      setSessionId(query.get('session_id'))
      setSuccess(true)
      setParams(true)
    }
    if (query.get('canceled')) {
      setSuccess(false)
      setParams(true)
    }

    const checkUserStatus = async (session_id) => {
      let response = await showUser(session_id)
      if (response.status === 200) {
        setUser(response.data)
      } else {
        console.log("No user logged into server")
      }
    }
    checkUserStatus(`ses=${query.get('session_id')}`)
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
      <div className="success-page">
        {params ? (
          <>
            {success ? (
              <>
                <h1 className="light-blue"><i className="check circle icon"></i>SUCCESS</h1>
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
              </> 
            ) : <h1 className="red"><i className="close icon"></i>CANCELED</h1>}
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
                  {user !== null ? <p className="right-align">{user.email}</p> : <p>N/A</p>}
                  <p className="right-align">{date}</p>
                  {success ? <p className="right-align green">Success</p> :  <p className="right-align red">Canceled</p>}
                  <p className="right-align">Monthly</p>
                  <p className="right-align">$16.00</p>
                </div>
              </div>
            </div>
          </>
        ) : ( 
          <h2 className="four-o-four"><span className="red">404.</span> Nothing to see here!</h2>
        )}
        <p><Link to='/panes' >&larr; back to TradeLogs dashboard</Link></p>
      </div>
    </>
  )
}

export default Success;