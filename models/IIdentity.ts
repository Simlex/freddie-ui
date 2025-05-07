export type Identity = {
  id: string;
  identityType: string;
  identity: string;
  verificationStatus: string;
  createdAt: string;
};
export type IdentityCreate = Omit<Identity, "id" | "verificationStatus" | "createdAt">;
export type IdentityUpdate = Partial<Omit<Identity, "identity">>;