import axios from "axios";

const getFiveMinData = async (ticker, date) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://www.alphavantage.co/query",
      params: {
        function: "TIME_SERIES_INTRADAY",
        symbol: ticker,
        interval: "5min",
        month: `${date[0]}-${date[1]}`,
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
        function: "TIME_SERIES_DAILY",
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

export { getGapData, getFiveMinData }