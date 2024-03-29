import axios from "axios";

const createSession = async (lookup_key) => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.post("/subscriptions",
      {
        lookup_key: lookup_key
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

const createPortal = async (session) => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.post("/stripe_portals",
      {
        session_id: session
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

export { createSession, createPortal }