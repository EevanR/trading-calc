import axios from "axios";

const sendTwitterHandle = async (name) => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.post("/tweets",
      {
        tweet: {
          name: name
        }
      },
      {
        headers: headers
      }
    )
    return response
  } catch (error) {
    return error.response
  }
}

export { sendTwitterHandle }