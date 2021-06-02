import axios from "axios";

const saveStrategy = async (name, reqOne, reqTwo, reqThree, reqFour, reqFive, reqSix, reqSeven, reqEight, reqNine, reqTen) => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.post("/setups",
      {
        setup: {
          name: name,
          reqOne: reqOne,
          reqTwo: reqTwo,
          reqThree: reqThree,
          reqFour: reqFour,
          reqFive: reqFive,
          reqSix: reqSix,
          reqSeven: reqSeven,
          reqEight: reqEight,
          reqNine: reqNine,
          reqTen: reqTen
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

export { saveStrategy, getSetups  }