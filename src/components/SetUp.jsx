import React, { useState, useEffect } from "react";
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";

const SetUp = props => {
  const [chooseSetUp, setChooseSetUp] = useState([])

  const setups = [
    { key: 1, value: 1, text: "Line Bounce"},
    { key: 2, value: 2, text: "Red Green Dip"},
    { key: 3, value: 3, text: "Pinbar"},
    { key: 4, value: 4, text: "High Point Squeeze"},
    { key: 5, value: 5, text: "1min Flag"},
    { key: 6, value: 6, text: "1min Line Bounce AM"}
  ]
  
  let lineBounce = [
    {id: 1, label: "Inside candle", checked: false},
    {id: 2, label: "VWAP reject", checked: false},
    {id: 3, label: "Within 0.02c offset", checked: false},
    {id: 4, label: "First time bounce", checked: false},
    {id: 5, label: "Above 1min200EMA Line Chart", checked: false}
  ]

  let redGreenDip = [
    {id: 1, label: "Off line", checked: false},
    {id: 2, label: "No prior VWAP reject", checked: false},
    {id: 3, label: "Within 0.02c offset", checked: false},
    {id: 4, label: "Green inside candle", checked: false}
  ]

  let pinbar = [
    {id: 1, label: "Wick down through", checked: false},
    {id: 2, label: "Wick lowest point of swing low", checked: false},
    {id: 3, label: "VWAP reject prior", checked: false},
    {id: 4, label: "First time bounce", checked: false},
    {id: 5, label: "Above 1min200EMA Line Chart", checked: false}
  ]

  let highPoint = [
    {id: 1, label: "Vol at trigger", checked: false},
    {id: 2, label: "VWAP reject prior", checked: false},
    {id: 3, label: "Within 0.02c offset", checked: false},
    {id: 4, label: "Stop low of breakout candle", checked: false}
  ]

  let flag = [
    {id: 1, label: "1min chart", checked: false},
    {id: 2, label: "Above 1min200EMA", checked: false},
    {id: 3, label: "Front Side", checked: false},
    {id: 4, label: "Connect line chart highs that are real candle highs", checked: false},
    {id: 5, label: "Stop b/e after new high", checked: false},
    {id: 6, label: "Above 1min24EMA", checked: false}
  ]

  let oneMinLineBounce = [
    {id: 1, label: "1min chart", checked: false},
    {id: 2, label: "Before 11 am", checked: false},
    {id: 3, label: "Front Side", checked: false},
    {id: 4, label: "3rd bounce no trade", checked: false},
    {id: 5, label: "Stub Wick, no Pinbar", checked: false},
    {id: 6, label: "Not at VWAP, or just under", checked: false},
    {id: 7, label: "3rd candle must run", checked: false},
    {id: 8, label: "Stop 0.02 under entry price", checked: false},
    {id: 9, label: "Stop b/e after new high", checked: false}
  ]

  const onChangeHandler = (event) => {
    if (event.length < 70) {
      props.setSetUp(event)
    } else {
      setChooseSetUp([])
    }
    props.setCheckList([])
    if (event === "Line Bounce") {
      props.setPrereq(lineBounce.length)
      setChooseSetUp(lineBounce)
    } else if (event === "Red Green Dip") {
      props.setPrereq(redGreenDip.length)
      setChooseSetUp(redGreenDip) 
    } else if (event === "Pinbar") {
      props.setPrereq(pinbar.length)
      setChooseSetUp(pinbar) 
    } else if (event === "High Point Squeeze") {
      props.setPrereq(highPoint.length)
      setChooseSetUp(highPoint)
    } else if (event === "1min Flag") {
      props.setPrereq(flag.length)
      setChooseSetUp(flag)
    }  else if (event === "1min Line Bounce AM") {
      props.setPrereq(oneMinLineBounce.length)
      setChooseSetUp(oneMinLineBounce)
    } else {
      return null
    }
  }

  const onClickHandler = (id, label, checked) => {
    chooseSetUp[id-1].checked === false ? chooseSetUp[id-1].checked = true : chooseSetUp[id-1].checked = false
    if (props.checkList.includes(label)) {
      let newArray = []
      props.checkList.forEach(item => {
        if (item !== label) {
          newArray.push(item)
        }
      })
      props.setCheckList(newArray)
    } else {
      props.setCheckList([...props.checkList, label])
    }
  }

  useEffect(() => {
    
  }, [props.setUp]);

  let setUp;
  if (chooseSetUp !== []) {
    setUp = (
      <>
        <h2>{props.setUp} <span id="italic"> Pre-reqs</span></h2>
        {chooseSetUp.map(checkbox => {
          return (
            <Checkbox key={checkbox.id}
              onClick={() => onClickHandler(checkbox.id, checkbox.label, checkbox.checked)}
              id={checkbox.id} 
              label={checkbox.label} 
              checked={checkbox.checked} 
            />
          )
        })}
      </>
    )
  } else {
    setUp = (<div></div>)
  }

  return (
    <div className="setups">
      <div className="setups-inner">
        <div>
          <Dropdown
            placeholder="Set Up"
            clearable
            fluid
            options={setups}
            onChange={event => {
              onChangeHandler(event.target.innerText);
            }}
          />
        </div>
        <div>
          {setUp}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    preReq: state.preReq,
    checkList: state.checkList,
    setUp: state.setUp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPrereq: data => {
      dispatch({ type: "SET_PREREQ", payload: data });
    },
    setCheckList: array => {
      dispatch({ type: "SET_CHECKLIST", payload: array });
    },
    setSetUp: string => {
      dispatch({ type: "SET_SETUP", payload: string });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetUp);