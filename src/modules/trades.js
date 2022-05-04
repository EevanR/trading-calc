import axios from "axios";

const sendExcel = async (data, option) => {
  let groupedTrades;
  let sum;
  option === "shortFees" ? sum = data : groupedTrades = data
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.post("/excels",
      {
        data: groupedTrades,
        fees: sum
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

const updateExcel = async (data, option, id) => {
  let groupedTrades;
  let sum;
  option === "shortFees" ? sum = data : groupedTrades = data
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.patch(`/excels/${id}`,
      {
        data: groupedTrades,
        fees: sum
      }, 
      {
        headers: headers
      }
    )
    return response
  } catch (error) {
    return error.resposne
  }
}

const getTrades = async () => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  let path;
  {headers.role === "subscriber" ? path = "/admin/excels" : path = "/excels"}
  try {
    const response = await axios.get(`${path}`, {
      headers: headers
    })
    return response
  } catch (error) {
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

export { sendExcel, getTrades, getQuote, getProfile, destroyExcel, updateExcel }