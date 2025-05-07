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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Manager } from "@/models/IManager";
import moment from "moment";

interface ViewManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  manager: Manager;
}

export function ViewManagerModal({
  isOpen,
  onClose,
  manager,
}: ViewManagerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manager Profile</DialogTitle>
          <DialogDescription>
            Detailed information about the user.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={`/placeholder.svg?height=96&width=96`}
              alt={manager.fullName}
            />
            <AvatarFallback className="text-2xl">
              {manager.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-xl font-bold">{manager.fullName}</h3>
            <p className="text-muted-foreground">{manager.companyName}</p>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Joined Date</div>
            <div>
              {moment(manager.createdAt).format("Do of MMM, YYYY | hh:mm a")}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
