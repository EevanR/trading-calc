import React, { useState, useEffect } from 'react';
import { createSession } from '../modules/subscription';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const PayWall = () => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState('');
  
  // const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY)

  // const SuccessDisplay = ({ sessionId }) => {
  //   return (
  //     <section>
  //       <div className="product Box-root">
  //         <div className="description Box-root">
  //           <h3>Subscription to starter plan successful!</h3>
  //         </div>
  //       </div>
  //       <form action="/create-portal-session" method="POST">
  //         <input
  //           type="hidden"
  //           id="session-id"
  //           name="session_id"
  //           value={sessionId}
  //         />
  //         <button id="checkout-and-portal-button" type="submit">
  //           Manage your billing information
  //         </button>
  //       </form>
  //     </section>
  //   );
  // };

  const checkoutSession = async (e) => {
    e.preventDefault();
    let response = await createSession(e.target.lookup_key.value)
    if (response.status === 200) {
      window.open(response.data.url);
    } else {
      setMessage(response.data.errors[0])
    }
  }
  
  return (
    <section className="paywall">
      <div>
        <div className="description">
          <h3>TradeLogs Monthly Subscription</h3>
          <h5>$12.00 / month</h5>
        </div>
    </div>
    <form id="create-checkout-session" onSubmit={checkoutSession}>
      <input type="hidden" name="lookup_key" value="monthly" />
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>
    </section>
  )
};

export default PayWall;