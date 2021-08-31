import React from 'react';
import { Pie } from 'react-chartjs-2';

const CommissionsChart = props => {
  debugger
  let grossProfit;
  if (props.savedTrades !== null) {
    grossProfit = props.netProfit[props.netProfit.length - 1]
  }

  const pieData = {
    labels: [`${props.grossNet} PnL`, "Commissions"],
    datasets: [
      {
        label: 'Successes',
        fill: true,
        backgroundColor: [
          'rgba(75,192,192,0.4)',
          'rgba(233, 133, 93, 0.719)'
        ],
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: [grossProfit, (props.commissions*-1)]
      }
    ]
  };
  
  const pieOptions = {
    maintainAspectRatio: false,
    legend: {
      position: 'left',
      labels: {
        fontColor: "white",
        fontSize: 16
      }
    }
  }


  return (
    <>
      <h4>PnL vs Commissions: Equity Curve</h4>
      <div className="chartSmall"> 
        <Pie
          data = {pieData}
          options = {pieOptions}
        />
      </div>
    </>
  )
}

export default CommissionsChart