"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Manager, ManagerUpdate } from "@/models/IManager";
import { useManagerContext } from "@/contexts/ManagerContext";
import { useUpdateManager } from "@/app/api/apiClient";
import { toast } from "sonner";

interface UpdateManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  manager: Manager;
}

export function UpdateManagerModal({
  isOpen,
  onClose,
  manager,
}: UpdateManagerModalProps) {
  const updateManager = useUpdateManager();
  const { setManagers, setFilteredManagers } = useManagerContext();

  const [formData, setFormData] = useState<ManagerUpdate>({
    id: manager.id,
    fullName: manager.fullName,
    companyDescription: manager.companyDescription,
    companyName: manager.companyName,
  });

  const [isUpdatingManager, setIsUpdatingManager] = useState(false);

  // Update form data when user changes
  useEffect(() => {
    setFormData({
      id: manager.id,
      fullName: manager.fullName,
      companyDescription: manager.companyDescription,
      companyName: manager.companyName,
    });
  }, [manager]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { fullName, companyName, companyDescription } = formData;
    if (!fullName || !companyName || !companyDescription) {
      return false;
    }
    // Add more validation logic if needed
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsUpdatingManager(true);

    try {
      await updateManager(formData).then((response) => {
        console.log("🚀 ~ updateManager ~ response:", response);
        toast.success("Manager updated successfully!");

        // Update the particular manager in the context aince the response contains the updated manager
        setManagers((prev) =>
          prev.map((m) => (m.id === formData.id ? { ...m, ...formData } : m))
        );

        // Reset form and close modal
        setFormData({
          fullName: "",
          companyDescription: "",
          companyName: "",
        });

        onClose();
      });
    } catch (error) {
      toast.error("Error updating manager.");
    } finally {
      setIsUpdatingManager(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Manager</DialogTitle>
          <DialogDescription>
            Update manager information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Full name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyDescription" className="text-left">
                Company description
              </Label>
              <Input
                id="companyDescription"
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName" className="text-left">
                Company name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdatingManager}>
              {isUpdatingManager ? "Updating..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
