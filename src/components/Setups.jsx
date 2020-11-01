import React from 'react';

const Setups = () => {
  return (
    <>
      <h2>Setups</h2>
      <div>
        <form id="main-form">
          <div className="fields">
            <div className="field">
              <label>Name</label>
              <input
                required
                type="text"
                name="equity"
                id="equity"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                required
                type="text"
                name="ticker"
                id="ticker"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                required
                type="text"
                name="price"
                id="price"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                required
                type="text"
                name="price"
                id="price"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  )

}

export default Setups