import React, { useState, useEffect } from "react";
import { getIntradayData } from "../modules/backtest";
import { Line } from 'react-chartjs-2';


const Backtest = () => {
  const [intraPrices, setIntraPrices] = useState([])
  const [intraTimes, setIntraTimes] = useState([])
  const [ticker, setTicker] = useState("")
  const [startTest, setStartTest] = useState(false)
  const [testOneData, setTestOneData] = useState([])

  const runTest = async (e) => {
    e.preventDefault();
    setTicker(e.target.testTicker.value)
    let t = e.target.testTicker.value
    let response = await getIntradayData(t);
    if (response.status === 200) {
      let data = response.data['Time Series (5min)']
      let newArray = Object.entries(data)
      let array = []
      for (let i=0; i<newArray.length; i++) {
        let date = newArray[i][0].substring(0, newArray[i][0].indexOf(" "))
        if (date === "2020-04-29") {
          array.push(newArray[i])
        }
      }
      let prices = []
      let times = []
      for (let i=array.length - 1; i >= 0; i--) {
        prices.push(array[i][1]["4. close"])
        times.push(array[i][0].substring(11))
      }
      setIntraPrices(prices)
      setIntraTimes(times)
    } else {

    }
  }

  let list = [["IBM", "2020-04-29"], ["CAPR", "2020-04-29"]]
  if (startTest === true ) {
    let date;
    Promise.all(list.map( (ticker) => {
      date = ticker[1]
      return getIntradayData(ticker[0])
    })).then(tickers => {
      let testCases = []
      tickers.forEach( item => {
        if (item.status === 200) { 
          testCases.push([date, item.data]) 
        }
      })
      setTestOneData(testCases)
    })
    setStartTest(false)
  }

  let testOneResults;
  if (testOneData !== []) {
    testOneResults = testOneData.map( item => {
      let name = item[1]["Meta Data"]["2. Symbol"]
      let dates = Object.entries(item[1]["Time Series (5min)"])
      let array = []
      let zoneStart;
      let zoneEnd;
      let hour = 9
      let sentiment = []
      let high = 0
      let low = 100000

      for (let i=0; i<dates.length; i++) {
        let dateOnly = dates[i][0].substring(0, dates[i][0].indexOf(" "))
        debugger
        if (dateOnly === item[0]) {
          array.push(dates[i])
        }
      }

      for (let i=array.length - 1; i >= 0; i--) {
        high = array[i][1]["4. close"] > high ? array[i][1]["4. close"] : high
        low = array[i][1]["4. close"] < low ? array[i][1]["4. close"] : low
      }

      let range = high - low
      for (let i=array.length - 1; i >= 0; i--) {
        if (array[i][0].substring(11, dates[i][0].indexOf(":")) == hour) {
          if (array[i][0].substring(11) === "09:35:00") {
            zoneStart = parseFloat(array[i][1]["4. close"])
          } else if (array[i][0].substring("14") === "05:00") {
            zoneStart = parseFloat(array[i][1]["4. close"])
          } else {
            
          }
        } else {
          zoneEnd = parseFloat(array[i][1]["4. close"])
          let gain = zoneEnd - zoneStart
          let gp = (gain/range)*100
          sentiment.push([hour, gp.toFixed(2)])
          hour = hour + 1
        }
      }
      
      return (
        <div id="backtest-result">
          <h4>{name}</h4>
          {sentiment !== [] && (
            sentiment.map(time => {
              return (
                <p id={time[1] < 0 ? "backtest-red" : ""}>
                  {time[0]}:00 => {time[1]}%
                </p>
              )
            })
          )}
        </div>
      )
    })
  }

  const lineData = {
    labels: intraTimes,
    datasets: [
      {
        label: ticker,
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointRadius: 4,
        data: intraPrices
      }
    ]
  };

  const lineOptions = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "white"
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: "white"
        }
      }],
      xAxes: [{
        ticks: {
            fontColor: "white",
            fontSize: 14,
        }
      }]
    }
  }

  return (
    <>
      <div>
        <h1>Chart</h1>
        <form onSubmit={runTest}>
          <label>Ticker</label>
          <input required type='text' name="testTicker" id="testTicker"/>
          <button id="loadChart" type="submit">Display Chart</button>
        </form>
      </div>
      <div className="backtest-chart">
        <Line 
          data = {lineData}
          options = {lineOptions}
          height={500}
        />
      </div>
      <h1>Backtesting</h1>
      <button id="runTest" onClick={() => setStartTest(true)}>Run test</button>
      <h3>Hourly Sentiment Results</h3>
      <div className="testone-results">
        {testOneResults}
      </div>
    </>
  )
}

export default Backtest;