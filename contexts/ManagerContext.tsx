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
import { Manager } from "@/models/IManager";
import { useFetchAllManagers } from "@/app/api/apiClient";

// Define the type for the context data
export type ManagerContextData = {
  managers: Manager[];
  setManagers: Dispatch<SetStateAction<Manager[]>>;
  filteredManagers: Manager[];
  setFilteredManagers: Dispatch<SetStateAction<Manager[]>>;
  isFetchingManagers: boolean;
  handleFetchAllManagers: () => Promise<void>;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedManager: Manager | null;
  setSelectedManager: Dispatch<SetStateAction<Manager | null>>;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
  isViewModalOpen: boolean;
  setIsViewModalOpen: Dispatch<SetStateAction<boolean>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

// Create a context with the specified data type
const ManagerContext = createContext<ManagerContextData | undefined>(undefined);

// Create a provider component that takes children as props
type ManagerProviderProps = {
  children: ReactNode;
};

const ManagerProvider: FunctionComponent<ManagerProviderProps> = ({
  children,
}) => {
  const fetchAllManagers = useFetchAllManagers();

  const [managers, setManagers] = useState<Manager[]>([]);
  const [filteredManagers, setFilteredManagers] = useState<Manager[]>([]);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [isFetchingManagers, setIsFetchingManagers] = useState(true);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleFetchAllManagers = async () => {
    setIsFetchingManagers(true);
    try {
      const managers = await fetchAllManagers();
      setManagers(managers);
      setFilteredManagers(managers);
    } catch (error) {
      console.error("Error fetching managers:", error);
    } finally {
      setIsFetchingManagers(false);
    }
  };

  useEffect(() => {
    handleFetchAllManagers();
  }, []);

  useEffect(() => {
    setFilteredManagers(managers);
  }, [managers]);

  // Define the values you want to share
  const sharedData: ManagerContextData = {
    managers,
    setManagers,
    isFetchingManagers,
    handleFetchAllManagers,
    filteredManagers,
    setFilteredManagers,
    isCreateModalOpen,
    setIsCreateModalOpen,
    selectedManager,
    setSelectedManager,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    isViewModalOpen,
    setIsViewModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  };

  return (
    <ManagerContext.Provider value={sharedData}>
      {children}
    </ManagerContext.Provider>
  );
};

export { ManagerProvider, ManagerContext };

export const useManagerContext = () => {
  const context = useContext(ManagerContext);
  if (context === undefined) {
    throw new Error("useManagerContext must be used within a ManagerProvider");
  }
  return context;
};
