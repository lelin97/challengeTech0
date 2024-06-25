import axios, { AxiosInstance } from "axios";

export const axiosInstance = async (): Promise<AxiosInstance> => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_HOST}`,
    responseType: "json",
    headers: {
      Authorization: `Bearer ${12345}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  });

  return instance;
};
