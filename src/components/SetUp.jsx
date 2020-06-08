import React, { useState, useEffect } from "react";
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";

const SetUp = props => {
  const [chooseSetUp, setChooseSetUp] = useState([])

  const setups = [
    { key: 1, value: 1, text: "Red Green Dip"},
    { key: 2, value: 2, text: "1min Line Bounce AM"},
    { key: 3, value: 3, text: "GoG Short"},
    { key: 4, value: 4, text: "High Short"},
  ]

  let redGreenDip = [
    {id: 1, label: "Off line", checked: false},
    {id: 2, label: "No prior VWAP reject", checked: false},
    {id: 3, label: "Within 0.02c offset", checked: false},
    {id: 4, label: "Green inside candle", checked: false}
  ]

  let oneMinLineBounce = [
    {id: 1, label: "1min chart", checked: false},
    {id: 2, label: "Before 9:50am", checked: false},
    {id: 3, label: "3rd bounce no trade", checked: false},
    {id: 4, label: "Stub Wick, no Pinbar", checked: false},
    {id: 5, label: "Not at VWAP, or just under", checked: false},
    {id: 6, label: "Stop 0.02c under LOD after new high", checked: false},
    {id: 7, label: "Stop 0.02c under chart entry price after higher high", checked: false},
    {id: 8, label: "RED OUT THE GATE", checked: false},
    {id: 9, label: "No hold PM rotation > 90%, prior vwap rejections, Float > 100m", checked: false},
    {id: 10, label: "HOLD - for open -> VWAP add -> Upper band fail next low break", checked: false}
  ]

  let gogShort = [
    {id: 1, label: "PM Trend up", checked: false},
    {id: 2, label: "Preferable PM float rotation", checked: false},
    {id: 3, label: "20% Gap", checked: false},
    {id: 4, label: "Pull from line 0.02c", checked: false},
    {id: 5, label: "Stop b/e after LOD reject", checked: false}
  ]

  let highShort = [
    {id: 1, label: "~20% Gap", checked: false},
    {id: 2, label: "Before 10:00 stop b/e after VWAP", checked: false},
    {id: 3, label: "~10:30 Stop at High", checked: false},
    {id: 4, label: "Entry at VWAP must breakdown immidiately", checked: false},
    {id: 5, label: "1min200EMA above VWAP stop 3min High", checked: false},
    {id: 6, label: "Not under morning LOD", checked: false},
    {id: 7, label: "After 10:30 require proper Vol action", checked: false},
    {id: 8, label: "No Halt Line, No x2 top, No 2:00-3:00 when 1min200 above VWAP", checked: false},
    {id: 9, label: "Entry stop until 1min200 touch, then stop 3min high before", checked: false}
  ]

  const onChangeHandler = (event) => {
    if (event.length < 70) {
      props.setSetUp(event)
    } else {
      setChooseSetUp([])
    }
    props.setCheckList([])
    if (event === "Red Green Dip") {
      props.setPrereq(redGreenDip.length)
      setChooseSetUp(redGreenDip) 
    } else if (event === "1min Line Bounce AM") {
      props.setPrereq(oneMinLineBounce.length)
      setChooseSetUp(oneMinLineBounce)
    }  else if (event === "GoG Short") {
      props.setPrereq(gogShort.length)
      setChooseSetUp(gogShort)
    }  else if (event === "High Short") {
      props.setPrereq(highShort.length)
      setChooseSetUp(highShort)
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