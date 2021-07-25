import axios from "axios";

const twitterRules = async () => {
  let headers = {
    "Content-type": "application/json",
    "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAFgCSAEAAAAAJamoPmZsqFjqK%2FDZiVs2OZ8OHEU%3Du2TvRZYO7M2efb3q5BLhVCyKkiH1Gw00uAJyEtNDhYRrRrLCf0"
  }
  try {
    const response = await axios({
      headers: headers,
      method: "POST",
      url: "https://api.twitter.com/2/tweets/search/stream/rules",
      body: {
        "add":[
          {"value":"from:twitterdev from:twitterapi has:links"}
        ]
      }
    })
    debugger
    return response
  } catch (error) {
    debugger
    return error.response
  }
}

export { twitterRules }