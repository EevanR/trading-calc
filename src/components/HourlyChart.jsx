import React from 'react';
import { HorizontalBar, Bar } from 'react-chartjs-2';
import { connect } from "react-redux";

const HourlyChart = props => {

  let totals = []
  let frequency = []
  let hourlyAvg = []
  let winAvg = []
  let lossAvg = []
  let accuracy = []
  if (props.times !== null) {
    for(let int in props.times) {
      totals.push((props.times[int][0]+props.times[int][2]).toFixed(2))
      frequency.push(props.times[int][1]+props.times[int][3])
      hourlyAvg.push(((props.times[int][0]+props.times[int][2])/(props.times[int][1]+props.times[int][3])).toFixed(2))
      winAvg.push((props.times[int][0]/props.times[int][1]).toFixed(2))
      lossAvg.push(((props.times[int][2]/props.times[int][3])*-1).toFixed(2))
      accuracy.push(((props.times[int][1]/(props.times[int][1]+props.times[int][3]))*100).toFixed(2))
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

  const hourlyAverage = {
    labels: timeIntervals,
    datasets: [
      {
        label: 'Interval Trade Average',
        backgroundColor: colours,
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: hourlyAvg
      }
    ]
  };

  const winLossAverage = {
    labels: timeIntervals,
    datasets: [
      {
        label: 'Average Winner',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: winAvg
      },
      {
        label: 'Average Loser',
        backgroundColor: 'rgba(233, 133, 93, 0.719)',
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: lossAvg
      }
    ]
  };

  const hourlyAccuracy = {
    labels: timeIntervals,
    datasets: [
      {
        label: 'Win Accuracy %',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: accuracy
      }
    ]
  };

  const barOptions = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "darkgrey",
        fontSize: 14
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: "darkgrey",
          fontSize: 12,
        }
      }],
      xAxes: [{
        ticks: {
            fontColor: "darkgrey",
            fontSize: 12
        }
      }]
    }
  }

  return (
    <section className="breakdown">
      <div className="split">
        <div>
          <h4>Profit distribution: Hourly</h4>
          <div> 
            <HorizontalBar
              data = {hourlyTotals}
              options = {barOptions}
              height={450}
            />
          </div>
        </div>
        <div>
          <h4>Trade distribution: Frequency</h4>
          <div> 
            <HorizontalBar
              data = {hourlyFrequency}
              options = {barOptions}
              height={450}
            />
          </div>
        </div>
      </div>
      <div className="split">
        <div>
          <h4>Average: Hourly</h4>
          <div> 
            <HorizontalBar
              data = {hourlyAverage}
              options = {barOptions}
              height={450}
            />
          </div>
        </div>
        <div>
          <h4>Avg Winner & Avg Loser: Hourly</h4>
          <div> 
            <HorizontalBar
              data = {winLossAverage}
              options = {barOptions}
              height={450}
            />
          </div>
        </div>
      </div>
      <div className='split'>
        <div>
          <h4>Accuracy: Hourly</h4>
          <div> 
            <Bar
              data = {hourlyAccuracy}
              options = {barOptions}
              height={450}
            />
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </section>
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