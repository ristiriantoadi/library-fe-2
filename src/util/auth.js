import axios from "axios";

const BASE_URL = "http://localhost:8000/admin/account";

export const login = async (noId, password) => {
  const url = BASE_URL + "/login";
  const data = new URLSearchParams();
  data.append("username", noId);
  data.append("password", password);
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = await axios.post(url, data, config);
  localStorage.setItem("token", response.data.access_token);
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const url = BASE_URL + "/check_token";
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(url, { headers });
  return response.data;
};

export default {};
