import axios from "axios";

const sendTrade = async (id, trade) => {
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
          trade_id: id
        }
      }
    )
    return response
  } catch (error) {
    return error.response;
  }
}

const getTrades = async () => {
  try {
    const response = await axios.get("/trades")
    return response
  } catch (error) {
    return error.response;
  }
}
export { sendTrade, getTrades }