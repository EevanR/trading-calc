import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTrades } from "../modules/trades"
import { Line, HorizontalBar, Pie } from 'react-chartjs-2';

const ProfitChart = props => {
  const [profit, setProfit] = useState([])
  const [date, setDate] = useState([])
  const [trades, setTrades] = useState([])

  const setDates = () => {
    let dates = []
    for(let i=0; i<props.savedTrades.length; i++) {
      let date = props.savedTrades[i]["T/D"]
      if (!dates.includes(date)) {
        dates.push(date)
      }
    }
    let dailyProfits = 0
    let cumulativeGains = []
    dates.map(date => {
      let total = 0
      for(let i=0; i<props.savedTrades.length; i++) {
        if (props.savedTrades[i]["T/D"] === date) {
          total += props.savedTrades[i]["Net Proceeds"]
        }
      }
      dailyProfits += total
      cumulativeGains.push(dailyProfits)
    })
    setDate(dates)
    setProfit(cumulativeGains)
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

  // const barData = {
  //   labels: setups,
  //   datasets: [
  //     {
  //       label: 'Successes',
  //       fill: true,
  //       backgroundColor: 'rgba(75,192,192,0.4)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       hoverBackgroundColor: 'rgba(75,192,192)',
  //       data: setupGains
  //     },
  //     {
  //       label: 'Failures',
  //       data: setupLosses,
  //       fill: false,
  //       backgroundColor: 'rgba(233, 133, 93, 0.719)',
  //       borderColor: '#71B37C',
  //       hoverBackgroundColor: 'rgba(233, 133, 93)',
  //       hoverBorderColor: '#71B37C'
  //     }
  //   ]
  // };

  // const pieData = {
  //   labels: setups,
  //   datasets: [
  //     {
  //       label: 'Successes',
  //       fill: true,
  //       backgroundColor: [
  //         'rgba(75,192,192,0.4)',
  //         'rgba(255, 015, 0, 0.8)',
  //         'rgba(233, 133, 93, 0.719)',
  //         'rgba(100, 133, 93, 0.719)',
  //         'rgba(150, 133, 143, 0.7)',
  //         'rgba(170, 133, 53, 0.9)',
  //         'rgba(210, 133, 93, 0.6)',
  //         'rgba(310, 373, 193, 0.6)'
  //       ],
  //       borderColor: 'rgba(75,192,192,1)',
  //       hoverBackgroundColor: 'rgba(75,192,192)',
  //       data: setupCount
  //     }
  //   ]
  // };

  const pieOptions = {
    maintainAspectRatio: false,
    legend: {
      position: 'top',
      labels: {
        fontColor: "white"
      }
    }
  }

  useEffect(() => {
    const getSavedTrades = async () => {
      let response = await getTrades();
      if (response !== undefined && response.status === 200) {
        props.setSavedTrades(response.data)
      } else {
        response === undefined ? props.setMessage("Saved Trades Unavailable") : props.setMessage(response.error)
      }
    }
    getSavedTrades()
    
    if (props.message !== "") {
      getSavedTrades()
    }
  }, [props.message])

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
      <h2>Setup Tracking</h2>
      <div className="setup-graphs">
        <div>
          <h4>Win vs Loss / Setup</h4>
          {/* <div> 
            <HorizontalBar
              data = {barData}
              options = {lineOptions}
              height={500}
            />
          </div> */}
        </div>
        <div>
          <h4>Setup Frequency</h4>
          <div style={{marginTop: '50px'}}> 
            {/* <Pie
              data = {pieData}
              options = {pieOptions}
              height={400}
            /> */}
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