import axios from "axios";

const saveSetup = async (name, reqOne, reqTwo, reqThree, reqFour, reqFive, reqSix, reqSeven, reqEight, reqNine, reqTen) => {
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
    debugger
    return response
    } catch (error) {
    debugger
    return error.response
  }
}

export { saveSetup }