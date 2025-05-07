"use client";

import type React from "react";

import { useState } from "react";
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
import { ManagerCreate } from "@/models/IManager";
import { useCreateManager } from "@/app/api/apiClient";
import { toast } from "sonner";
import { useManagerContext } from "@/contexts/ManagerContext";

interface CreateManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateManagerModal({
  isOpen,
  onClose,
}: CreateManagerModalProps) {
  const createManager = useCreateManager();
  const { handleFetchAllManagers } = useManagerContext();

  const [isCreatingManager, setIsCreatingManager] = useState(false);
  const [formData, setFormData] = useState<ManagerCreate>({
    fullName: "",
    companyName: "",
    companyDescription: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { fullName, companyName, companyDescription, email } = formData;
    if (!fullName || !companyName || !companyDescription || !email) {
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

    setIsCreatingManager(true);

    try {
      await createManager(formData).then(() => {
        toast.success("Manager created successfully!");

        // Reset form and close modal
        setFormData({
          fullName: "",
          companyName: "",
          companyDescription: "",
          email: "",
        });

        handleFetchAllManagers();

        onClose();
      });
    } catch (error) {
      toast.error("Failed to create manager. Please try again.");
    } finally {
      setIsCreatingManager(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Manager</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new manager account.
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
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            {/* Company Info below - add a line with after pseudo element after the text */}
            <span className="text-sm text-muted-foreground font-semibold relative after:content-[''] after:block after:w-full after:h-[1px] after:bg-muted-foreground after:mt-2 after:mb-3">
              {/* <span className="absolute -top-2 left-0 bg-background px-2 text-sm text-muted-foreground" /> */}
              Company Info below
            </span>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName" className="text-left">
                Name
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyDescription" className="text-left">
                Description
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
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreatingManager}>
                {isCreatingManager ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
