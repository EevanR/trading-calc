import axios from "axios";

const saveStrategy = async (name, req1, req2, req3, req4, req5, req6, req7, req8, req9, req10) => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.post("/setups",
      {
        setup: {
          name: name,
          req1: req1,
          req2: req2,
          req3: req3,
          req4: req4,
          req5: req5,
          req6: req6,
          req7: req7,
          req8: req8,
          req9: req9,
          req10: req10
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

const getSetups = async () => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.get("/setups", {
      headers: headers
    })
    return response
  } catch (error) {
    return error.response
  }
}

const deleteSetup = async (setupId) => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.delete(`/setups/${setupId}`, {
      headers: headers
    })
    return response
  } catch (error) {
    return error.response
  }
}

const updateSetup = async (setupId, reqs) => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios({
      headers: headers,
      method: "PATCH",
      url: `/setups/${setupId}`,
      params: {
        name: reqs["name"],
        req1: reqs["req1"],
        req2: reqs["req2"],
        req3: reqs["req3"],
        req4: reqs["req4"],
        req5: reqs["req5"],
        req6: reqs["req6"],
        req7: reqs["req7"],
        req8: reqs["req8"],
        req9: reqs["req9"],
        req10: reqs["req10"]
      }
    })
    return response
  } catch (error) {
    return error.response
  }
}

export { saveStrategy, getSetups, deleteSetup, updateSetup }