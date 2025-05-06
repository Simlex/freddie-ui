import axios from "axios";
import { ApiRoutes } from "./apiRoutes";
import { WaitlistSubscriptionRequest } from "../model/IWaitlist";

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

export function useSubscribeToWaitlist() {
  async function subscribeToWaitlist(data: WaitlistSubscriptionRequest) {
    return API.post(ApiRoutes.WaitlistSubscription, data, getApiConfig(""));
  }

  return subscribeToWaitlist;
}
