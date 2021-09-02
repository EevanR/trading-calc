import axios from "axios";

const getFiveMinData = async ticker => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://www.alphavantage.co/query",
      params: {
        function: "TIME_SERIES_INTRADAY",
        symbol: ticker,
        interval: "5min",
        outputsize: "full",
        apikey: process.env.REACT_APP_ALPHA_VANTAGE_API
      }
    });
    return response
  } catch (error) {
    return error;
  }
}

const getGapData = async ticker => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://www.alphavantage.co/query",
      params: {
        function: "TIME_SERIES_DAILY_ADJUSTED",
        symbol: ticker,
        outputsize: "full",
        apikey: process.env.REACT_APP_ALPHA_VANTAGE_API
      }
    });
    return response
  } catch (error) {
    return error;
  }
}

const getVwapData = async ticker => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://www.alphavantage.co/query",
      params: {
        function: "VWAP",
        symbol: ticker,
        interval: "15min",
        apikey: process.env.REACT_APP_ALPHA_VANTAGE_API
      }
    });
    return response
  } catch (error) {
    return error;
  }
}

export { getGapData, getVwapData, getFiveMinData }