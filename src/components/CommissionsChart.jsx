import React from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from "react-redux";

const CommissionsChart = props => {
  let grossProfitFees = [0, 0]
  if (props.savedTrades !== null) {
    grossProfitFees[0] = props.netProfit[props.netProfit.length - 1]
    grossProfitFees[1] = props.savedTrades['fees']
  }
  
  const pieData = {
    labels: [`${props.grossNet} PnL`, "Commissions", "Locate Fees"],
    datasets: [
      {
        label: 'Successes',
        fill: true,
        backgroundColor: [
          'rgba(75,192,192,0.4)',
          'rgba(233, 133, 93, 0.719)',
          'rgba(33, 133, 93, 0.719)'
        ],
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: [grossProfitFees[0], (props.commissions*-1), grossProfitFees[1]]
      }
    ]
  };

  const pieData2 = {
    labels: [`${props.grossNet} PnL`, "Total Fees"],
    datasets: [
      {
        label: 'Successes',
        fill: true,
        backgroundColor: [
          'rgba(75,192,192,0.4)',
          'rgba(233, 133, 93, 0.719)',
        ],
        borderColor: 'rgba(75,192,192,1)',
        hoverBackgroundColor: 'rgba(75,192,192)',
        data: [grossProfitFees[0], ((props.commissions*-1) + grossProfitFees[1])]
      }
    ]
  };
  
  const pieOptions = {
    maintainAspectRatio: false,
    legend: {
      position: 'top',
      labels: {
        fontColor: "white",
        fontSize: 16
      }
    }
  }


  return (
    <>
      <h4>PnL vs Commissions: Equity Curve</h4>
      <div className="setup-graphs">
        <div className="chartSmall"> 
          <Pie
            data = {pieData}
            options = {pieOptions}
          />
        </div>
        <div className="chartSmall"> 
          <Pie
            data = {pieData2}
            options = {pieOptions}
          />
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

export default connect(mapStateToProps)(CommissionsChart)