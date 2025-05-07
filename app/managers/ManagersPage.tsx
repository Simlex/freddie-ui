"use client";
import { ManagersTable } from "@/components/managers/ManagersTable";
import { CreateManagerModal } from "@/components/modal/manager/CreateManager";
import { DeleteManagerModal } from "@/components/modal/manager/DeleteManager";
import { UpdateManagerModal } from "@/components/modal/manager/UpdateManager";
import { ViewManagerModal } from "@/components/modal/manager/ViewManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useManagerContext } from "@/contexts/ManagerContext";
import { PlusCircle } from "lucide-react";
import React from "react";

type Props = {};

export default function ManagersPage({}: Props) {
  const {
    managers,
    setFilteredManagers,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isFetchingManagers,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    selectedManager,
    isViewModalOpen,
    setIsViewModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  } = useManagerContext();

  const handleSearchManagers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === "") {
      // Reset to all managers if search term is empty
      setFilteredManagers(managers);
      return;
    }

    // Filter managers based on the search term that includes the fullName
    const filteredManagers = managers.filter((manager) =>
      manager.fullName.toLowerCase().includes(searchTerm)
    );
    setFilteredManagers(filteredManagers);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Managers</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Manager
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search managers..."
          className="max-w-sm"
          onChange={handleSearchManagers}
          disabled={isFetchingManagers || managers.length === 0}
        />
      </div>

      {managers.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Found {managers.length} managers
        </p>
      )}
      {!isFetchingManagers && managers.length === 0 && (
        <div className="flex items-center justify-center py-4 text-muted-foreground">
          No managers found.
        </div>
      )}
      {isFetchingManagers && managers.length === 0 && (
        <div className="flex items-center justify-center py-4 text-muted-foreground">
          Loading managers...
        </div>
      )}

      {!isFetchingManagers && managers.length > 0 && <ManagersTable />}

      <CreateManagerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {selectedManager && (
        <UpdateManagerModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          manager={selectedManager}
        />
      )}

      {selectedManager && (
        <ViewManagerModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          manager={selectedManager}
        />
      )}

      {selectedManager && (
        <DeleteManagerModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          manager={selectedManager}
        />
      )}
    </div>
  );
}
