import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTrades } from "../modules/trades"
import { Doughnut, Line } from 'react-chartjs-2';

const ProfitChart = props => {
  const [profit, setProfit] = useState([])
  const [date, setDate] = useState([])

  const setDates = () => {
    let dates = []
    props.savedTrades.map(item => {
      let date = item.date.substring(0, item.date.indexOf(","))
        if (!dates.includes(date)) {
          dates.push(date)
        }
    })
    
    let trades = props.savedTrades.map(item => 
      [item.ticker, item.profit, item.date.substring(0, item.date.indexOf(","))]
    )

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

  useEffect(() => {
    const getSavedTrades = async () => {
      let response = await getTrades();
      debugger
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
      {props.savedTrades !== null && (
      <h4>Cumulative Gross Equity Growth</h4>
      )}
      <div className="line-chart">
        <Line 
          data = {lineData}
          options = {lineOptions}
        />
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