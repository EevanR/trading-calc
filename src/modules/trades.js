import axios from "axios";

const sendTrade = async (id, trade, quote, profile) => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.post("/trades",
      {
        trade: {
          ticker: trade[1].ticker,
          entry: trade[1].stockPrice,
          shares: trade[1].shares,
          stop: trade[1].sp,
          setup: trade[1].setup,
          date: trade[1].date,
          profit: trade[2],
          trade_id: id,
          open: quote["02. open"],
          high: quote["03. high"],
          low: quote["04. low"],
          close: quote["05. price"],
          vol: quote["06. volume"],
          prevClose: quote["08. previous close"],
          volAvg: profile["volAvg"],
          mktCap: profile["mktCap"],
          company: profile["companyName"],
          industry: profile["industry"]
        }
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
    const response = await axios.get("/trades", {
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
        apikey: "39DMC4D0QYC3JCGG"
      }
    });
    return response
  } catch (error) {
    return error;
  }
}

const getProfile = async ticker => {
  try {
    const response = await axios.get(`https://fmpcloud.io/api/v3/profile/${ticker}?apikey=c3ae0e6333eeb76d17564d0b2c9ba878`);
    return response
  } catch (error) {
    return error;
  }
}

export { sendTrade, getTrades, getQuote, getProfile }