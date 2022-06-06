import React, { useState } from 'react';
import { createSession } from '../modules/subscription';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from "react-redux";
import { Dimmer, Loader } from 'semantic-ui-react'

const PayWall = props => {
  const [message, setMessage] = useState("")
  const [loader, setLoader] = useState(false)

  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY)
    }
    return stripePromise
  }

  const checkoutSession = async (e) => {
    e.preventDefault();
    setLoader(true)
    let response = await createSession(e.target.lookup_key.value)
    if (response.status === 200) {
      redirectToCheckout(response.data.id)
      setLoader(false)
    } else {
      setMessage(response.data.errors[0])
      setLoader(false)
    }
  } 

  const redirectToCheckout = async (session) => {
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({sessionId: session})
    console.log("Stripe checkout error", error ) //display this alert probably
  }
    
  return (
    <section className={props.paywall}>
      <div className="paywallInner">
        {loader === true ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
        ) : (
          <div className="paywall-most-inner">
            <h3>TradeLogs Subscription</h3>
            <h3 onClick={() => props.paywall === "paywall-up" ? props.setPaywall("paywall") : props.setPaywall("paywall-up")} className="paywall-cancel">X</h3>
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
        )}
      </div>
    </section>
  )
};

const mapStateToProps = state => {
  return {
    paywall: state.paywall
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPaywall: paywall => {
      dispatch({ type: "SET_PAYWALL", payload: paywall })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayWall)