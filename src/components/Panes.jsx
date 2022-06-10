import React, { useState, useEffect } from "react";
import Pannel from './Pannel'
import ProfitChart from "./ProfitChart"
import GapStats from "./GapStats"
import Setups from "./Setups"
import Excel from "./Excel";
import PayWall from "./PayWall";
import { Tab } from 'semantic-ui-react'
import Twitter from "./Twitter";
import Calculator from "./Calculator";

const Panes = () => {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

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
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
      setMessage(
        "Subscribed!"
      );
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled"
      );
    }
  }, []);

  if (!success && message === '') {
    
  } else if (success && sessionId !== '') {
    alert(message)
  } else {
    alert(message)
  }

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

export default Panes;