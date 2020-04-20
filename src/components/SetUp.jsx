import React, { useState, useEffect } from "react";
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";

const SetUp = props => {
  const [chooseSetUp, setChooseSetUp] = useState("")

  const setups = [
    { key: 1, value: 1, text: "Line Bounce"},
    { key: 2, value: 2, text: "Red Green Dip"},
    { key: 3, value: 3, text: "Mid Point Squeeze"},
    { key: 4, value: 4, text: "High Point Squeeze"}
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

  let midPoint = [
    {id: 1, label: "Off line", checked: false},
    {id: 1, label: "Vol at trigger", checked: false},
    {id: 3, label: "Within 0.02c offset", checked: false},
    {id: 5, label: "Above 1min200EMA Line Chart", checked: false}
  ]

  let highPoint = [
    {id: 1, label: "Vol at trigger", checked: false},
    {id: 2, label: "VWAP reject prior", checked: false},
    {id: 3, label: "Within 0.02c offset", checked: false},
    {id: 4, label: "Stop low of breakout candle", checked: false}
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
    } else if (event === "Mid Point Squeeze") {
      props.setPrereq(midPoint.length)
      setChooseSetUp(midPoint) 
    } else {
      props.setPrereq(highPoint.length)
      setChooseSetUp(highPoint)
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