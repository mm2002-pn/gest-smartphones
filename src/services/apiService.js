import axios from "axios";

// apiFetch

export const apiFetch = async (url, method, data=null ) => {
    const BASE_URL = "http://localhost:3333";
  try {
    const response = await axios({
      method: method,
      url: `${BASE_URL}/${url}`,
      data: data,
    });
    return response;
  } catch (error) {
    return error;
  }
};
