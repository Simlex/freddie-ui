export type Manager = {
  id: string;
  fullName: string;
  companyName: string;
  companyDescription: string;
  createdAt: string;
};
export type ManagerCreate = Omit<Manager, "id" | "createdAt"> & {
    email: string;
};
export type ManagerUpdate = Partial<Omit<Manager, "createdAt">>;
