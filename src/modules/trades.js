import axios from "axios";

const sendExcel = async (groupedTrades) => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.post("/excels",
      {
        data: groupedTrades
      }, 
      {
        headers: headers
      }
    )
    return response
  } catch (error) {
    return error.response;
  }
}

const getTrades = async () => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.get("/excels", {
      headers: headers
    })
    return response
  } catch (error) {
    debugger
    return error.response;
  }
}

const getQuote = async ticker => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://www.alphavantage.co/query",
      params: {
        function: "GLOBAL_QUOTE",
        symbol: ticker,
        apikey: process.env.REACT_APP_ALPHA_VANTAGE_API
      }
    });
    return response
  } catch (error) {
    return error;
  }
}

const getProfile = async ticker => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://fmpcloud.io/api/v3/profile/${ticker}`,
      params: {
        apikey: process.env.REACT_APP_FMP_API
      }
    });
    return response
  } catch (error) {
    return error;
  }
}

const destroyExcel = async (id) => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.delete(`/excels/${id}`, {
      headers: headers
    })
    return response
  } catch (error) {
    return error.response;
  }
}

export { sendExcel, getTrades, getQuote, getProfile, destroyExcel }