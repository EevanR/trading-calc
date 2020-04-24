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

export { register }