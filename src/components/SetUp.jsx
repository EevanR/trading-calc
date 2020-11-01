import React, { useState, useEffect } from "react";
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";
import { getSetups } from "../modules/setup";

const SetUp = props => {
  const [chooseSetUp, setChooseSetUp] = useState([])
  const [setupList, setSetupList] = useState([])
  const [setups, setSetups] = useState([])

  const indexSetups = async () => {
    let response = await getSetups()
    if (response.status === 200) {
      let setupsNames = []
      let key = 1
      let value = 1
      response.data.forEach(item => {
        setupsNames.push({key: key++, value: value++, text: item.name})
      })
      setSetupList(setupsNames)
      setSetups(response.data)
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
      }
    })
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
    indexSetups()
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
            options={setupList}
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