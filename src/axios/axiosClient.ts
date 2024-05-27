import axios from "axios";

export const fetchData = async (body = {}, url: string, method: string) => {
  const api = axios.create({
    baseURL: "http://detc.somee.com/api/",
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
      headers: { "Content-Type": "Application/json" },
      params: method === "GET" ? body : "",
    });
    return response?.data || response;
  } catch (error) {
    return error;
  }
};
