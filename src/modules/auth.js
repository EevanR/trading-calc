import axios from "axios";

const register = async (email, username, password, passCon) => {
  try {
    const response = await axios.post("/auth", {
      email: email,
      password: password,
      password_confirmation: passCon,
      nickname: username
    });
    storeAuthCredentials(response, response.data.data.nickname);
    return response;
  } catch (error) {
    debugger
    return error.response.data.errors.full_messages[0];
  }
}

const signIn = async (email, password) => {
  try {
    const response = await axios.post("/auth/sign_in", {
      email: email,
      password: password
    });
    storeAuthCredentials(response, response.data.data.nickname);
    return response;
  } catch (error) {
    debugger
    return error.response.data.errors[0]
  }
}

const storeAuthCredentials = ({ headers }, nickname) => {
  const credentials = {
    uid: headers["uid"],
    nickname: nickname,
    client: headers["client"],
    access_token: headers["access-token"],
    expiry: headers["expiry"],
    token_type: "Bearer"
  };
  sessionStorage.setItem("credentials", JSON.stringify(credentials));
};

const logout = async () => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);
  let response = await axios.delete("/auth/sign_out", {
      headers: headers
    }
  );
  if (response.data.success) {
    return response
  } else { 
    return response
  }
};

const updateRisk = async (id, risk) => {
  let headers = JSON.parse(sessionStorage.getItem("credentials"));
  try {
    const response = await axios.put(`/admin/users/${id}`,
      {
        risk: risk
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

export { register, signIn, logout, updateRisk }