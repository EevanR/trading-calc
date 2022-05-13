import React from 'react';

const PayWall = () => {
  


  return (
    <section className="paywall">
      <div>
        <div className="description">
          <h3>TradeLogs Monthly Subscription</h3>
          <h5>$14.00 / month</h5>
        </div>
    </div>
    <form action="https://buy.stripe.com/test_8wMdUz18M5z34sE3cc">
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>
    </section>
  )
};

export default PayWall;