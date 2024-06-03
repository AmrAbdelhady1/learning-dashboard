import axios from "axios";
import { MAIN_URL } from "../../env";

export const fetchData = async (
  body = {},
  url: string,
  method: string,
  contentType?: boolean
) => {
  const api = axios.create({
    baseURL: `${MAIN_URL}/api/`,
  });

  api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("Error fetching data:", error);
    }
  );
  try {
    const response = await api({
      method,
      url,
      data: body,
      headers: {
        "Content-Type": contentType
          ? "multipart/form-data"
          : "Application/json",
      },
      params: method === "GET" ? body : "",
    });
    return response?.data || response;
  } catch (error) {
    return error;
  }
};
