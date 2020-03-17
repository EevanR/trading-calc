import React, { useEffect, useState } from 'react';

const Plays = props => {
  const [tickers, setTickers] = useState(null)
  const getTickers = () => {
    let storage = JSON.parse(sessionStorage.getItem('tickers'))
    setTickers(storage)
  }

  useEffect(() => {
    if (props.count > 0) {
      getTickers()
    }
  }, [props.count])

  return (
    <>
      <h2>Plays</h2>
      <div className="tickers">
        <h4 className="titles">Ticker</h4>
        <h4 className="titles">Shares</h4>
        <h4 className="titles">Target Price</h4>
        <h4 className="titles">Stop Price</h4>
        <h4 className="titles">Stop $$</h4>
      </div>
      { tickers !== null && (
        tickers.map(ticker => {
          return (
          <>
            <div className="tickers">
              <p className="ticker">$ {ticker.ticker}</p>
              <p className="ticker">{ticker.shares}</p>
              <p className="ticker">{ticker.tp}</p>
              <p className="ticker">{ticker.sp}</p>
              <p className="ticker">{ticker.stop}</p>
            </div>
          </>
          )
        })
      )}
    </>
  );
}

export default Plays;