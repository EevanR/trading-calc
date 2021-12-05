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
  const [editReqs, setEditReqs] = useState({})

  const submit = (e) => {
    e.preventDefault();
    let name = e.target.name.value
    let req1 = e.target.req1.value
    let req2 = e.target.req2.value
    let req3 = e.target.req3.value
    let req4 = e.target.req4.value
    let req5 = e.target.req5.value
    let req6 = e.target.req6.value
    let req7 = e.target.req7.value
    let req8 = e.target.req8.value
    let req9 = e.target.req9.value
    let req10 = e.target.req10.value
    
    const saveNew = async () => {
      let response = await saveStrategy(
        name, req1, req2, req3, req4, req5, req6, req7, req8, req9, req10
      )
      if (response.status === 200) {
        setMessage(`${name} added Successfully`)
        clearFields()
        reloadSetups()
      } else {
        setMessage(response.data.errors[0])
      }
    }

    const update = async () => {
      let reqs = {
        name: name, 
        req1: req1, 
        req2: req2, 
        req3: req3, 
        req4: req4, 
        req5: req5, 
        req6: req6, 
        req7: req7, 
        req8: req8, 
        req9: req9, 
        req10: req10
      }
      let response = await updateSetup(editInfo[1], reqs)
      if (response.status === 200) {
        setMessage(`${name} updated Successfully`)
        clearFields()
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
    setEditReqs({})
    let strategy = {}
    for (let i=0; i<props.strategies.length; i++) {
      if (props.strategies[i].name === stratName) {
        strategy = props.strategies[i]
        setEditReqs(strategy)
        break
      }
    }
    setEditStrat(true)
    setEditInfo([stratName, setupId])
  }
  
  const cancleEdit = () => {
    setEditStrat(false)
    setEditInfo([""])
    clearFields()
    reloadSetups()
  }

  const clearFields = () => {
    let num = 1
    let obj = {}
    obj.name = ""
    for (let i=1; i < 11; i++) {
      obj[`req${num}`] = ""
      num+=1
    }
    setEditReqs(obj)
  }

  const clickHandler = () => {
    setEditReqs({})
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
          <p>&#8226; {req}</p>
        )
      })
      return (
        <div id={`setup${strategy.id}`}>
          <h4>{strategy.name}</h4>
          <button className="ui button reqs" id={strategy.id} onClick={() => deleteStrat(strategy.id, strategy.name)}>Delete</button>
          <button className="ui button reqs" id={`edit${strategy.id}`} onClick={() => editSetup(strategy.id, strategy.name)}>Edit</button>
          <div className="pre-reqs">{preReqs}</div>
        </div>
      )
    })
  } else {
    return <h4>No Saved Strategies</h4>
  }

  return (
    <>
      <section className="container strats-tab" id="graphs">
        <h2>Strategies</h2>
        <div className="ui form">
          {editStrat === true ? <h4>Edit Strategy "{editInfo[0]}"</h4> : <h4>Add New Strategy</h4> }
          <form className="strats-form" onSubmit={submit}>
            <div>
              <div>
                <label>Strategy Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value = {editReqs.name}
                  onClick= {clickHandler}
                />
              </div>
              <div>
                <label>Condition</label>
                <input
                  type="text"
                  name="req1"
                  id="req1"
                  value = {editReqs.req1}
                  onClick= {clickHandler}
                />
              </div>
              <div>
                <label>Condition</label>
                <input
                  type="text"
                  name="req2"
                  id="req2"
                  value = {editReqs.req2}
                  onClick= {clickHandler}
                />
              </div>
              <div>
                <label>Condition</label>
                <input
                  type="text"
                  name="req3"
                  id="req3"
                  value = {editReqs.req3}
                  onClick= {clickHandler}
                />
              </div>
              <div>
                <label>Condition</label>
                <input
                  type="text"
                  name="req4"
                  id="req4"
                  value = {editReqs.req4}
                  onClick= {clickHandler}
                />
              </div>
              <div>
                <label>Condition</label>
                <input
                  type="text"
                  name="req5"
                  id="req5"
                  value = {editReqs.req5}
                  onClick= {clickHandler}
                />
              </div>
              <div>
                <label>Condition</label>
                <input
                  type="text"
                  name="req6"
                  id="req6"
                  value = {editReqs.req6}
                  onClick= {clickHandler}
                />
              </div>
              <div>
                <label>Condition</label>
                <input
                  type="text"
                  name="req7"
                  id="req7"
                  value = {editReqs.req7}
                  onClick= {clickHandler}
                />
              </div>
              <div>
                <label>Condition</label>
                <input
                  type="text"
                  name="req8"
                  id="req8"
                  value = {editReqs.req8}
                  onClick= {clickHandler}
                />
              </div>
              <div>
                <label>Condition</label>
                <input
                  type="text"
                  name="req9"
                  id="req9"
                  value = {editReqs.req9}
                  onClick= {clickHandler}
                />
              </div>
              <div>
                <label>Condition</label>
                <input
                  type="text"
                  name="req10"
                  id="req10"
                  value = {editReqs.req10}
                  onClick= {clickHandler}
                />
              </div>
            </div>
            {editStrat === false ? 
              <button className="ui button">Create Strategy</button> :
              <button className="ui button">Save Edit</button> }
          </form>
          { editStrat === true && 
            <button id='cancle-eidt'
              onClick={() => cancleEdit()}
            >Cancel</button>
          }
        </div>
        <h4 id='strats-alert'>{message}</h4>
      </section>
      {editStrat === false &&
      <section className="carousel bg-ivory" >
        <h2>Saved Strategies</h2>
        <div>
          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={2}
            gutter={20}
            leftChevron={
              <Button circular icon='angle left' />
            }
            rightChevron={
              <Button circular icon='angle right'/>
            }
            chevronWidth={40}
          >
            {savedStrategies}
          </ItemsCarousel>
        </div>
      </section>
      }
      <section className="footer bg-secondary">

      </section>
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