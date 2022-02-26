import React, { useState } from "react";
import { getGapData } from "../modules/backtest";
import { Line } from 'react-chartjs-2';
import { connect } from "react-redux";
import Papa from 'papaparse';
import { Form } from 'semantic-ui-react'

const GapStats = props => {
  const [intraPrices, setIntraPrices] = useState([[], [], []])
  const [intraTimes, setIntraTimes] = useState([])
  const [chartTicker, setChartTicker] = useState("")
  const [gapStats, setGapStats] = useState({})
  const [chartDate, setChartDate] = useState(null)
  const [gapSearchShow, setGapSearchShow] = useState(null)

  const runTest = async (e) => {
    setIntraPrices([[], [], []])
    e.preventDefault();
    setChartTicker((e.target.testTicker.value).toUpperCase())

    let mostRecentGapDate = ""
    let t = e.target.testTicker.value
    let response2 = await getGapData(t);
    let newArray;

    let grouped = {
      gapCount: 0,
      gapPercents: 0,
      spikes: 0,
      closesOpen: [0, 0, 0, 0], //[Above open count, below open count, above open gain, below open gain]
      ranges: 0,
      day2UpDown: [0, 0, 0, 0] // [Up count, Down count, Up Avg, Down Avg]
    }

    const sortIntraDay = (results) => {
      let newArray = results["data"].reverse()
      let pv = 0
      let cumulatieVolume = 0
      let pricesTimes = {
        PreMark: [],
        Main: [],
        VWAP: [],
        Labels: [],
        SMA: []
      }
      let smaArray = []
      for (let i=2; i<newArray.length-1; i++) {
        let time = newArray[i][0].substring(11, 16).split(":")
        let decimalTime = ((Number(time[0]) * 60) + Number(time[1]))/1440
        let date = newArray[i][0].substring(0, 10)
        if (date === mostRecentGapDate) {
          decimalTime <= 0.398333333 ? (pricesTimes['PreMark'].push(newArray[i][4]) && pricesTimes['Main'].push(newArray[i][4])) : pricesTimes['Main'].push(newArray[i][4])
          pricesTimes['Labels'].push(newArray[i][0].substring(11, 16))
          //VWAP CALCULATION
          pv += ((Number(newArray[i][2])+Number(newArray[i][3])+Number(newArray[i][4]))/3)*Number(newArray[i][5])
          cumulatieVolume += Number(newArray[i][5])
          pricesTimes['VWAP'].push(pv/cumulatieVolume)

          //SMA CALCULATION
          smaArray.length < 50 && smaArray.push(Number(newArray[i][4]))
          if (smaArray.length === 50) {
            let value = (smaArray.reduce((a, b) => a + b, 0))/50
            pricesTimes['SMA'].push(value)
            smaArray.shift()
          } else {
            pricesTimes['SMA'].push(null)
          }
        }
      }
      setIntraPrices([pricesTimes['PreMark'], pricesTimes['Main'], pricesTimes['VWAP'], pricesTimes['SMA']])
      setIntraTimes(pricesTimes['Labels'])
      setSearches(pricesTimes)
    }

    const papa = (month, years) => {
      let apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API
      let demo ="https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=demo"
      let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${t}&interval=5min&slice=year${years}month${month}&apikey=${apiKey}`
      Papa.parse(url, {
        download: true,
        complete: function(results) {
          sortIntraDay(results)
        }
      })
    }

    const findGapDateSlice = (date) => {
      let recentDate = date.split("-").reverse()
      recentDate = recentDate.join("/")
      recentDate = new Date(date)
      let gapDateEpoch = recentDate.getTime()/1000.0
      let currentDateEpoch = Math.floor(new Date().getTime()/1000.0)
      let monthsBack = (Math.floor((currentDateEpoch - gapDateEpoch)/2592000)+1)
      let years = 1
      if (monthsBack >= 12) {
        monthsBack = Math.floor(monthsBack-12)
        years += 1
      }
      papa(monthsBack, years)
    }

    const tickerDataReceived = () => {
      for (let i=1; i < newArray.length; i++) {
        let variables = {
          open: Number(newArray[i][1]["1. open"]),
          currentDayClose:  Number(newArray[i][1]["4. close"]),
          highOfDay: Number(newArray[i][1]["2. high"]),
          volume: Number(newArray[i][1]["5. volume"]),
          previousDayClose: Number(newArray[i-1][1]["4. close"])
        }
        variables['gapPercent'] = ((variables.open - variables.previousDayClose)/variables.previousDayClose)*100

        if ((variables['gapPercent'] > 19) && (variables.volume > 900000)) {
          mostRecentGapDate = newArray[i][0]
          variables['closeBelowOpen'] = (variables.open > variables.currentDayClose ? "true" : "false")
          if (newArray[i+1] !== undefined) {
            let nextDayOpen = Number(newArray[i+1][1]["1. open"])
            variables['day2'] = ((nextDayOpen - variables.currentDayClose)/variables.currentDayClose) * 100
            variables["day2"] > 0 ? (grouped['day2UpDown'][2] += variables['day2']) && grouped['day2UpDown'][0]++ : (grouped['day2UpDown'][3] += variables['day2']) && (grouped['day2UpDown'][1]++)
          }

          grouped['gapCount']++
          grouped['gapPercents'] += ((variables.open - variables.previousDayClose)/variables.previousDayClose)*100
          grouped['spikes'] += ((variables.highOfDay-variables.open)/variables.open)*100
          grouped['ranges'] += (variables.highOfDay - Number(newArray[i][1]["3. low"]))
          if (variables['closeBelowOpen'] === "false") {
            grouped['closesOpen'][0]++
            grouped['closesOpen'][2] += ((variables.currentDayClose - variables.open)/variables.open)*100
          } else {
            grouped['closesOpen'][1]++
            grouped['closesOpen'][3] += ((variables.currentDayClose - variables.open)/variables.open)*100
          }
        }
      }
      setChartDate(mostRecentGapDate)
      findGapDateSlice(mostRecentGapDate)
    }

    if (response2.data["Time Series (Daily)"]) {
      newArray = Object.entries(response2.data["Time Series (Daily)"])
      newArray = newArray.reverse()
      tickerDataReceived()
    } else {
      alert("Could not find ticker")
    }

    let stats = {
      gapCount: grouped['gapCount'],
      avgGapPercent: (grouped['gapPercents']/grouped['gapCount']).toFixed(2),
      avgSpike: (grouped['spikes']/grouped['gapCount']).toFixed(2),
      closesAboveOpenCount: grouped['closesOpen'][0],
      closeAboveOpen: (grouped['closesOpen'][2]/grouped['closesOpen'][0]).toFixed(2),
      closeBelowOpen: (grouped['closesOpen'][3]/grouped['closesOpen'][1]).toFixed(2),
      avgRange: (grouped['ranges']/grouped['gapCount']).toFixed(2),
      day2UpCount: grouped['day2UpDown'][0],
      day2DownCount: grouped['day2UpDown'][1],
      day2AvgUp: (grouped['day2UpDown'][2]/grouped['day2UpDown'][0]).toFixed(2),
      day2AvgDown: (grouped['day2UpDown'][3]/grouped['day2UpDown'][1]).toFixed(2)
    }
    setGapStats(stats)
    
    const setSearches = (pricesTimes) => {
      props.setGapSearches([...props.gapSearches, [t, stats, pricesTimes]])
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
        data: intraPrices[1]
      },
      {
        label: "PreMarket",
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'grey',
        borderColor: 'darkgrey',
        borderCapStyle: 'butt',
        borderDash: [],
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointRadius: 4,
        data: intraPrices[0]
      },
      {
        type: "line",
        label: "VWAP",
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgb(207, 107, 36)',
        borderCapStyle: 'butt',
        pointBorderWidth: 0,
        pointHoverRadius: 5,
        pointRadius: 1,
        data: intraPrices[2]
      },
      {
        type: "line",
        label: "50SMA",
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgb(0, 0, 255)',
        borderCapStyle: 'butt',
        pointBorderWidth: 0,
        pointHoverRadius: 5,
        pointRadius: 1,
        data: intraPrices[3]
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
    props.gapSearches.forEach(item => {
      if (item[0] === gapEntry) {
        setGapSearchShow(item)
        setIntraPrices([item[2]['PreMark'], item[2]['Main'], item[2]['VWAP'], item[2]['SMA']])
        setIntraTimes(item[2]['Labels'])
        setChartTicker(item[0].toUpperCase())
      }
    })
  }

  let gapSearches;
  {props.gapSearches !== [] &&
    (gapSearches = props.gapSearches.map(entry => {
      return (
        <div>
          <h4 
          key={entry[0]} 
          onClick={() => showStats(entry[0])}
          id="gapStatList"
          >
            {entry[0].toUpperCase()} {gapSearchShow !== null && gapSearchShow[0] === entry[0] && (<h4 id="gap-show-arrow" style={{float: "right"}}>-&gt;</h4>)}
          </h4>
        </div>
      )
    }))
  }

  return (
    <>
      <section className="bg-verydark tab gap-stats" id="graphs">
        <div className="container-wide">
          <div className="foreground bg-dark">
            <h2>Historic Gap Stats</h2>
            <h4>Recent Gap Chart {chartDate} (5min)</h4>
            <Form onSubmit={runTest}>
              <input placeholder="Ticker" required type='text' name="testTicker" id="testTicker"/>
              <button className="ui button" id="loadChart" type="submit">Find Stats</button>
            </Form>
          </div>
          <div className="foreground bg-dark">
            <Line
              data = {lineData}
              options = {lineOptions}
              height={500}
              width={100}
            />
          </div>
          {chartTicker !== "" && gapStats["gapCount"] !== undefined && (
            <div className="foreground bg-dark">
              <h2>Stats {chartTicker}</h2>
              <div className="two-column-grid gap-stats">
                <h4 className="right-align">Gaps Above 20%:</h4>
                <h4> {gapStats["gapCount"]}</h4>
                <h4 className="right-align">Avg gap:</h4>
                <h4> {gapStats["avgGapPercent"]}%</h4>
                <h4 className="right-align">Avg GapUp Spike Above Open:</h4>
                <h4> {gapStats["avgSpike"]}%</h4>
                <h4 className="right-align">Gap Up Closes Above Open:</h4>
                <h4 id={gapStats["closesAboveOpenCount"] < (gapStats["gapCount"]/2) ? "backtest-red" : ""}> {gapStats["closesAboveOpenCount"]} ({((gapStats["closesAboveOpenCount"]/gapStats["gapCount"])*100).toFixed(2)}%)</h4>
                <h4 className="right-align">Avg % close Above Open:</h4>
                <h4> +{gapStats["closeAboveOpen"]}%</h4>
                <h4 className="right-align">Avg % close Below Open:</h4>
                <h4 id="backtest-red"> {gapStats["closeBelowOpen"]}%</h4>
                <h4 className="right-align">Avg Gapper Range (Low to High):</h4>
                <h4> ${gapStats["avgRange"]}</h4>
                <h4 className="right-align">Day 2 Gap up Count:</h4>
                <h4> {gapStats["day2UpCount"]} ({((gapStats["day2UpCount"]/gapStats["gapCount"])*100).toFixed(2)}%)</h4>
                <h4 className="right-align">Day 2 Gap Down Count:</h4>
                <h4> {gapStats["day2DownCount"]}</h4>
                <h4 className="right-align">Day 2 Avg Gap up:</h4>
                <h4>{gapStats["day2AvgUp"]}%</h4>
                <h4 className="right-align">Day 2 Avg Gap Down:</h4>
                <h4>{gapStats["day2AvgDown"]}%</h4>
              </div>
            </div>
          )} 
          {props.gapSearches !== [] && (
            <div className="foreground bg-dark">
              <h2>Recent Searches</h2>
              {gapSearches.length === 0 && <h4>No Recent Searches</h4>}
              <div className="gap-show-stats two-column-grid">  
                <div>
                  {gapSearches}
                </div>
                {gapSearchShow !== null && (   
                  <div className="two-column-grid gap-show">
                    <h4 className="right-align">Gaps Above 20%:</h4>
                    <h4>{gapSearchShow[1]["gapCount"]}</h4>
                    <h4 className="right-align">Avg gap:</h4>
                    <h4>{gapSearchShow[1]["avgGapPercent"]}%</h4>
                    <h4 className="right-align">Avg GapUp Spike Above Open:</h4>
                    <h4>{gapSearchShow[1]["avgSpike"]}%</h4>
                    <h4 className="right-align">Gap Up Closes Above Open:</h4> 
                    <h4>{gapSearchShow[1]["closesAboveOpenCount"]} ({((gapSearchShow[1]["closesAboveOpenCount"]/gapSearchShow[1]["gapCount"])*100).toFixed(2)}%)</h4>
                    <h4 className="right-align">Avg % close Above Open:</h4>
                    <h4>+{gapSearchShow[1]["closeAboveOpen"]}%</h4>
                    <h4 className="right-align">Avg % close Below Open:</h4>
                    <h4 id="backtest-red">{gapSearchShow[1]["closeBelowOpen"]}%</h4>
                    <h4 className="right-align">Avg Gapper Range (Low to High):</h4>
                    <h4>${gapSearchShow[1]["avgRange"]}</h4>
                    <h4 className="right-align">Day 2 Gap up Count:</h4>
                    <h4>{gapSearchShow[1]["day2UpCount"]}</h4>
                    <h4 className="right-align">Day 2 Gap Down Count:</h4>
                    <h4>{gapSearchShow[1]["day2DownCount"]}</h4>
                    <h4 className="right-align">Day 2 Avg Gap up:</h4>
                    <h4>{gapSearchShow[1]["day2AvgUp"]}%</h4>
                    <h4 className="right-align">Day 2 Avg Gap Down:</h4>
                    <h4>{gapSearchShow[1]["day2AvgDown"]}%</h4>
                  </div>
                )}
              </div>
            </div>
          )}
        </div> 
      </section>
      <section className="footer bg-dark">
        <p >Copyright © TradeLogs 2022. All rights reserved.</p>
      </section>
    </>
  )
}

const mapStateToProps = state => {
  return {
    gapSearches: state.gapSearches
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGapSearches: data => {
      dispatch({ type: "GAP_SEARCHES", payload: data })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GapStats);