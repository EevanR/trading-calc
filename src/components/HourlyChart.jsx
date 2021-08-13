import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { connect } from "react-redux";

const HourlyChart = props => {

  let timeAxis = []
  if (props.barData !== null) {
    debugger
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
        // data: dayGain[0]
      },
      {
        label: 'Daily Avg -',
        // data: dayGain[1],
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

  return (
    <>
      <div className="setup-graphs">
        <div>
          <h4>Trade distribution: Hourly</h4>
          <div> 
            <HorizontalBar
              data = {barData}
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