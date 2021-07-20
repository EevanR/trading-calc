import React, { useState } from 'react';
import { saveStrategy, deleteSetup, getSetups, updateSetup } from "../modules/setup";
import { connect } from "react-redux";
import ItemsCarousel from 'react-items-carousel'
import { Button } from "semantic-ui-react";;

const Setups = (props) => {
  const [message, setMessage] = useState("")
  const [editStrat, setEditStrat] = useState(false)
  const [editInfo, setEditInfo] = useState([])
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const [editReqs, setEditReqs] = useState([])
  const [inputIndex, setInputIndex] = useState("")

  const submit = (e) => {
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
    
    const saveNew = async () => {
      let response = await saveStrategy(
        name, reqOne, reqTwo, reqThree, reqFour, reqFive, reqSix, reqSeven, reqEight, reqNine, reqTen
      )
      if (response.status === 200) {
        setMessage(`${name} added Successfully`)
        reloadSetups()
      } else {
        setMessage(response.data.errors[0])
      }
    }

    const update = async () => {
      let reqs = {
        name: name, 
        reqOne: reqOne, 
        reqTwo: reqTwo, 
        reqThree: reqThree, 
        reqFour: reqFour, 
        reqFive: reqFive, 
        reqSix: reqSix, 
        reqSeven: reqSeven, 
        reqEight: reqEight, 
        reqNine: reqNine, 
        reqTen: reqTen
      }
      let response = await updateSetup(editInfo[1], reqs)
      if (response.status === 200) {
        setMessage(`${name} updated Successfully`)
        reloadSetups()
      } else {
        setMessage(response.data.errors[0])
      }
    }
    editStrat === false ? saveNew() : update() 
  }

  const deleteStrat = async (setupId, strategyName) => {
    let response = await deleteSetup(setupId)
    if (response.status === 200) {
      setMessage(`"${strategyName}" Deleted.`)
      reloadSetups()
    } else {
      setMessage(`${response.error}`)
    }
  }

  const reloadSetups = async () => {
    let response = await getSetups()
    if (response !== undefined && response.status === 200) {
      props.setStrategies(response.data)
    } 
    setEditStrat(false)
  }

  const editSetup = async (setupId, stratName) => {
    setEditReqs([])
    let strategy = {}
    for (let i=0; i<props.strategies.length; i++) {
      if (props.strategies[i].name === stratName) {
        strategy = props.strategies[i]
        break
      }
    }
    for (const property in strategy) {
      if (typeof strategy[property] === "string" && strategy[property][4] !== "-") {
        setEditReqs(editReqs => [...editReqs, strategy[property]])
      }
    }
    setEditStrat(true)
    setEditInfo([stratName, setupId])
  }

  const cancleEdit = () => {
    setEditStrat(false)
    setEditInfo([""])
    setEditReqs([])
    for(let i=0; i < 10; i++){
      setEditReqs(editReqs => [...editReqs, null])}
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
        <div id={`setup${strategy.id}`}>
          <h4>{strategy.name}</h4>
          {preReqs}
          <button id={strategy.id} onClick={() => deleteStrat(strategy.id, strategy.name)}>Delete</button>
          <button id={`edit${strategy.id}`} onClick={() => editSetup(strategy.id, strategy.name)}>Edit</button>
        </div>
      )
    })
  } else {
    return <h4>No Saved Strategies</h4>
  }

  const clickHandler = (e) => {
    let index = editReqs.findIndex(req => req === e.target.value);
    setInputIndex(index)
  }

  const formFieldChangeHandler = (e) => {
    let newArr = [...editReqs]
    newArr[inputIndex] = e.target.value
    setEditReqs(newArr);
  }

  return (
    <>
      <h2>Strategies</h2>
      <div>
        {editStrat === true ? <h4>Edit Strategy "{editInfo[0]}"</h4> : <h4>Add New Strategy</h4> }
        <form id="main-form" onSubmit={submit}>
          <div className="fields">
            <div className="field">
              <label>Strategy Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value = {editReqs[0]}
                onChange= {formFieldChangeHandler}
                onClick= {clickHandler}
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req1"
                id="req1"
                value = {editReqs[1]}
                onChange= {formFieldChangeHandler}
                onClick= {clickHandler}
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req2"
                id="req2"
                value = {editReqs[2]}
                onChange= {formFieldChangeHandler}
                onClick= {clickHandler}
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req3"
                id="req3"
                value = {editReqs[3]}
                onChange= {formFieldChangeHandler}
                onClick= {clickHandler}
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req4"
                id="req4"
                value = {editReqs[4]}
                onChange= {formFieldChangeHandler}
                onClick= {clickHandler}
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req5"
                id="req5"
                value = {editReqs[5]}
                onChange= {formFieldChangeHandler}
                onClick= {clickHandler}
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req6"
                id="req6"
                value = {editReqs[6]}
                onChange= {formFieldChangeHandler}
                onClick= {clickHandler}
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req7"
                id="req7"
                value = {editReqs[7]}
                onChange= {formFieldChangeHandler}
                onClick= {clickHandler}
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req8"
                id="req8"
                value = {editReqs[8]}
                onChange= {formFieldChangeHandler}
                onClick= {clickHandler}
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req9"
                id="req9"
                value = {editReqs[9]}
                onChange= {formFieldChangeHandler}
                onClick= {clickHandler}
              />
            </div>
            <div className="field">
              <label>Condition</label>
              <input
                type="text"
                name="req10"
                id="req10"
                value = {editReqs[10]}
                onChange= {formFieldChangeHandler}
                onClick= {clickHandler}
              />
            </div>
          </div>
          {editStrat === false ? 
            <button id='create-strategy'>Create Strategy</button> :
            <button id='edit-strategy'>Save Edit</button> }
        </form>
        { editStrat === true && 
          <button id='cancle-eidt'
            onClick={() => cancleEdit()}
          >Cancel</button>
        }
      </div>
      <h3 id='result-message'>{message}</h3>
      {editStrat === false &&
        <>
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
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    strategies: state.strategies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStrategies: array => {
      dispatch({ type: "SET_STRATEGIES", payload: array });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setups);