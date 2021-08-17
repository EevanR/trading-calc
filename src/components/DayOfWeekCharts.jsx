import React from 'react';
import { Bar } from 'react-chartjs-2';

const DayOfWeekCharts = props => {

  let dayGain = []
  let pLAverage = []
  if (props.barData !== null) {
    let posDays = []
    let negDays = []
    for (let day in props.barData) {
      let avg = props.barData[day][1].reduce((a, b) => a + b, 0)
      avg = avg/props.barData[day][0]
      pLAverage.push(avg)
      
      let greenDay = 0
      let redDay = 0
      let redCount = 0
      let greenCount = 0
      props.barData[day][1].forEach(index => {
        index < 0 ? (redDay += index) && redCount++ : (greenDay += index) && greenCount++
      })
      posDays.push(greenDay/greenCount)
      negDays.push((redDay/redCount)*-1)
    }
    dayGain = [posDays, negDays]
  }

  const colours = pLAverage.map((value) => value < 0 ? 'rgba(233, 133, 93, 0.719)' : 'rgba(75,192,192,0.4)');

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
        label: 'Combined Daily Avg',
        fill: true,
        backgroundColor: colours,
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: pLAverage
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
          fontColor: "white",
          beginAtZero: true
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
        label: 'Average Winning Day',
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: dayGain[0]
      },
      {
        label: 'Average Losing Day',
        fill: false,
        backgroundColor: 'rgba(233, 133, 93, 0.719)',
        borderColor: '#71B37C',
        hoverBackgroundColor: 'rgba(233, 133, 93)',
        data: dayGain[1]
      }
    ]
  };

  return (
    <>
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
          <h4>Profit vs Loss: Day of the Week</h4>
          <div> 
            <Bar
              data = {barTwoData}
              options = {barOptions}
              height={500}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default DayOfWeekCharts