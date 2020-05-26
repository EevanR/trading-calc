import axios from "axios";

const getIntradayData = async ticker => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://www.alphavantage.co/query",
      params: {
        function: "TIME_SERIES_INTRADAY",
        symbol: ticker,
        interval: "15min",
        outputsize: "full",
        apikey: "39DMC4D0QYC3JCGG"
      }
    });
    return response
  } catch (error) {
    return error;
  }
}

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
        apikey: "39DMC4D0QYC3JCGG"
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
        apikey: "39DMC4D0QYC3JCGG"
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
        apikey: "39DMC4D0QYC3JCGG"
      }
    });
    return response
  } catch (error) {
    return error;
  }
}

export { getIntradayData, getGapData, getVwapData, getFiveMinData }