import React, { useState } from "react";

const Form = props => {
  const [answer, setAnswer] = useState(null)
  const [target, setTarget] = useState(null)
  const [stop, setStop] = useState(null)

  const submit = (e) => {
    e.preventDefault();
    let bp = parseFloat(e.target.bp.value)
    let risk = parseFloat(e.target.risk.value)
    let stop = parseFloat(e.target.stop.value)
    let price = parseFloat(e.target.price.value)

    let maxShares = Math.floor(risk / stop)
    let bpMax = Math.floor(bp / price)

    if (bpMax < maxShares) {
      setAnswer(`${bpMax} Shares`)
    } else {
      setAnswer(`${maxShares} Shares`)
    }

    setTarget(`$${price + stop}`)
    setStop(`$${price - stop}`)
  }
  
  return (
    <>
      <div className="ui form">
        <form onSubmit={submit}>
          <div className="fields">
            <div className="field">
              <label>Buying Power</label>
              <input
                required
                type="text"
                placeholder="$"
                name="bp"
                id="bp"
              />
            </div>
            <div className="field">
              <label>Stock Price</label>
              <input
                required
                type="text"
                placeholder="$"
                name="price"
                id="price"
              />
            </div>
            <div className="field">
              <label id="risk">Stop</label>
              <input
                type="text"
                required
                placeholder="$"
                name="stop"
                id="stop"
              />
            </div>
            <div className="field">
              <label id="risk">Risk</label>
              <input
                type="text"
                required
                placeholder="$"
                value={10}
                name="risk"
                id="risk"
              />
            </div>
          </div>
          <button id='calculate'>Calculate</button>
        </form>
      </div>
      <h3>Position Size: <span id="color"> {answer}</span></h3>

      <h3 id="green">Target: {target}</h3>
      <h3 id="risk">Stop: {stop}</h3>
    </>
  );
};

export default Form;