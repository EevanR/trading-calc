import React, { useState, useEffect } from "react";
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";

const SetUp = props => {
  const [chooseSetUp, setChooseSetUp] = useState([])

  const setups = [
    { key: 1, value: 1, text: "Line Bounce"},
    { key: 2, value: 2, text: "Red Green Dip"},
    { key: 3, value: 5, text: "1min Flag"},
    { key: 4, value: 6, text: "1min Line Bounce AM"},
    { key: 5, value: 7, text: "GoG Short"},
    { key: 6, value: 8, text: "VolumeP Short"}
  ]
  
  let lineBounce = [
    {id: 1, label: "Inside candle", checked: false},
    {id: 2, label: "VWAP reject", checked: false},
    {id: 3, label: "Within 0.02c offset", checked: false},
    {id: 4, label: "First time bounce", checked: false},
    {id: 5, label: "Above 1min200EMA Line Chart", checked: false},
    {id: 6, label: "Not under morning LOD", checked: false}
  ]

  let redGreenDip = [
    {id: 1, label: "Off line", checked: false},
    {id: 2, label: "No prior VWAP reject", checked: false},
    {id: 3, label: "Within 0.02c offset", checked: false},
    {id: 4, label: "Green inside candle", checked: false}
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
    {id: 2, label: "Before 9:50am", checked: false},
    {id: 3, label: "3rd bounce no trade", checked: false},
    {id: 4, label: "Stub Wick, no Pinbar", checked: false},
    {id: 5, label: "Not at VWAP, or just under", checked: false},
    {id: 6, label: "Stop 0.01c under LOD", checked: false},
    {id: 7, label: "Stop 0.02c under chart entry price after new high", checked: false},
    {id: 8, label: "RED OUT THE GATE", checked: false},
    {id: 9, label: "No hold PM rotation > 90%, prior vwap rejections, Float > 100m", checked: false},
    {id: 10, label: "HOLD - for open -> VWAP add -> Upper band fail next low break", checked: false}
  ]

  let gogShort = [
    {id: 1, label: "PM Trend up", checked: false},
    {id: 2, label: "Preferable PM float rotation", checked: false},
    {id: 3, label: "day 1 or 20% gap", checked: false},
    {id: 4, label: "Pull from line", checked: false}
  ]

  let vpShort = [
    {id: 1, label: "PM Trend up", checked: false},
    {id: 2, label: "Preferable PM float rotation", checked: false},
    {id: 3, label: "day 1 or 20% gap", checked: false},
    {id: 4, label: "Red Out Gate", checked: false},
    {id: 5, label: "Retest highest VP area", checked: false},
    {id: 6, label: "Under VWAP", checked: false},
    {id: 7, label: "Entry lower high", checked: false}
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
    } else if (event === "1min Flag") {
      props.setPrereq(flag.length)
      setChooseSetUp(flag)
    }  else if (event === "1min Line Bounce AM") {
      props.setPrereq(oneMinLineBounce.length)
      setChooseSetUp(oneMinLineBounce)
    }  else if (event === "GoG Short") {
      props.setPrereq(gogShort.length)
      setChooseSetUp(gogShort)
    }  else if (event === "VolumeP Short") {
      props.setPrereq(vpShort.length)
      setChooseSetUp(vpShort)
    }  else {
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