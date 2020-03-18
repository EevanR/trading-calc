import React, { useEffect, useState } from 'react';

const Plays = props => {
  const [tickers, setTickers] = useState(null)
  const getTickers = () => {
    let storage = JSON.parse(sessionStorage.getItem('tickers'))
    setTickers(storage)
  }

  const deleteItem = (e) => {
    let tickers = []
    let storage = JSON.parse(sessionStorage.getItem('tickers'))
    storage.forEach(item => {
      if (item[0] !== e) {
        tickers.push(item)
      }
    })
    sessionStorage.setItem('tickers', JSON.stringify(tickers))
    getTickers()
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
        <h3 id="bold" className="titles">Entry</h3>
        <h4 className="titles">Shares</h4>
        <h4 id="green" className="titles">Target Price</h4>
        <h4 id="red" className="titles">Stop Price</h4>
        <h4 className="titles">Stop $</h4>
        <h4 id="red" className="titles">Delete</h4>
      </div>
      { tickers !== null && (
        tickers.reverse().map(ticker => {
          let name = ticker[1].ticker
          let entry = ticker[1].stockPrice
          return (
          <>
            <div className="tickers">
              <p className="ticker">${name.toUpperCase()}</p>
              <p className="ticker">$ {entry}</p>
              <p className="ticker">{ticker[1].shares}</p>
              <p id="green" className="ticker">{ticker[1].tp}</p>
              <p id="red" className="ticker">{ticker[1].sp}</p>
              <p className="ticker">{ticker[1].stop}</p>
              <a onClick={() => deleteItem(ticker[0])}><h4 id="delete" className="ticker">X</h4></a>
            </div>
          </>
          )
        })
      )}
    </>
  );
}

export default Plays;