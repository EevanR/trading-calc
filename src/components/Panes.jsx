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
            <PayWall />
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
      debugger
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

if (success && sessionId !== '') {
  // return <SuccessDisplay sessionId={sessionId} />;
} else {
  // return <Message message={message} />;
}

  return (
    <>
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