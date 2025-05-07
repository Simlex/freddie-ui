import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Manager, ManagerIdentity } from "@/models/IManager";
import {
    useFetchAllManagerIdentities,
  useFetchAllManagers,
} from "@/app/api/apiClient";
import { Identity } from "@/models/IIdentity";
import { useManagerContext } from "./ManagerContext";

// Define the type for the context data
export type IdentitiesContextData = {
  managerIdentity: ManagerIdentity | null;
  setManagerIdentity: Dispatch<SetStateAction<ManagerIdentity | null>>;
  handleFetchAllManagerIdentity: () => Promise<void>;
};

// Create a context with the specified data type
const IdentitiesContext = createContext<IdentitiesContextData | undefined>(
  undefined
);

// Create a provider component that takes children as props
type IdentityProviderProps = {
  children: ReactNode;
};

const IdentityProvider: FunctionComponent<IdentityProviderProps> = ({
  children,
}) => {
  const fetchAllManagerIdentities = useFetchAllManagerIdentities();
  const { selectedManager } = useManagerContext();

  const [managerIdentity, setManagerIdentity] = useState<ManagerIdentity | null>(null);
  const [isFetchingManagerIdentity, setIsFetchingManagerIdentity] =
    useState(true);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleFetchAllManagerIdentity = async () => {
    if (!selectedManager) return;

    setIsFetchingManagerIdentity(true);

    try {
      const data = await fetchAllManagerIdentities(selectedManager.id);
      console.log("🚀 ~ handleFetchAllManagerIdentity ~ data:", data)
      setManagerIdentity(data);
    } catch (error) {
      console.error("Error fetching manager identities:", error);
    } finally {
      setIsFetchingManagerIdentity(false);
    }
  };

  useEffect(() => {
    if (selectedManager) {
      handleFetchAllManagerIdentity();
    } else {
      setManagerIdentity(null);
    }
  }, [selectedManager])

  // Define the values you want to share
  const sharedData: IdentitiesContextData = {
    managerIdentity,
    setManagerIdentity,
    handleFetchAllManagerIdentity,
  };

  return (
    <IdentitiesContext.Provider value={sharedData}>
      {children}
    </IdentitiesContext.Provider>
  );
};

export { IdentityProvider, IdentitiesContext };

export const useIdentitiesContext = () => {
  const context = useContext(IdentitiesContext);
  if (context === undefined) {
    throw new Error(
      "useIdentitiesContext must be used within a IdentityProvider"
    );
  }
  return context;
};
