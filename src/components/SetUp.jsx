import React, { useState, useEffect } from "react";
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";

const SetUp = props => {
  const [chooseSetUp, setChooseSetUp] = useState([])
  const [setupList, setSetupList] = useState([])
  const [setups, setSetups] = useState([])

  const indexSetups = () => {
    let setupsNames = []
    if (props.strategies.length !== undefined && props.strategies.length !== 0 ) {
      let key = 1
      let value = 1
      props.strategies.forEach(item => {
        setupsNames.push({key: key++, value: value++, text: item.name})
      })
      setSetupList(setupsNames)
      setSetups(props.strategies)
    } else {
      setSetupList("None")
    }
  }

  const onChangeHandler = (event) => {
    if (event.length < 30) {
      props.setSetUp(event)
    } else {
      setChooseSetUp([])
    }
    props.setCheckList([])
    setups.forEach(item => {
      if (event === item.name) {
        let itemId = 1
        let preReqArray = []
        for (const property in item) {
          if (property[0] === "r" && item[property] !== "") {
            preReqArray.push({id: itemId++, label: item[property], checked: false})
          }
        }
        setChooseSetUp(preReqArray)
        props.setPrereq(preReqArray.length)
      }
    })
  }

  const onClickHandler = (id, label) => {
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
    indexSetups()
  }, [props.setUp]);

  const setUp = chooseSetUp.length > 0 ? (
  <>
    {chooseSetUp.map(checkbox => (
      <Checkbox
        key={checkbox.id}
        onClick={() => onClickHandler(checkbox.id, checkbox.label, checkbox.checked)}
        id={checkbox.id}
        label={checkbox.label}
        checked={checkbox.checked}
      />
    ))}
  </>
) : <div></div>;

  return (
    <div className="setups">
      <div className="setups-inner">
        <div id="setup-dropdown">
          {setupList === "None" ? "No Setups, Add new on strategies tab" : 
            <Dropdown
              placeholder= "Select Setup"
              clearable
              fluid
              options={setupList}
              onChange={event => {
                if (event.target.innerText !== "") {
                  onChangeHandler(event.target.innerText);
                } else {
                  props.setSetUp("")
                  setChooseSetUp([])
                }
              }}
            />
          }
        </div>
        <h3>{props.setUp} Pre-reqs</h3>
        <div className="two-column-grid">
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
    setUp: state.setUp,
    strategies: state.strategies
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