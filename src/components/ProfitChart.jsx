import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Line, Bar } from 'react-chartjs-2';
import CommissionsChart from "./CommissionsChart";

const ProfitChart = props => {
  const [profit, setProfit] = useState([])
  const [date, setDate] = useState([])
  const [dayGain, setDayGain] = useState([])
  const [commissionsTotal, setCommissionsTotal] = useState(0)

  const setBarData = (data) => {
    let green = []
    let red = []
    let posDays = []
    let negDays = []
    for (let day in data) {
      let avg = data[day][1].reduce((a, b) => a + b, 0)
      avg = avg/data[day][0]
      avg < 0 ? red.push(avg) && green.push(0)  : green.push(avg) && red.push(0)

      let greenDay = 0
      let redDay = 0
      let redCount = 0
      let greenCount = 0
      data[day][1].forEach(index => {
        index < 0 ? (redDay += index) && redCount++ : (greenDay += index) && greenCount++
      })
      posDays.push(greenDay/greenCount)
      negDays.push((redDay/redCount)*-1)
    }
    setDayGain([green, red, posDays, negDays]);
  }

  const setDates = () => {
    let dailyPreformance = {
      Mon: [0,[]],
      Tue: [0,[]],
      Wed: [0,[]],
      Thu: [0,[]],
      Fri: [0,[]]
    }

    let dates = []
    let commissions = 0
    for(let i=0; i<props.savedTrades.length; i++) {
      let date = props.savedTrades[i]["T/D"]
      !dates.includes(date) && dates.push(date)
      
      commissions += (props.savedTrades[i]["Comm"] + props.savedTrades[i]["NSCC"])
    }
    setCommissionsTotal(commissions)

    let dailyProfits = 0
    let cumulativeGains = []
    dates.map(date => {
      let total = 0
      for(let i=0; i<props.savedTrades.length; i++) {
        props.savedTrades[i]["T/D"] === date && (total += props.savedTrades[i]["Net Proceeds"])
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

  const barData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    datasets: [
      {
        label: 'Daily Avg +',
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: dayGain[0]
      },
      {
        label: 'Daily Avg -',
        data: dayGain[1],
        fill: false,
        backgroundColor: 'rgba(233, 133, 93, 0.719)',
        borderColor: '#71B37C',
        hoverBackgroundColor: 'rgba(233, 133, 93)',
        hoverBorderColor: '#71B37C'
      }
    ]
  };

  const barOptions = {
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

  const barTwoData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    datasets: [
      {
        label: 'Average Win',
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: dayGain[2]
      },
      {
        label: 'Average Loss',
        fill: false,
        backgroundColor: 'rgba(233, 133, 93, 0.719)',
        borderColor: '#71B37C',
        hoverBackgroundColor: 'rgba(233, 133, 93)',
        data: dayGain[3]
      }
    ]
  };

  const barThreedata = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    datasets: [
      {
        label: 'Average Win',
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: dayGain[2]
      },
      {
        label: 'Average Loss',
        fill: false,
        backgroundColor: 'rgba(233, 133, 93, 0.719)',
        borderColor: '#71B37C',
        hoverBackgroundColor: 'rgba(233, 133, 93)',
        data: dayGain[3]
      }
    ]
  };

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
        />
      </div>
      <CommissionsChart commissions={commissionsTotal} netProfit={profit}/>
      <h2>Breakdown</h2>
      <div className="setup-graphs">
        <div>
          <h4>PnL Average: Day of the Week</h4>
          <div> 
            <Bar
              data = {barData}
              options = {barOptions}
              height={500}
            />
          </div>
        </div>
        <div>
          <h4>Wins vs Loss: Day of the Week</h4>
          <div> 
            <Bar
              data = {barTwoData}
              options = {barOptions}
              height={500}
            />
          </div>
        </div>
        <div>
          <h4>Trade distribution: Day of Week</h4>
          <div> 
            <Bar
              // data = {barTwoData}
              options = {barOptions}
              height={500}
            />
          </div>
        </div>
      </div>
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