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
    console.log("Stripe checkout error", error ) //display this alert probably
  }
    
  return (
    <section className="paywall">
      <div className="paywallInner">
        <div className="paywall-most-inner">
          <h3>TradeLogs Subscription</h3>
          <div className="two-column-grid">
            <div className='divider-right'>
              <h5>Monthly: $16usd</h5>
            </div>
            <form id="create-checkout-session" onSubmit={checkoutSession}>
              <input type="hidden" name="lookup_key" value="monthly" />
              <button className="oval-button-white" id="checkout-and-portal-button" type="submit">
                To <i class="cc stripe icon"></i> Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
};

export default PayWall;