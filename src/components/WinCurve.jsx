import React from 'react';
import { Line } from 'react-chartjs-2';

const WinCurve = props => {
  const lineData = {
    labels: props.date,
    datasets: [
      {
        label: 'Cumulative Win %',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointRadius: 4,
        data: props.winPercentages
      }
    ]
  };

  const lineOptions = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "darkgrey",
        fontSize: 14      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 100,
          min:0,
          fontColor: "darkgrey",
          fontSize: 12,
        }
      }],
      xAxes: [{
        ticks: {
            fontColor: "darkgrey",
            fontSize: 12,
        }
      }]
    }
  }

  return (
    <div>
      <Line 
        data = {lineData}
        options = {lineOptions}
        height={450}
      />
    </div>
  )
};

export default WinCurve;