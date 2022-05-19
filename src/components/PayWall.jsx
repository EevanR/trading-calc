import React, { useState, useEffect } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const PayWall = () => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState('');
  
  const stripe = loadStripe("pk_test_51Ky6crB3yNNgOUzgR2446d6HO2cSm8pSo8QNMAh11pFYnyTBNKE3sQ0fZEjLM3NpGTL5G2kOqJrbgmoKgI3LilHq008UE6519r")

  const SuccessDisplay = ({ sessionId }) => {
    return (
      <section>
        <div className="product Box-root">
          <div className="description Box-root">
            <h3>Subscription to starter plan successful!</h3>
          </div>
        </div>
        <form action="/create-portal-session" method="POST">
          <input
            type="hidden"
            id="session-id"
            name="session_id"
            value={sessionId}
          />
          <button id="checkout-and-portal-button" type="submit">
            Manage your billing information
          </button>
        </form>
      </section>
    );
  };
  
  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );
  
  return (
    <section className="paywall">
      <div>
        <div className="description">
          <h3>TradeLogs Monthly Subscription</h3>
          <h5>$14.00 / month</h5>
        </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      {/* Add a hidden field with the lookup_key of your Price */}
      <input type="hidden" name="monthly" value="monthly" />
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>
    </section>
  )
};

export default PayWall;