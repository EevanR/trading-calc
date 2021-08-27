import React, { useState } from "react";
import { getIntradayData, getGapData, getVwapData } from "../modules/backtest";
import { Line } from 'react-chartjs-2';
import { connect } from "react-redux";

const GapStats = props => {
  const [intraPrices, setIntraPrices] = useState([])
  const [vwap, setVwap] = useState([])
  const [intraTimes, setIntraTimes] = useState([])
  const [chartTicker, setChartTicker] = useState("")
  const [gapStats, setGapStats] = useState({})
  const [chartDate, setChartDate] = useState(null)
  const [gapSearchShow, setGapSearchShow] = useState(null)

  const runTest = async (e) => {
    e.preventDefault();
    setChartTicker((e.target.testTicker.value))

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

    const tickerDataReceived = () => {
      for (let i=1; i < newArray.length; i++) {
        let variables = {
          open: Number(newArray[i][1]["1. open"]),
          currentDayClose:  Number(newArray[i][1]["4. close"]),
          highOfDay: Number(newArray[i][1]["2. high"]),
          volume: Number(newArray[i][1]["6. volume"]),
          previousDayClose: Number(newArray[i-1][1]["4. close"])
        }
        variables['gapPercent'] = ((variables.open - variables.previousDayClose)/variables.previousDayClose)*100

        if ((variables['gapPercent'] > 19) && (variables.volume > 900000)) {
          mostRecentGapDate = newArray[i][0]
          variables['closeBelowOpen'] = variables.open > variables.currentDayClose ? "true" : "false"
          if (newArray[i+1] !== undefined) {
            let nextDayOpen = Number(newArray[i+1][1]["1. open"])
            variables['day2'] = ((nextDayOpen - variables.currentDayClose)/variables.currentDayClose) * 100
          }
          grouped['gapCount']++
          grouped['gapPercents'] += ((variables.open - variables.previousDayClose)/variables.previousDayClose)*100
          grouped['spikes'] += ((variables.highOfDay-variables.open)/variables.open)*100
          variables["day2"] > 0 ? (grouped['day2UpDown'][2] += variables['day2']) && grouped['day2UpDown'][0]++ : (grouped['day2UpDown'][3] -= variables['day2']) && (grouped['day2UpDown'][1]++)
          grouped['ranges'] += (variables.highOfDay - Number(newArray[i][1]["3. low"]))
          variables['closeBelowOpen'] === "false" && grouped['closesOpen'][0]++ && (grouped['closesOpen'][2] += ((variables.currentDayClose - variables.open)/variables.open)*100)
          variables['closeBelowOpen'] === "true" && grouped['closesOpen'][1]++ && (grouped['closesOpen'][3] += ((variables.currentDayClose - variables.open)/variables.open)*100)
        }
      }
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
    props.setGapSearches([...props.gapSearches, [t, stats]])

    let response = await getIntradayData(t);
    let datesArray = []
    if (response.data['Time Series (15min)']) {
      datesArray = Object.entries(response.data['Time Series (15min)'])
      datesArray.reverse()
      setChartDate(mostRecentGapDate)
      let pricesTimes = [[], []]
      for (let i=0; i<datesArray.length; i++) {
        let date = datesArray[i][0].substring(0, datesArray[i][0].indexOf(" "))
        date === mostRecentGapDate && pricesTimes[0].push(datesArray[i][1]["4. close"]) && pricesTimes[1].push(datesArray[i][0].substring(11))
      }
      setIntraPrices(pricesTimes[0])
      setIntraTimes(pricesTimes[1])
    }
    

    let response3 = await getVwapData(t);
    let vwapPrices = []
    if (response3.data['Technical Analysis: VWAP']) {
      let vwapDates = Object.entries(response3.data['Technical Analysis: VWAP'])
      vwapDates.reverse()
      for (let i=0; i<vwapDates.length; i++) {
        let date = vwapDates[i][0].substring(0, vwapDates[i][0].indexOf(" "))
        date === mostRecentGapDate && vwapPrices.push(vwapDates[i][1]["VWAP"])
      }
      setVwap(vwapPrices)
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
    props.gapSearches.forEach(item => {
      if (item[0] === gapEntry) {
        debugger
        setGapSearchShow(item)
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
            {entry[0] } {gapSearchShow !== null && gapSearchShow[0] === entry[0] && (<h4 style={{float: "right"}}>-&gt;</h4>)}
          </h4>
        </div>
      )
    }))
  }

  let statLabels = (
      <div>
        <h4>Gaps Above 20%:</h4>
        <h4>Avg gap:</h4>
        <h4>Avg GapUp Spike Above Open:</h4>
        <h4>Gap Up Closes Above Open:</h4>
        <h4>Avg % close Above Open:</h4>
        <h4>Avg % close Below Open:</h4>
        <h4>Avg Gapper Range (Low to High):</h4>
        <h4>Day 2 Gap up Count:</h4>
        <h4>Day 2 Gap Down Count:</h4>
        <h4>Day 2 Avg Gap up:</h4>
        <h4>Day 2 Avg Gap Down:</h4>
      </div>
  )

  return (
    <>
      <div>
        <h2>Historic Gap Stats</h2>
        <h3 style={{marginBottom: "40px"}}>Recent Gap Chart {chartDate} (15min)</h3>
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
        <div id="gap-stats">
        {gapStats.length !== {} && (
          <div className="currentShow">
            {statLabels}
            <div>
              <h4> {gapStats["gapCount"]}</h4>
              <h4> {gapStats["avgGapPercent"]}%</h4>
              <h4> {gapStats["avgSpike"]}%</h4>
              <h4 id={gapStats["closesAboveOpenCount"] < (gapStats["gapCount"]/2) ? "backtest-red" : ""}> {gapStats["closesAboveOpenCount"]} / {(gapStats["day2UpCount"]*100).toFixed(2)}%</h4>
              <h4> +{gapStats["closeAboveOpen"]}%</h4>
              <h4 id="backtest-red"> {gapStats["closeBelowOpen"]}%</h4>
              <h4> ${gapStats["avgRange"]}</h4>
              <h4> {gapStats["day2UpCount"]} / {((gapStats["day2UpCount"]/gapStats["gapCount"])*100).toFixed(2)}%</h4>
              <h4> {gapStats["day2DownCount"]}</h4>
              <h4>{gapStats["day2AvgUp"]}%</h4>
              <h4>{gapStats["day2AvgDown"]}%</h4>
            </div>
          </div>
          )} 
        <div className="gapShow">     
          <div>
            {gapSearches}
          </div>
          {gapSearchShow !== null && (
            <>
              {statLabels}
              <div>
                <h4>{gapSearchShow[1]["gapCount"]}</h4>
                <h4>{gapSearchShow[1]["avgGapPercent"]}%</h4>
                <h4>{gapSearchShow[1]["avgSpike"]}%</h4> 
                <h4>{gapSearchShow[1]["closesAboveOpenCount"]}</h4>
                <h4>+{gapSearchShow[1]["closeAboveOpen"]}%</h4>
                <h4 id="backtest-red">{gapSearchShow[1]["closeBelowOpen"]}%</h4>
                <h4>${gapSearchShow[1]["avgRange"]}</h4>
                <h4>{gapSearchShow[1]["day2UpCount"]}</h4>
                <h4>{gapSearchShow[1]["day2DownCount"]}</h4>
                <h4>{gapSearchShow[1]["day2AvgUp"]}%</h4>
                <h4>{gapSearchShow[1]["day2AvgDown"]}%</h4>
              </div>
            </>
          )}
        </div>
      </div> 
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