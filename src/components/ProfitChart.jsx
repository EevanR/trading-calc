import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Line } from 'react-chartjs-2';
import CommissionsChart from "./CommissionsChart";
import DayOfWeekCharts from "./DayOfWeekCharts";
import HourlyChart from "./HourlyChart";

const ProfitChart = props => {
  const [profit, setProfit] = useState([])
  const [date, setDate] = useState([])
  const [commissionsTotal, setCommissionsTotal] = useState(0)
  const [barData, setBarData] = useState(null)
  const [timeSegments, setTimeSegments] = useState(null)

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
    let groups = {}
    let commissions = 0
    let groupedTrades = []
    for (let i=0; i<props.savedTrades.length; i++) {
      let date = props.savedTrades[i]["T/D"]
      let ticker = props.savedTrades[i]["Symbol"]
      !dates.includes(date) && dates.push(date)
      
      commissions += (props.savedTrades[i]["Comm"] + props.savedTrades[i]["NSCC"])
      groups[ticker] === undefined && (groups[ticker] = [0, 0, 0, ""]) //[Profit, share count, timestamp, date]
      groups[ticker][0] += props.savedTrades[i]["Gross Proceeds"]
      groups[ticker][1] === 0 && (groups[ticker][2] = props.savedTrades[i]["Exec Time"]) && (groups[ticker][3] = props.savedTrades[i]["T/D"])
      props.savedTrades[i]["Side"] === "B" || props.savedTrades[i]["Side"] === "BC" ? groups[ticker][1] += props.savedTrades[i]["Qty"] : groups[ticker][1] -= props.savedTrades[i]["Qty"]

      if (groups[ticker][1] === 0) {
        groupedTrades.push(groups[ticker])
        for(let int in timeBlocks){
          ((Number(int) <= groups[ticker][2]) && (groups[ticker][2] < Number(int)+0.04167)) && (timeBlocks[int][0] += groups[ticker][0]) && (timeBlocks[int][1]++)
        }
        delete groups[ticker]
      }
    }
    setCommissionsTotal(commissions)
    
    let dailyProfits = 0
    let cumulativeGains = []
    dates.map(date => {
      let total = 0
      for(let i=0; i<groupedTrades.length; i++) {
        groupedTrades[i][3] === date && (total += groupedTrades[i][0])
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
    if (props.savedTrades !== null) {
      setData()
    }
  }, [props.savedTrades])

  return (
    <>
      <h2>Profit Chart</h2>
      <h4>Cumulative Gross Equity Growth</h4>
      <div className="line-chart">
        <Line 
          data = {lineData}
          options = {lineOptions}
          height={500}
        />
      </div>
      <CommissionsChart commissions={commissionsTotal} netProfit={profit}/>
      <DayOfWeekCharts barData={barData} />
      <HourlyChart times={timeSegments}/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    savedTrades: state.savedTrades,
    message: state.message
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