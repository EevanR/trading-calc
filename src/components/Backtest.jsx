import React, { useState, useEffect } from "react";
import { getIntradayData } from "../modules/backtest";
import { Line } from 'react-chartjs-2';


const Backtest = () => {
  const [intraPrices, setIntraPrices] = useState([])
  const [intraTimes, setIntraTimes] = useState([])
  const [ticker, setTicker] = useState("")

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
        let item = newArray[i][0].substring(0, newArray[i][0].indexOf(" "))
        if (item === "2020-04-29") {
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
        <h1>Backtesting</h1>
        <form onSubmit={runTest}>
          <label>Ticker</label>
          <input required type='text' name="testTicker" id="testTicker"/>
          <button id="test" type="submit">Run test</button>
        </form>
      </div>
      <div className="backtest-chart">
        <Line 
          data = {lineData}
          options = {lineOptions}
          height={500}
        />
      </div>
    </>
  )
}

export default Backtest;