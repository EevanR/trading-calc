import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Line, Bar } from 'react-chartjs-2';
import CommissionsChart from "./CommissionsChart";
import DayOfWeekCharts from "./DayOfWeekCharts";
import HourlyChart from "./HourlyChart";
import WinCurve from "./WinCurve";
import ProfitLoss from "./ProfitLoss";
import { getTrades } from "../modules/trades";

const ProfitChart = props => {
  const [profit, setProfit] = useState([])
  const [date, setDate] = useState([])
  const [commissionsTotal, setCommissionsTotal] = useState(0)
  const [barData, setBarData] = useState(null)
  const [timeSegments, setTimeSegments] = useState(null)
  const [grossNet, setGrossNet] = useState("GrossProfit")
  const [winPercentages, setWinPercentages] = useState([])
  const [profitLoss, setProfitLoss] = useState([])
  const [profitChart, setProfitChart] = useState("line")

  let dailyPreformance = {
    Mon: [0,[]],
    Tue: [0,[]],
    Wed: [0,[]],
    Thu: [0,[]],
    Fri: [0,[]]
  }

  let timeBlocks = {}
  const buildIntervals = () => {
    let num = 0.33333
    for (let i=0; i < 9; i++) {
      timeBlocks[`${Number(num.toFixed(5))}`] = [0, 0, 0, 0]
      num+=0.04167
    }
  }

  let dates = []
  let commissions = 0
  const buildDateArray = () => {
    for (let i=0; i<props.savedTrades.data.length; i++) {
      let date = props.savedTrades.data[i]["Date"]
      !dates.includes(date) && dates.push(date)
      commissions += (props.savedTrades.data[i]["Commissions"])
    }
    setCommissionsTotal(commissions)
  }

  const setData = () => {
    buildIntervals()
    buildDateArray()
    
    let stats = {
      wins: 0,
      loss: 0,
      gains: 0,
      negGains: 0
    }
    
    let dailyProfits = 0
    let cumulativeGains = []
    let winData = []
    let profitData = []
    dates.map(date => {
      let total = 0
      for(let i=0; i<props.savedTrades.data.length; i++) {
        switch (true) {
          case props.savedTrades.data[i]["Date"] === date && props.savedTrades.data[i][grossNet] > 0:
            stats['gains']+=props.savedTrades.data[i][grossNet]
            stats['wins']++

            for(let int in timeBlocks) {
              ((Number(int) <= props.savedTrades.data[i]["TimeStamp"]) && (props.savedTrades.data[i]["TimeStamp"] < Number(int)+0.04167)) && (timeBlocks[int][0] += props.savedTrades.data[i][grossNet]) && (timeBlocks[int][1]++)
            }
            total += props.savedTrades.data[i][grossNet]
            break;
          case props.savedTrades.data[i]["Date"] === date && props.savedTrades.data[i][grossNet] <= 0:
            stats['negGains']+=props.savedTrades.data[i][grossNet]
            stats['loss']++

            for(let int in timeBlocks) {
              ((Number(int) <= props.savedTrades.data[i]["TimeStamp"]) && (props.savedTrades.data[i]["TimeStamp"] < Number(int)+0.04167)) && (timeBlocks[int][2] += props.savedTrades.data[i][grossNet]) && (timeBlocks[int][3]++)
            }
            total += props.savedTrades.data[i][grossNet]
            break;
        }
      }
      profitData.push(((stats['gains']/stats['wins'])/((stats['negGains']/stats['loss'])*-1)).toFixed(2))
      winData.push(((stats['wins']/(stats['loss']+stats['wins']))*100).toFixed(2))
      dailyProfits += total
      cumulativeGains.push(dailyProfits.toFixed(2))

      let dayOfWeek = new Date(date).toString().slice(0, 3)
      for (let property in dailyPreformance) {
        dayOfWeek === property && dailyPreformance[dayOfWeek][1].push(total) && dailyPreformance[dayOfWeek][0]++
      }
    })
    props.setStats(stats)
    setWinPercentages(winData)
    setProfitLoss(profitData)
    setDate(dates)
    setProfit(cumulativeGains)
    setBarData(dailyPreformance)
    setTimeSegments(timeBlocks) 
  }
  
  const lineData = {
    labels: date,
    datasets: [
      {
        label: 'Profit Curve',
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
        fontColor: "darkgrey",
        fontSize: 16      
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: "darkgrey",
          fontSize: 12
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

  useEffect(() => {
    const indexExcels = async () => {
      let response = await getTrades()
      if (response.data !== null) {
        props.setSavedTrades(response.data.excels[0])
      }
    }
    indexExcels()

    if (sessionStorage.getItem('user') !== null && props.userAttrs === null) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      props.setUser(user)
    }
  }, [])

  useEffect(() => {
    if (props.savedTrades !== null) {
      setData()
    }
  }, [props.savedTrades, grossNet])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <section className="bg-verydark tab" id="graphs">
        <div className="container-wide">
          <div className="summary-box">
            {props.userAttrs !== null && <h1>Welcome, {props.userAttrs.nickname}</h1>}
            <div className="four-column-grid">
              <div>
                <h3>Trade Count</h3> 
                {props.savedTrades !== null && props.stats !== null ?
                  <h3>{props.savedTrades.data.length}</h3> : <h3>No Data</h3>
                }
              </div>
              <div>
                <h3>Win %</h3>
                {props.savedTrades !== null && props.stats !== null ?
                  <h3>{((props.stats['wins']/(props.stats['wins']+props.stats['loss']))*100).toFixed(2)}%</h3> : <h3>No Data</h3>
                }
              </div>
              <div>
                <h3>{grossNet.substring(0, grossNet.indexOf("P"))} Profits</h3>
                {props.savedTrades !== null && props.stats !== null ?
                  <h3>${((props.stats['gains'])+(props.stats['negGains'])).toFixed(2)}</h3> : <h3>No Data</h3>
                }
              </div>
              <div>
                <h3>Avg Win : Avg Loss</h3>
                {props.savedTrades !== null && props.stats !== null ?
                  <h3>{((props.stats['gains']/props.stats['wins'])/((props.stats['negGains']/props.stats['loss'])*-1)).toFixed(2)} : 1</h3> : <h3>No Data</h3>
                }
              </div>
            </div>
          </div>
          <div className="foreground bg-dark">
            <h2>Profit Chart & Fees</h2>
            <h3><a onClick={() => setGrossNet("GrossProfit")}>Gross</a> || <a onClick={() => setGrossNet("NetProfit")}>Net</a></h3>
            <h4>Cumulative {grossNet.substring(0, grossNet.indexOf("P"))} PnL Growth</h4>
            <h4 onClick={() => setProfitChart("line")}>Line</h4>
            <h4 onClick={() => setProfitChart("bar")}> Bar</h4>
            <div>
              {profitChart === "line" ? (
                <Line 
                  data = {lineData}
                  options = {lineOptions}
                  height={500}
                />
              ) : (
                <Bar 
                  data = {lineData}
                  options = {lineOptions}
                  height={500}
                />
              )}
            </div>
          </div>
          <div className="split">
            <div className="foreground bg-dark">
              <WinCurve date={date} winPercentages={winPercentages}/>
            </div>
            <div className="foreground bg-dark">
              <ProfitLoss date={date} profitLoss={profitLoss}/>
            </div>
          </div>
          <div className="foreground bg-dark">
            <CommissionsChart commissions={commissionsTotal} netProfit={profit} grossNet={grossNet.substring(0, grossNet.indexOf("P"))} />
          </div>
          <div className="foreground bg-dark">
            <DayOfWeekCharts barData={barData} />
            <HourlyChart times={timeSegments} grossNet={grossNet.substring(0, grossNet.indexOf("P"))}/>
          </div>
        </div>
      </section>
      <section className="footer bg-dark">
        <p >Copyright © TradeLogs 2022. All rights reserved.</p>
      </section>
    </>
  )
}

const mapStateToProps = state => {
  return {
    savedTrades: state.savedTrades,
    message: state.message,
    userAttrs: state.userAttrs,
    stats: state.stats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSavedTrades: data => {
      dispatch({ type: "SET_SAVEDTRADES", payload: data });
    },
    setMessage: string => {
      dispatch({ type: "SET_MESSAGE", payload: string });
    },
    setStats: string => {
      dispatch({ type: "SET_STATS", payload: string });
    },
    setUser: data => {
      dispatch({ type: "SET_USER", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitChart)