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