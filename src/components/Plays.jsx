import React, { useEffect, useState } from 'react';

const Plays = props => {
  const [tickers, setTickers] = useState(null)
  const [saveTradeId, setSaveTradeId] = useState(null)

  const getTickers = () => {
    let storage = JSON.parse(sessionStorage.getItem('tickers'))
    setTickers(storage.reverse())
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

  const saveTrade = (e) => {
    e.preventDefault();
    let id = saveTradeId
    let trade;
    let storage = JSON.parse(sessionStorage.getItem('tickers'))
    storage.forEach(item => {
      if (item[0] === id) {
        trade = item
      }
    })
    trade.push(e.target.profit.value)
  }

  useEffect(() => {
    if (props.count > 0) {
      getTickers()
    }
  }, [props.count])

  return (
    <div className="plays">
      <h2>Plays</h2>
      <div className="tickers">
        <h4 className="titles">Ticker</h4>
        <h3 id="bold" className="titles">Entry</h3>
        <h4 className="titles">Shares</h4>
        <h4 id="green" className="titles">Target Price</h4>
        <h4 id="red" className="titles">Stop Price</h4>
        <h4 className="titles">Stop $</h4>
        <h4 id="red" className="titles">Delete</h4>
        <h4 className="titles">Setup</h4>
        <h4 className="titles">Gross Profit</h4>
      </div>
      { tickers !== null && (
        tickers.map(ticker => {
          let name = ticker[1].ticker
          let entry = ticker[1].stockPrice
          return (
          <>
            <div className="tickers">
              <p className="ticker">${name.toUpperCase()}</p>
              <p className="ticker">$ {entry.toFixed(2)}</p>
              <p className="ticker">{ticker[1].shares}</p>
              <p id="green" className="ticker">{ticker[1].targets[0]}, {ticker[1].targets[1]}, {ticker[1].targets[2]}</p>
              <p id="red" className="ticker">{ticker[1].sp}</p>
              <p className="ticker">{ticker[1].stop}</p>
              <a onClick={() => deleteItem(ticker[0])}><h4 id="delete" className="ticker">X</h4></a>
              <p className="ticker">{ticker[1].setup}</p>
              <form onSubmit={saveTrade} onClick={() => setSaveTradeId(ticker[0])}>
                <input required type='number' placeholder="$" name="profit" id="profit"/>
                <button id='save-trade'>Save</button>
              </form>
            </div>
          </>
          )
        })
      )}
    </div>
  );
}

export default Plays;