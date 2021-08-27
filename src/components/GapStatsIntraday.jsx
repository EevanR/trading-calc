import React from 'react';

const GapStatsIntraday = props => {

  let grossProfit;
  if (props.savedTrades !== null) {
    grossProfit = props.netProfit[props.netProfit.length - 1]
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