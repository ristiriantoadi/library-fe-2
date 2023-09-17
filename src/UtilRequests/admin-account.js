import { privateAxios, publicAxios } from "./util-axios";

const BASE_ACCOUNT_URL = "/admin/account";

export const login = async (noId, password) => {
  const url = BASE_ACCOUNT_URL + "/login";
  const data = new URLSearchParams();
  data.append("username", noId);
  data.append("password", password);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    const response = await publicAxios.post(url, data, config);
    localStorage.setItem("token", response.data.access_token);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCurrentUser = async () => {
  const url = BASE_ACCOUNT_URL + "/check_token";
  try {
    const response = await privateAxios.get(url);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = () => {
  localStorage.clear();
};

export default {};
