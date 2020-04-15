import React, { useState } from "react";
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";

const SetUp = props => {
  const [chooseSetUp, setChooseSetUp] = useState("")
  const [checkList, setCheckList] = useState([])

  const setups = [
    { key: 1, value: 5, text: "Line Bounce"},
    { key: 2, value: 4, text: "Red Green Dip"},
    { key: 3, value: 4, text: "Pinbar"},
    { key: 4, value: 3, text: "High Point Squeeze"}
  ]

  const onChangeHandler = (event, data) => {
    setChooseSetUp(event.target.innerText)
    props.setPrereq(data)
  }

  const onClickHandler = data => {
    if (props.checkList.includes(data)) {
      let newArray = []
      props.checkList.forEach(item => {
        if (item !== data) {
          newArray.push(item)
        }
      })
      props.setCheckList(newArray)
    } else {
      props.setCheckList([...props.checkList, data])
    }
  }

  let setUp;
  switch (true) {
    case chooseSetUp === "Line Bounce":
      setUp = (
        <>
          <h2>Line Bounce <span id="italic"> Pre-reqs</span></h2>
          <Checkbox onClick={() => onClickHandler("inside")} label='Inside candle' />
          <Checkbox onClick={() => onClickHandler("vwap")} label='VWAP reject' />
          <Checkbox onClick={() => onClickHandler("offset")} label='With in 0.02c offeset' />
          <Checkbox onClick={() => onClickHandler("first")} label='First time bounce' />
          <Checkbox onClick={() => onClickHandler("EMA")} label='Above 1min200 EMA Line Chart' />
        </>
      )
      break;
    case chooseSetUp === "Red Green Dip":
      setUp = (
        <>
          <h2>Red Green Dip <span id="italic"> Pre-reqs</span></h2>
          <Checkbox onClick={() => onClickHandler("line")} label='Off of line' />
          <Checkbox onClick={() => onClickHandler("offset")} label='Within 0.02c offset' />
          <Checkbox onClick={() => onClickHandler("vwap")} label='No prior VWAP reject' />
          <Checkbox onClick={() => onClickHandler("inside")} label='Green inside candle' />
        </>
      )
      break;
    case chooseSetUp === "Pinbar":
      setUp = (
        <>
          <h2>Pinbar <span id="italic"> Pre-reqs</span></h2>
          <Checkbox onClick={() => onClickHandler("wick")} label='Wick down through' />
          <Checkbox onClick={() => onClickHandler("low")} label='Wick is lowest point of swing low' />
          <Checkbox onClick={() => onClickHandler("vwap")} label='VWAP reject prior' />
          <Checkbox onClick={() => onClickHandler("EMA")} label='Above 1min200 EMA Line Chart' />
        </>
      )
      break;
    case chooseSetUp === "High Point Squeeze":
      setUp = (
        <>
          <h2>High Point Squeeze <span id="italic"> Pre-reqs</span></h2>
          <Checkbox onClick={() => onClickHandler("vol")} label='Vol at trigger' />
          <Checkbox onClick={() => onClickHandler("vwap")} label='VWAP reject prior' />
          <Checkbox onClick={() => onClickHandler("offset")} label='Within 0.02c offset' />
        </>
      )
      break;
    default:
      break;
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
              onChangeHandler(event, data.value);
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
    checkList: state.checkList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPrereq: data => {
      dispatch({ type: "SET_PREREQ", payload: data });
    },
    setCheckList: array => {
      dispatch({ type: "SET_CHECKLIST", payload: array });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetUp);