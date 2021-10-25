import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { connect } from "react-redux";

const HourlyChart = props => {

  let totals = []
  let frequency = []
  if (props.times !== null) {
    for(let int in props.times) {
      totals.push(props.times[int][0])
      frequency.push(props.times[int][1])
    }
  }

  const timeIntervals = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00"
  ]

  const colours = totals.map((value) => value < 0 ? 'rgba(233, 133, 93, 0.719)' : 'rgba(75,192,192,0.4)');

  const hourlyTotals = {
    labels: timeIntervals,
    datasets: [
      {
        label: `${props.grossNet} Profit per Interval`,
        fill: true,
        backgroundColor: colours,
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: totals
      }
    ]
  };

  const hourlyFrequency = {
    labels: timeIntervals,
    datasets: [
      {
        label: 'Number of Trades',
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: frequency
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

  return (
    <>
      <div className="split">
        <div>
          <h4>Trade distribution: Hourly</h4>
          <div> 
            <HorizontalBar
              data = {hourlyTotals}
              options = {barOptions}
              height={500}
            />
          </div>
        </div>
        <div>
          <h4>Trade distribution: Frequency</h4>
          <div> 
            <HorizontalBar
              data = {hourlyFrequency}
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
    savedTrades: state.savedTrades
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSavedTrades: data => {
      dispatch({ type: "SET_SAVEDTRADES", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HourlyChart)