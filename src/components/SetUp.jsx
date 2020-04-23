import React, { useState, useEffect } from "react";
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";

const SetUp = props => {
  const [chooseSetUp, setChooseSetUp] = useState("")

  const setups = [
    { key: 1, value: 1, text: "Line Bounce"},
    { key: 2, value: 2, text: "Red Green Dip"},
    { key: 3, value: 3, text: "Pinbar"},
    { key: 4, value: 4, text: "High Point Squeeze"},
    { key: 5, value: 5, text: "PM VWAP Reclaim"}
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

  let vwapReclaim = [
    {id: 1, label: "Stock not down more than 50% of move from highs", checked: false},
    {id: 2, label: "1min chart", checked: false},
    {id: 3, label: "Day 1 or gap up", checked: false},
    {id: 4, label: "B/O candle to close 0.02c higher or when happens, stop b/e or 1min200 breakdown", checked: false}
  ]

  const onChangeHandler = (event, data) => {
    props.setSetUp(event)
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
    } else {
      props.setPrereq(vwapReclaim.length)
      setChooseSetUp(vwapReclaim)
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
  if (props.setUp !== "") {
    setUp = (
      <>
        <h2>{props.setUp} <span id="italic"> Pre-reqs</span></h2>
        {chooseSetUp.map(checkbox => {
          return (
            <>
              <Checkbox onClick={() => onClickHandler(checkbox.id, checkbox.label, checkbox.checked)} 
                id={checkbox.id} 
                label={checkbox.label} 
                checked={checkbox.checked} 
              />
            </>
          )
        })}
      </>
    )
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
            onChange={(event, data) => {
              onChangeHandler(event.target.innerText, data.value);
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