"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { useManagerContext } from "@/contexts/ManagerContext";
import moment from "moment";

export function ManagersTable() {
  const {
    managers,
    filteredManagers,
    setSelectedManager,
    setIsUpdateModalOpen,
    setIsViewModalOpen,
    setIsDeleteModalOpen
  } = useManagerContext();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {/* <TableHead>Work ID</TableHead> */}
            <TableHead>Full name</TableHead>
            <TableHead>Company name</TableHead>
            <TableHead>Joined at</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(filteredManagers || managers).map((manager) => (
            <TableRow key={manager.id}>
              {/* <TableCell className="font-medium">{`${manager.id.slice(0, 15)}...`}</TableCell> */}
              <TableCell>{manager.fullName}</TableCell>
              <TableCell>{manager.companyName}</TableCell>
              <TableCell>
                {moment(manager.createdAt).format("Do of MMM, YYYY | hh:mm a")}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedManager(manager);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedManager(manager);
                        setIsUpdateModalOpen(true);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => {
                        setSelectedManager(manager);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
