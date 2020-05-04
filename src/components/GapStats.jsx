import React, { useState } from "react";
import { getIntradayData, getGapData } from "../modules/backtest";
import { Line } from 'react-chartjs-2';

const Backtest = () => {
  const [intraPrices, setIntraPrices] = useState([])
  const [intraTimes, setIntraTimes] = useState([])
  const [chartTicker, setChartTicker] = useState("")
  const [gapStats, setGapStats] = useState([])
  const [chartDate, setChartDate] = useState(null)

  const runTest = async (e) => {
    e.preventDefault();
    setChartTicker(e.target.testTicker.value)
    let gaps = []

    let t = e.target.testTicker.value

    let response2 = await getGapData(t);
    if (response2.status === 200) {
      let data = response2.data["Time Series (Daily)"]
      let newArray = Object.entries(data)
      for (let i=newArray.length - 1; i >= 0; i--) {
        if (newArray[i+1] !== undefined) {
          if (newArray[i][1]["1. open"] > newArray[i+1][1]["4. close"]) {
            let gap = newArray[i][1]["1. open"] - newArray[i+1][1]["4. close"]
            let gapPercent = (gap/newArray[i+1][1]["4. close"])*100
            let closeBelowOpen = parseFloat(newArray[i][1]["1. open"]) > parseFloat(newArray[i][1]["4. close"]) ? "true" : "false"
            let closeAboveOpenPercent = ((newArray[i][1]["4. close"] - newArray[i][1]["1. open"])/newArray[i][1]["1. open"])*100
            let gapDay = [
              newArray[i][0],
              {
                gap: gap,
                gapPercent: gapPercent,
                highFromOpen: (newArray[i][1]["2. high"]/newArray[i][1]["1. open"])*100,
                range: newArray[i][1]["2. high"] - newArray[i][1]["3. low"],
                closeBelowOpen: closeBelowOpen,
                closeAboveOpenPercent: closeAboveOpenPercent,
                volume: newArray[i][1]["6. volume"]
              }
            ]
            if (gapPercent > 19) gaps.push(gapDay)
          }
        }
      }
      let gapCount = gaps.length
      let gapPercents = 0
      let spikes = 0
      let closesAboveOpenCount = 0
      let closesAboveOpenGain = 0
      let ranges = 0
      gaps.forEach(day => {
        gapPercents += day[1]["gapPercent"]
        spikes += day[1]["highFromOpen"]
        if (day[1]["closeBelowOpen"] === "false") {
          closesAboveOpenCount++
        }
        closesAboveOpenGain += day[1]["closeAboveOpenPercent"]
        ranges += day[1]["range"]
      })
      let avgGapPercent = (gapPercents/gapCount).toFixed(2)
      let avgSpike = (spikes/gapCount).toFixed(2)
      let closeAboveOpen = (closesAboveOpenGain/gapCount).toFixed(2)
      let avgRange = (ranges/gapCount).toFixed(2)
      setGapStats([gapCount, avgGapPercent, avgSpike, closesAboveOpenCount, closeAboveOpen, avgRange])
    } else {

    }

    let response = await getIntradayData(t);
    if (response.status === 200) {
      let data = response.data['Time Series (5min)']
      let newArray = Object.entries(data)
      let array = []
      for (let i=0; i<newArray.length; i++) {
        let date = newArray[i][0].substring(0, newArray[i][0].indexOf(" "))
        let recent = gaps.length - 1
        setChartDate(gaps[recent][0])
        if (date === gaps[recent][0]) {
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
        label: chartTicker,
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
        <h2>Historic Gap Stats</h2>
        <h3 style={{marginBottom: "40px"}}>Recent Gap Chart {chartDate} (5min)</h3>
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
      <h3 style={{marginBottom: "20px"}}>Stats {chartTicker}</h3>
      { gapStats.length > 0 && (
        <div style={{marginBottom: "50px"}}>
          <h3>Gaps Above 20%: {gapStats[0]}</h3>
          <h3>Avg gap: {gapStats[1]}%</h3>
          <h3>Avg GapUp Spike Above Open: {gapStats[2]}%</h3>
          <h3>Gap Up Closes Above Open: {gapStats[3]}</h3>
          <h3>Avg % close Above Open: {gapStats[4]}%</h3>
          <h3>Avg Gap Range: ${gapStats[5]}</h3>
        </div>
      )}
    </>
  )
}

export default Backtest;