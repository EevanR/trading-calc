import React, { useState } from "react";
import { getIntradayData, getGapData, getVwapData } from "../modules/backtest";
import { Line } from 'react-chartjs-2';

const GapStats = () => {
  const [intraPrices, setIntraPrices] = useState([])
  const [vwap, setVwap] = useState([])
  const [intraTimes, setIntraTimes] = useState([])
  const [chartTicker, setChartTicker] = useState("")
  const [gapStats, setGapStats] = useState([])
  const [chartDate, setChartDate] = useState(null)
  const [gapSearches, setGapSearches] = useState([])
  const [gapSearchShow, setGapSearchShow] = useState(null)

  const runTest = async (e) => {
    e.preventDefault();
    setChartTicker(e.target.testTicker.value)
    let gaps = []
    let t = e.target.testTicker.value
    let response2 = await getGapData(t);
    debugger
    if (response2.data["Time Series (Daily)"]) {
      let data = response2.data["Time Series (Daily)"]
      let newArray = Object.entries(data)
      for (let i=newArray.length - 1; i >= 0; i--) {
        if (newArray[i+1] !== undefined) {
          if (newArray[i][1]["1. open"] > newArray[i+1][1]["4. close"]) {
            let gap = newArray[i][1]["1. open"] - newArray[i+1][1]["4. close"]
            let gapPercent = (gap/newArray[i+1][1]["4. close"])*100
            let closeBelowOpen = parseFloat(newArray[i][1]["1. open"]) > parseFloat(newArray[i][1]["4. close"]) ? "true" : "false"
            let closeAboveOpenPercent = ((newArray[i][1]["4. close"] - newArray[i][1]["1. open"])/newArray[i][1]["1. open"])*100
            let volume = newArray[i][1]["6. volume"]
            let gapDay = [
              newArray[i][0],
              {
                gap: gap,
                gapPercent: gapPercent,
                highFromOpen: (newArray[i][1]["2. high"]/newArray[i][1]["1. open"])*100,
                range: newArray[i][1]["2. high"] - newArray[i][1]["3. low"],
                closeBelowOpen: closeBelowOpen,
                closeAboveOpenPercent: closeAboveOpenPercent,
                volume: volume
              }
            ]
            if (gapPercent > 19 && volume > 1000000) gaps.push(gapDay)
          }
        }
      }
      let gapCount = gaps.length
      let gapPercents = 0
      let spikes = 0
      let closesAboveOpenCount = 0
      let closesBelowOpenCount = 0
      let closesAboveOpenGain = 0
      let closesBelowOpenGain = 0
      let ranges = 0
      gaps.forEach(day => {
        gapPercents += day[1]["gapPercent"]
        spikes += day[1]["highFromOpen"]
        if (day[1]["closeBelowOpen"] === "false") {
          closesAboveOpenCount++
          closesAboveOpenGain += day[1]["closeAboveOpenPercent"]
        } else {
          closesBelowOpenCount++
          closesBelowOpenGain += day[1]["closeAboveOpenPercent"]
        }
        ranges += day[1]["range"]
      })
      let avgGapPercent = (gapPercents/gapCount).toFixed(2)
      let avgSpike = ((spikes/gapCount)-100).toFixed(2)
      let closeAboveOpen = (closesAboveOpenGain/closesAboveOpenCount).toFixed(2)
      let closeBelowOpen = (closesBelowOpenGain/closesBelowOpenCount).toFixed(2)
      let avgRange = (ranges/gapCount).toFixed(2)
      let stats = [gapCount, avgGapPercent, avgSpike, closesAboveOpenCount, closeAboveOpen, closeBelowOpen, avgRange, (closesAboveOpenCount/gapCount)]
      setGapStats(stats)
      setGapSearches([...gapSearches, [t, stats]])
    } else {
      alert("Could not find ticker")
    }

    let response = await getIntradayData(t);
    if (response.data['Time Series (15min)']) {
      let data = response.data['Time Series (15min)']
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
    }

    let response3 = await getVwapData(t);
    if (response3.data['Technical Analysis: VWAP']) {
      let data = response3.data['Technical Analysis: VWAP']
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
      for (let i=array.length - 1; i >= 0; i--) {
        prices.push(array[i][1]["VWAP"])
      }
      setVwap(prices)
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
      },
      {
        type: "line",
        label: "VWAP",
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgb(207, 107, 36)',
        borderCapStyle: 'butt',
        borderDash: [],
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointRadius: 4,
        data: vwap
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

  const showStats = (gapEntry) => {
    gapSearches.forEach(item => {
      if (item[0] === gapEntry) {
        setGapSearchShow(item)
      }
    })
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
        <div id="gap-stats">
          <div>
            <h4>Gaps Above 20%:</h4>
            <h4>Avg gap:</h4>
            <h4>Avg GapUp Spike Above Open:</h4>
            <h4>Gap Up Closes Above Open:</h4>
            <h4>Avg % close Above Open:</h4>
            <h4>Avg % close Below Open:</h4>
            <h4>Avg Gapper Range (Low to High):</h4>
          </div>
          <div>
            <h4> {gapStats[0]}</h4>
            <h4> {gapStats[1]}%</h4>
            <h4> {gapStats[2]}%</h4>
            <h4 id={gapStats[3] < (gapStats[0]/2) ? "backtest-red" : ""}> {gapStats[3]} / {(gapStats[7]*100).toFixed(2)}%</h4>
            <h4> +{gapStats[4]}%</h4>
            <h4 id="backtest-red"> {gapStats[5]}%</h4>
            <h4> ${gapStats[6]}</h4>
          </div>
          <div>
            {gapSearches !== [] && (
              gapSearches.map(entry => {
                return (
                  <>
                    <h4 
                    key={entry[0]} 
                    onClick={() => showStats(entry[0])}
                    id="gapStatList"
                    >
                      {entry[0] } {gapSearchShow !== null && gapSearchShow[0] === entry[0] && (<h4 style={{float: "right"}}>=></h4>)}
                    </h4>
                  </>
                )
              })
            )}
          </div>
          <div>
            {gapSearchShow !== null && (
              <div className="gapShow">
                <div>
                  <h4>Gaps Above 20%:</h4>
                  <h4>Avg gap:</h4>
                  <h4>Avg GapUp Spike Above Open:</h4>
                  <h4>Gap Up Closes Above Open:</h4>
                  <h4>Avg % close Above Open:</h4>
                  <h4>Avg % close Below Open:</h4>
                  <h4>Avg Gapper Range (Low to High):</h4>
                </div>
                <div>
                  <h4>{gapSearchShow[1][0]}</h4>
                  <h4>{gapSearchShow[1][1]}%</h4>
                  <h4>{gapSearchShow[1][2]}%</h4> 
                  <h4>{gapSearchShow[1][3]}</h4>
                  <h4>+{gapSearchShow[1][4]}%</h4>
                  <h4>{gapSearchShow[1][5]}%</h4>
                  <h4>${gapSearchShow[1][6]}</h4>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default GapStats;