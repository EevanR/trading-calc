import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTrades } from "../modules/trades"

const ProfitChart = props => {
  

  useEffect(() => {
    const getSavedTrades = async () => {
      let response = await getTrades();
      if (response.status === 200) {
        props.setSavedTrades(response.data)
      } else {
        props.setMessage(response.error)
      }
    }
    getSavedTrades()
  }, [])

  return (
    <>
      <h2>Profit Chart</h2>
      {props.savedTrades !== null && (
      <p>{props.savedTrades[0].ticker}</p>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    savedTrades: state.savedTrades
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSavedTrades: data => {
      dispatch({ type: "SET_SAVEDTRADES", payload: data });
    },
    setMessage: string => {
      dispatch({ type: "SET_MESSAGE", payload: string });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitChart)