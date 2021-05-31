import React, { useState } from 'react';
import { saveSetup } from "../modules/setup";
import { connect } from "react-redux";
import ItemsCarousel from 'react-items-carousel'
import { Button } from "semantic-ui-react";;

const Setups = (props) => {
  const [message, setMessage] = useState("")
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  const submit = async (e) => {
    e.preventDefault();
    let name = e.target.name.value
    let reqOne = e.target.req1.value
    let reqTwo = e.target.req2.value
    let reqThree = e.target.req3.value
    let reqFour = e.target.req4.value
    let reqFive = e.target.req5.value
    let reqSix = e.target.req6.value
    let reqSeven = e.target.req7.value
    let reqEight = e.target.req8.value
    let reqNine = e.target.req9.value
    let reqTen = e.target.req10.value
    let response = await saveSetup(
      name, reqOne, reqTwo, reqThree, reqFour, reqFive, reqSix, reqSeven, reqEight, reqNine, reqTen
    )
    if (response.status === 200) {
      setMessage(`${name} added Successfully`)
    } else {
      setMessage("Unexpected error, Setup not added")
    }
  }

  let savedStrategies;
  if (props.strategies !== []) {
    savedStrategies = props.strategies.map(strategy => {
      let preReqArray = []
      let preReqs;
      for (const property in strategy) {
        if (property[0] === "r" && strategy[property] !== "") {
          preReqArray.push(strategy[property])
        }
      }
      preReqs = preReqArray.map(req => {
        return (
          <p>{req}</p>
        )
      })
      return (
        <div>
          <h4>{strategy.name}</h4>
          {preReqs}
        </div>
      )
    })
  } else {
    return <h4>No Saved Strategies</h4>
  }

  return (
    <>
      <h2>Setups</h2>
      <div>
        <h4>Add New Setup</h4>
        <form id="main-form" onSubmit={submit}>
          <div className="fields">
            <div className="field">
              <label>Setup Name</label>
              <input
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req1"
                id="req1"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req2"
                id="req2"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req3"
                id="req3"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req4"
                id="req4"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req5"
                id="req5"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req6"
                id="req6"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req7"
                id="req7"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req8"
                id="req8"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req9"
                id="req9"
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req10"
                id="req10"
              />
            </div>
          </div>
          <button id='create-Setup'>Create Setup</button>
        </form>
      </div>
      <h3>{message}</h3>
      <h2>Saved Strategies</h2>
      <div className="carousel" >
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={2.5}
          gutter={5}
          leftChevron={
            <Button circular icon='angle left' />
          }
          rightChevron={
            <Button circular icon='angle right'/>
          }
          chevronWidth={chevronWidth}
        >
          {savedStrategies}
        </ItemsCarousel>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    strategies: state.strategies
  };
};

export default connect(mapStateToProps)(Setups);