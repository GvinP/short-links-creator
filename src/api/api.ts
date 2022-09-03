import axios, { AxiosError, AxiosResponse } from "axios";
import { FormDataType } from "../components/Login/Login";

const instance = axios.create({
  baseURL: "http://79.143.31.216/",
});

instance.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${
      localStorage.getItem("token") || ""
    }`;
  }
  return req;
});

export const api = {
  getStatictic(order?: string, limit?: number, offset?: number) {
    return instance.get(`statistics?${order?'order='+order:''}${limit?'&limit='+limit:''}${offset?'&offset='+offset:''}`);
  },
  createLink(link: string) {
    return instance.post(`squeeze?link=${link}`);
  }
};

export const authApi = {
  registration(formData: FormDataType) {
    return instance.post<{}, AxiosResponse<{ username: string }>>(
      `register?username=${formData.username}&password=${formData.password}`
    );
  },
  login(formData: FormDataType) {
    return instance.post<{}, AxiosResponse<LoginResponse>>(
      "login",
      `grant_type=&username=${formData.username}&password=${formData.password}&scope=&client_id=&client_secret=`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  },
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type Link = {
  id: number;
  short: string;
  target: string;
  counter: number;
};
