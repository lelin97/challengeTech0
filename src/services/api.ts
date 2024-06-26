import { AxiosError, AxiosRequestConfig } from "axios";
import { usarTelaLoad } from "../shared/contexts/usarTelaLoad";
import { RetornoDB } from "../types";
import { axiosInstance } from "./axiosConfig";

const { setLoading } = usarTelaLoad.getState();

type AppReqConfig = {
  axiosConfig?: AxiosRequestConfig;
  mensagemSucesso?: string;
  mensagemErro?: string;
  noLoadScreen?: boolean;
};

async function get<T>(
  url: string,
  reqConfig?: AppReqConfig
): Promise<RetornoDB<T>> {
  if (!reqConfig?.noLoadScreen) {
    setLoading(true);
  }

  const instance = await axiosInstance();
  const resultado = await instance
    .get<RetornoDB>(url, reqConfig?.axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response?.data) {
        return error.response.data as RetornoDB;
      }
      return {
        sucesso: false,
        mensagem: "Erro ao realizar requisição.",
        erro: error.message,
      };
    });

  if (!reqConfig?.noLoadScreen) {
    setLoading(false);
  }

  return resultado as RetornoDB;
}

async function post<T extends any = any>(
  url: string,
  data?: { [key: string]: any },
  reqConfig?: AppReqConfig
): Promise<RetornoDB<T>> {
  setLoading(true);
  const instance = await axiosInstance();
  const resultado = await instance

    .post<RetornoDB>(url, data, reqConfig?.axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response?.data) {
        return error.response.data as RetornoDB;
      }
      return {
        sucesso: false,
        mensagem: "Erro ao realizar requisição.",
        erro: error.message,
      };
    });
  setLoading(false);
  return resultado as RetornoDB;
}

async function put<T>(
  url: string,
  data?: { [key: string]: any },
  reqConfig?: AppReqConfig
): Promise<RetornoDB<T>> {
  setLoading(true);
  const instance = await axiosInstance();
  const resultado = await instance
    .put<RetornoDB>(url, data, reqConfig?.axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response?.data) {
        return error.response.data as RetornoDB;
      }
      return {
        sucesso: false,
        mensagem: "Erro ao realizar requisição.",
        erro: error.message,
      };
    });
  setLoading(false);
  return resultado as RetornoDB;
}

async function del<T>(
  url: string,
  reqConfig?: AppReqConfig
): Promise<RetornoDB<T>> {
  setLoading(true);
  const instance = await axiosInstance();
  const resultado = await instance
    .delete<RetornoDB>(url, reqConfig?.axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response?.data) {
        return error.response.data as RetornoDB;
      }
      return {
        sucesso: false,
        mensagem: "Erro ao realizar requisição.",
        erro: error.message,
      };
    });
  setLoading(false);
  return resultado as RetornoDB;
}

const api = { get, post, put, delete: del };

export { api };
