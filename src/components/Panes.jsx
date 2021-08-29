import React from "react";
import Pannel from './Pannel'
import ProfitChart from "./ProfitChart"
import GapStats from "./GapStats"
import Setups from "./Setups"
import Excel from "./Excel";
import { Tab } from 'semantic-ui-react'
import Twitter from "./Twitter";
import Calculator from "./Calculator";

const Panes = () => {

  const panes = [
    {
      menuItem: 'Review', render: () => (
        <Tab.Pane>
          <>
            <Excel />
            <ProfitChart />
            <Twitter/>
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

  return (
    <>
      <Pannel />
      <div>
        <img className="sign-up-img" src="/favicon.png" alt=""/>
        <h1>
          TradeLogs 
        </h1>
      </div>
      <div>
        <Tab panes={panes} />
      </div>
    </>
  );
};

export default Panes;