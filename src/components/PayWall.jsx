import React, { useState, useEffect } from 'react';
import { createSession } from '../modules/subscription';

const PayWall = () => {
  const [message, setMessage] = useState('');

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