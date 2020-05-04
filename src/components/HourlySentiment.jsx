import React, { useState } from "react";
import { getIntradayData } from "../modules/backtest";


const HourlySentiment = () => {
  const [startTest, setStartTest] = useState(false)
  const [testOneData, setTestOneData] = useState([])

  let list = [
    ["AMTX", "2020-05-01"], 
    ["SPI", "2020-05-01"],
    ["MYO", "2020-05-01"],
    ["MDGS", "2020-05-01"],
    ["AVEO", "2020-04-30"],
    ["UAVS", "2020-04-30"],
    ["TRIB", "2020-04-30"],
    ["THMO", "2020-04-30"],
    ["SDC", "2020-04-29"],
    ["CMRX", "2020-04-29"],
    ["BCRX", "2020-04-29"], 
    ["AMC", "2020-04-29"],
    ["AMC", "2020-04-28"],
    ["SNDX", "2020-04-28"],
    ["SDC", "2020-04-28"],
    ["RTIX", "2020-04-28"], 
    ["IBIO", "2020-04-28"],
    ["CREX", "2020-04-28"],
    ["AVDL", "2020-04-27"],
    ["YTEN", "2020-04-27"],
    ["VXRT", "2020-04-27"], 
    ["NAKD", "2020-04-27"],
    ["THMO", "2020-04-24"],
    ["PSTI", "2020-04-24"],
    ["OAS", "2020-04-24"],
    ["MESO", "2020-04-24"],
    ["MDGS", "2020-04-24"],
    ["CPAH", "2020-04-23"],
    ["INO", "2020-04-23"],
    ["ENZ", "2020-04-23"],
    ["SBOW", "2020-04-22"], 
    ["SAEX", "2020-04-22"],
    ["PECK", "2020-04-22"],
    ["ATIF", "2020-04-22"],
    ["VXRT", "2020-04-21"],
    ["THMO", "2020-04-16"], 
    ["CHCI", "2020-04-15"],
    ["NURO", "2020-04-14"],
    ["SONN", "2020-04-14"],
    ["AIKI", "2020-04-14"]
  ]

  if (startTest === true ) {
    let date = []
    let listLength = list.length
    let count = 0
    let testCases = []
    let start = 0
    let end = 5

    const testing = () => {
      let batches = (listLength/5)
      let batch = list.slice(start, end)
      
      Promise.all(batch.map((ticker) => {
        date.push(ticker[1])
        return getIntradayData(ticker[0])
      })).then(tickers => {
        let d = -1
        tickers.forEach( item => {
          if (item.status === 200) { 
            d += 1
            testCases.push([date[d], item.data]) 
          }
        })
        setTimeout(() => {
          count++
          start += 5
          end += 5
          if (count === batches) {
            setStartTest(false)
            setTestOneData(testCases)
          } else {
            d = -1
            date = []
            testing()
          }
        }, 65000);
      })
    }

    if (count === 0) {
      testing()
    }
  }

  let testOneResults;
  let averages = []
  if (testOneData.length === list.length) {
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
        if (dateOnly === item[0]) {
          array.push(dates[i])
        }
      }

      for (let i=array.length - 1; i >= 0; i--) {
        high = parseFloat(array[i][1]["2. high"]) > parseFloat(high) ? array[i][1]["2. high"] : high
        low = parseFloat(array[i][1]["3. low"]) < parseFloat(low) ? array[i][1]["3. low"] : low
      }

      let range = high - low
      for (let i=array.length - 1; i >= 0; i--) {
        if (array[i][0].substring(11, dates[i][0].indexOf(":")) == hour) {
          if (array[i][0].substring(11) === "09:35:00") {
            zoneStart = parseFloat(array[i][1]["1. open"])
          } else if (array[i][0].substring("14") === "05:00") {
            zoneStart = parseFloat(array[i][1]["1. open"])
          } else {
            
          }
        } else {
          zoneEnd = parseFloat(array[i][1]["4. close"])
          let gain = zoneEnd - zoneStart
          let gp = (gain/range)*100
          sentiment.push([hour, gp.toFixed(2)])
          averages.push([hour, gp.toFixed(2)])
          hour = hour + 1
        }
      }
      
      return (
        <div id="backtest-result">
          <h4>{name} {item[0]}</h4>
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

  let averageResults = []
  if (averages.length > 0) {
    let times = [9, 10, 11, 12, 13, 14, 15]
    times.forEach( time => {
      let total = 0
      let count = 0
      for (let i=0; i<averages.length; i++) {
        if (averages[i][0] === time) {
          total += parseFloat(averages[i][1])
          count++
        }
      }
      averageResults.push((total/count).toFixed(2))
      total = 0 
      count = 0
    })
  }

  return (
    <div>
      <h1>Backtesting</h1>
      <button id="runTest" onClick={() => setStartTest(true)}>Run test</button>
      <h3>Hourly Sentiment Results</h3>
      <div className="testone-results">
        {testOneResults}
      </div>
      <h3>Overall Results</h3>
      <h4 id={averageResults[0] < 0 ? "backtest-red" : ""}>9:30 => {averageResults[0]} %</h4>
      <h4 id={averageResults[1] < 0 ? "backtest-red" : ""}>10:00 => {averageResults[1]} %</h4>
      <h4 id={averageResults[2] < 0 ? "backtest-red" : ""}>11:00 => {averageResults[2]} %</h4>
      <h4 id={averageResults[3] < 0 ? "backtest-red" : ""}>12:00 => {averageResults[3]} %</h4>
      <h4 id={averageResults[4] < 0 ? "backtest-red" : ""}>13:00 => {averageResults[4]} %</h4>
      <h4 id={averageResults[5] < 0 ? "backtest-red" : ""}>14:00 => {averageResults[5]} %</h4>
      <h4 id={averageResults[6] < 0 ? "backtest-red" : ""}>15:00 => {averageResults[6]} %</h4>
    </div>
  )
}

export default HourlySentiment