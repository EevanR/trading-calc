import axios from "axios";

const register = async (email, username, password, passCon) => {
  try {
    const response = await axios.post("/auth", {
      email: email,
      password: password,
      password_confirmation: passCon,
      nickname: username
    });
    return response;
  } catch (error) {
    return error.response.data.errors.full_messages[0];
  }
}

const signIn = async (email, password) => {
  try {
    const response = await axios.post("/auth/sign_in", {
      email: email,
      password: password
    });
    return response;
  } catch (error) {
    return error.response.data.errors[0]
  }
}

export { register, signIn }