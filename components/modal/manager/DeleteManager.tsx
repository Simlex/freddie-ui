"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Manager } from "@/models/IManager";
import { useDeleteManager } from "@/app/api/apiClient";
import { toast } from "sonner";
import { useState } from "react";
import { useManagerContext } from "@/contexts/ManagerContext";

interface DeleteManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  manager: Manager;
}

export function DeleteManagerModal({
  isOpen,
  onClose,
  manager,
}: DeleteManagerModalProps) {
  const deleteManager = useDeleteManager();
  const { handleFetchAllManagers } = useManagerContext();

  const [isDeletingManager, setIsDeletingManager] = useState(false);

  const handleDelete = async () => {
    setIsDeletingManager(true);

    try {
      await deleteManager(manager.id);
      toast.success("User deleted successfully.");
      handleFetchAllManagers();
      onClose();
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setIsDeletingManager(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="h-5 w-5" />
            Delete Manager
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this manager? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-2">You are about to delete the following manager:</p>
          <div className="rounded-md bg-muted p-4">
            <p className="font-medium">Name: {manager.fullName}</p>
            <p className="text-sm text-muted-foreground">
              Comapny name: {manager.companyName}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeletingManager}>
            {isDeletingManager ? "Deleting..." : "Delete manager"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
