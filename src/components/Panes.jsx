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
    }
  ]

  useEffect(() => {
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
  }, [])

  return (
    <>
      <PayWall />
      <Pannel/>
      <div className="panes bg-dark">
        <div className="two-column-grid">
          <div>
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

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => {
      dispatch({ type: "SET_USER", payload: data });
    }
  }
};

export default connect(null, mapDispatchToProps)(Panes);