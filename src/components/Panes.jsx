import React, { useEffect } from "react";
import Pannel from './Pannel'
import ProfitChart from "./ProfitChart"
import GapStats from "./GapStats"
import Setups from "./Setups"
import Excel from "./Excel";
import PayWall from "./PayWall";
import { Tab } from 'semantic-ui-react'
import Twitter from "./Twitter";
import Calculator from "./Calculator";
import { showUser } from "../modules/auth";
import { connect } from "react-redux";
import { getSetups } from "../modules/setup";
import Trades from "./Trades";

const Panes = props => {

  const panes = [
    {
      menuItem: 'Overview', render: () => (
        <Tab.Pane>
          <>
            <ProfitChart />
            {/* <Twitter/> */}
          </>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Calculator', render: () => (
        <Tab.Pane>
          <>
            <Calculator />
          </>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Strategies', render: () => (
        <Tab.Pane>
          <>
            <Setups />
          </>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Historic Gap Stats', render: () => (
        <Tab.Pane>
          <>
            <GapStats />
          </>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'My Traded Stocks', render: () => (
        <Tab.Pane>
          <>
            <Trades/>
          </>
        </Tab.Pane>
      )
    }
  ]

  useEffect(() => {
    if ( props.userAttrs === null ) {
      let user = JSON.parse(sessionStorage.getItem('user'))

      const checkUserStatus = async (user_id) => {
        let response = await showUser(user_id)
        if (response.status === 200) {
          props.setUser(response.data)
        } else {
          console.log("No user logged into server")
        }
      }
      checkUserStatus(user.id)
    }

    const loadSetups = async () => {
      let response = await getSetups()
      if (response !== undefined && response.status === 200) {
        props.setStrategies(response.data)
      } 
    }
    loadSetups()
  }, [])

  return (
    <>
      <PayWall />
      <Pannel/>
      <div className="panes dashboard bg-dark">
        <div className="split">
          <div className="logo">
            <a href="/"><img src="/TradeLogs.png"  alt="TradeLogs Logo"/></a>
          </div>
          <div>
            <Excel/>
          </div>
        </div>
        <Tab panes={panes} />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    userAttrs: state.userAttrs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => {
      dispatch({ type: "SET_USER", payload: data });
    },
    setStrategies: array => {
      dispatch({ type: "SET_STRATEGIES", payload: array });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Panes);