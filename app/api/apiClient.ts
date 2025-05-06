import axios from "axios";
import { ApiRoutes } from "./apiRoutes";

export const API = axios.create({
  baseURL: ApiRoutes.BASE_URL,
});

export const getApiConfig = (token: string) => {
  return {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  };
};

export function useFetchAllManagers() {
  async function FetchAllManagers(data: any) {
    return API.post(ApiRoutes.FetchAllManagers, data, getApiConfig(""));
  }

  return FetchAllManagers;
}
