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
import { useIdentitiesContext } from "@/contexts/IdentitiesContext";
import { useState } from "react";

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
  const { managerIdentity } = useIdentitiesContext();

  const [isIdentityExpanded, setIsIdentityExpanded] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-500 text-white">
            Verified
          </Badge>
        );
      case "not initiated":
        return (
          <Badge variant="outline" className="bg-gray-500 text-white">
            Not Initiated
          </Badge>
        );
      case "initiated":
        return (
          <Badge variant="outline" className="bg-blue-500 text-white">
            Initiated
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {!isIdentityExpanded && (
          <>
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
              <span className="text-xs font-medium italic text-muted-foreground">
                Joined:{" "}
                {moment(manager.createdAt).format("Do of MMM, YYYY | hh:mm a")}
              </span>
            </div>
          </>
        )}

        <div className="bg-muted/40 rounded-md p-4 mb-4">
          <div className="flex flex-row items-center justify-between mb-4">
            <h4 className="font-semibold text-lg">
              Identities ({managerIdentity?.count})
            </h4>
            <span onClick={() => setIsIdentityExpanded(!isIdentityExpanded)}>Expand</span>
          </div>
          <div className={`max-h-[140px] overflow-y-auto ${isIdentityExpanded ? "!max-h-auto" : ""} transition-all duration-300`}>
            {managerIdentity?.identities?.map((identity, index) => (
              //   <div key={index} className="grid grid-cols-2 gap-2 mb-2">
              //     <div className="text-sm font-medium">Identity {index + 1}:</div>
              //     <div className="text-sm">{"identity email"}</div>
              //   </div>
              <div
                key={index}
                className="bg-muted border border-muted-foreground/50 rounded-md p-4 py-3 mb-4"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Type:</div>
                  <div className="captalize">{identity.identityType}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Identity:</div>
                  <div>{identity.identity}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Status:</div>
                  {getStatusBadge(identity.verificationStatus)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Joined Date</div>
            <div>
              {moment(manager.createdAt).format("Do of MMM, YYYY | hh:mm a")}
            </div>
          </div>
        </div> */}
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
