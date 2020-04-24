import React, { useState, useEffect } from "react";
import { Icon} from 'semantic-ui-react'
import { connect } from "react-redux";

const Pannel = props => {
  const [pannel, setPannel] = useState(false)

  const togglePannel = () => {
    pannel === false ? setPannel(true) : setPannel(false)
  }

  return (
    <div id="pannel" className={pannel ?  "pannel-in" : "pannel-out"} >
      {/* <div>{props.userAttrs.nickname}</div> */}
      <div className="pannel-switch">
        <Icon onClick={() => togglePannel() } 
          color='red' 
          name={pannel === false ? 'arrow alternate circle right outline' : 'arrow alternate circle left outline'} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userAttrs: state.userAttrs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => {
      dispatch({ type: "SET_USER", payload: data });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pannel);