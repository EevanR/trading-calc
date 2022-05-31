import React, { useState } from 'react';
import { createSession } from '../modules/subscription';
import { loadStripe } from '@stripe/stripe-js';

const PayWall = () => {
  const [message, setMessage] = useState("")

  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY)
    }
    return stripePromise
  }

  const checkoutSession = async (e) => {
    e.preventDefault();
    let response = await createSession(e.target.lookup_key.value)
    if (response.status === 200) {
      redirectToCheckout(response.data.id)
    } else {
      setMessage(response.data.errors[0])
    }
  } 

  const redirectToCheckout = async (session) => {
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({sessionId: session})
    console.log("Stripe checkout error", error )
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