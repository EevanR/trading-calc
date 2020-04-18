import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTrades } from "../modules/trades"
import { Doughnut, Line, HorizontalBar, Pie } from 'react-chartjs-2';

const ProfitChart = props => {
  const [profit, setProfit] = useState([])
  const [date, setDate] = useState([])
  const [trades, setTrades] = useState([])

  const setDates = () => {
    let dates = []
    props.savedTrades.map(item => {
      let date = item.date.substring(0, item.date.indexOf(","))
        if (!dates.includes(date)) {
          dates.push(date)
        }
    })
    let trades = props.savedTrades.map(item => 
      [item.ticker, item.profit, item.date.substring(0, item.date.indexOf(",")), item.setup]
    )
    setTrades(trades)
    let dailyProfits = []
    dates.map(date => {
      let total = 0
      for(let i=0; i<trades.length; i++) {
        if (trades[i][2] === date) {
          total += trades[i][1]
        }
      }
      dailyProfits.push(total)
    })
    let cumProfits = []
    let totalProfit = 0
    for (let i=0; i<dailyProfits.length; i++) {
      totalProfit += dailyProfits[i]
      cumProfits.push(totalProfit)
    }
    setDate(dates)
    setProfit(cumProfits)
  }

  let setups = []
  let setupGains = []
  let setupLosses = []
  let setupCount = []
  if (trades !== []) {
    for (let i=0; i<trades.length; i++) {
      if (!setups.includes(trades[i][3])) {
        setups.push(trades[i][3])
      }
    }

    let gain = 0
    let losses = 0
    let count = 0
    setups.map(item => {
      for (let i=0; i<trades.length; i++) {
        if (trades[i][3] === item) {
          trades[i][1] > 0 ? gain += 1 : losses += 1
          count += 1
        }
      }
      setupGains.push(gain)
      setupLosses.push(losses)
      setupCount.push(count)
      gain = 0
      losses = 0
      count = 0
    })
  }

  const lineData = {
    labels: date,
    datasets: [
      {
        label: 'PnL CURVE',
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

  const barData = {
    labels: setups,
    datasets: [
      {
        label: 'Successes',
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: setupGains
      },
      {
        label: 'Failures',
        data: setupLosses,
        fill: false,
        backgroundColor: 'rgba(233, 133, 93, 0.719)',
        borderColor: '#71B37C',
        hoverBackgroundColor: 'rgba(233, 133, 93)',
        hoverBorderColor: '#71B37C'
      }
    ]
  };

  const pieData = {
    labels: setups,
    datasets: [
      {
        label: 'Successes',
        fill: true,
        backgroundColor: [
          'rgba(75,192,192,0.4)',
          'rgba(255, 255, 0, 0.8)',
          'rgba(233, 133, 93, 0.719)'
        ],
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: setupCount
      }
    ]
  };

  useEffect(() => {
    const getSavedTrades = async () => {
      let response = await getTrades();
      if (response.status === 200) {
        props.setSavedTrades(response.data)
      } else {
        props.setMessage(response.error)
      }
    }
    getSavedTrades()
  }, [])

  useEffect(() => {
    if (props.savedTrades !== null) {
      setDates()
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
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <h2>Setup Tracking</h2>
      <div className="setup-graphs">
        <div>
          <h4>Win vs Loss / Setup</h4>
          <div> 
            <HorizontalBar
              data = {barData}
              options = {lineOptions}
              height={500}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div>
          <h4>Setup Frequency</h4>
          <div> 
            <Pie
              data = {pieData}
              options = {lineOptions}
              height={400}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    savedTrades: state.savedTrades
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