import axios, { AxiosResponse } from "axios";
import { ApiRoutes } from "./apiRoutes";
import { Manager, ManagerCreate, ManagerIdentity, ManagerUpdate } from "@/models/IManager";
import { Identity, IdentityCreate } from "@/models/IIdentity";

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
  async function FetchAllManagers(): Promise<Manager[]> {
    const response: AxiosResponse<Manager[]> = await API.get<Manager[]>(
      ApiRoutes.Managers,
      getApiConfig("")
    );

    // returns array of Manager
    return response.data;
    // return API.get<Manager>(ApiRoutes.Managers, getApiConfig(""));
  }

  return FetchAllManagers;
}

export function useFetchManagerById() {
  async function FetchManagerById(id: string): Promise<Manager> {
    const response: AxiosResponse<Manager> = await API.get<Manager>(
      `${ApiRoutes.Managers}/${id}`,
      getApiConfig("")
    );

    // returns array of Manager
    return response.data;
  }

  return FetchManagerById;
}

export function useCreateManager() {
  async function CreateManager(manager: ManagerCreate): Promise<Manager> {
    const response: AxiosResponse<Manager> = await API.post<Manager>(
      ApiRoutes.Managers,
      manager,
      getApiConfig("")
    );

    // returns array of Manager
    return response.data;
  }

  return CreateManager;
}

export function useUpdateManager() {
  async function UpdateManager(manager: ManagerUpdate): Promise<Manager> {
    const response: AxiosResponse<Manager> = await API.patch<Manager>(
      `${ApiRoutes.Managers}/${manager.id}`,
      manager,
      getApiConfig("")
    );
    // returns array of Manager
    return response.data;
  }

  return UpdateManager;
}

export function useDeleteManager() {
  async function DeleteManager(id: string): Promise<void> {
    await API.delete(`${ApiRoutes.Managers}/${id}`, getApiConfig(""));
  }

  return DeleteManager;
}

export function useCreateManagerIdentity() {
  async function CreateManagerIdentity(
    managerId: string,
    data: IdentityCreate
  ): Promise<void> {
    await API.post<Identity>(
      `${ApiRoutes.Managers}/${managerId}/identities`,
      data,
      getApiConfig("")
    );
  }

  return CreateManagerIdentity;
}

export function useFetchAllManagerIdentities() {
  async function FetchAllManagerIdentities(
    managerId: string
  ): Promise<ManagerIdentity> {
    const response: AxiosResponse<ManagerIdentity> = await API.get<ManagerIdentity>(
      `${ApiRoutes.Managers}/${managerId}/identities`,
      getApiConfig("")
    );

    return response.data;
  }

  return FetchAllManagerIdentities;
}
