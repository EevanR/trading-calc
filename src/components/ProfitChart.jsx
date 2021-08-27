import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Line } from 'react-chartjs-2';
import CommissionsChart from "./CommissionsChart";
import DayOfWeekCharts from "./DayOfWeekCharts";
import HourlyChart from "./HourlyChart";
import { getTrades } from "../modules/trades";

const ProfitChart = props => {
  const [profit, setProfit] = useState([])
  const [date, setDate] = useState([])
  const [commissionsTotal, setCommissionsTotal] = useState(0)
  const [barData, setBarData] = useState(null)
  const [timeSegments, setTimeSegments] = useState(null)
  const [grossNet, setGrossNet] = useState("GrossProfit")

  let dailyPreformance = {
    Mon: [0,[]],
    Tue: [0,[]],
    Wed: [0,[]],
    Thu: [0,[]],
    Fri: [0,[]]
  }

  let timeBlocks = {}
  const buildIntervals = () => {
    let num = 0.33333
    for (let i=0; i < 9; i++) {
      timeBlocks[`${Number(num.toFixed(5))}`] = [0, 0]
      num+=0.04167
    }
  }

  const setData = () => {
    buildIntervals()
    let dates = []
    let commissions = 0
    for (let i=0; i<props.savedTrades.data.length; i++) {
      let date = props.savedTrades.data[i]["Date"]
      !dates.includes(date) && dates.push(date)
      
      commissions += (props.savedTrades.data[i]["Commissions"])

      for(let int in timeBlocks){
        ((Number(int) <= props.savedTrades.data[i]["TimeStamp"]) && (props.savedTrades.data[i]["TimeStamp"] < Number(int)+0.04167)) && (timeBlocks[int][0] += props.savedTrades.data[i][grossNet]) && (timeBlocks[int][1]++)
      }
    }
    setCommissionsTotal(commissions)
    
    let dailyProfits = 0
    let cumulativeGains = []
    dates.map(date => {
      let total = 0
      for(let i=0; i<props.savedTrades.data.length; i++) {
        props.savedTrades.data[i]["Date"] === date && (total += props.savedTrades.data[i][grossNet])
      }
      dailyProfits += total
      cumulativeGains.push(dailyProfits)

      let dayOfWeek = new Date(date).toString().slice(0, 3)
      for (let property in dailyPreformance) {
        dayOfWeek === property && dailyPreformance[dayOfWeek][1].push(total) && dailyPreformance[dayOfWeek][0]++
      }
    })
    setDate(dates)
    setProfit(cumulativeGains)
    setBarData(dailyPreformance)
    setTimeSegments(timeBlocks) 
  }
  
  const lineData = {
    labels: date,
    datasets: [
      {
        label: 'PnL Curve',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointRadius: 4,
        data: profit
      }
    ]
  };

  const lineOptions = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "white",
        fontSize: 16
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

  useEffect(() => {
    const indexExcels = async () => {
      let response = await getTrades()
      if (response.status === 200) {
        props.setSavedTrades(response.data[0])
      }
    }
    // indexExcels()
  }, [])

  useEffect(() => {
    if (props.savedTrades !== null) {
      setData()
    }
  }, [props.savedTrades, grossNet])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h2>Profit Chart</h2>
      <h3><a onClick={() => setGrossNet("GrossProfit")}>Gross</a> || <a onClick={() => setGrossNet("NetProfit")}>Net</a></h3>
      <h4>Cumulative {grossNet} PnL Growth</h4>
      <div className="line-chart">
        <Line 
          data = {lineData}
          options = {lineOptions}
          height={600}
        />
      </div>
      <CommissionsChart commissions={commissionsTotal} netProfit={profit} grossNet={grossNet}/>
      <DayOfWeekCharts barData={barData} />
      <HourlyChart times={timeSegments} grossNet={grossNet}/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    savedTrades: state.savedTrades,
    message: state.message,
    userAttrs: state.userAttrs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSavedTrades: data => {
      dispatch({ type: "SET_SAVEDTRADES", payload: data });
    },
    setMessage: string => {
      dispatch({ type: "SET_MESSAGE", payload: string });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitChart)