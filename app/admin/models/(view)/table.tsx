"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import UserAvatar from "@/components/user/user-avatar";
import { ModelProfile } from "@/db/schemas/models";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function UserTable({ models }: { models: ModelProfile[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <span className="sr-only">Profile Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.length > 0 ? (
          models.map((model) => (
            <TableRow key={model.id}>
              <TableCell>
                <UserAvatar
                  user={{
                    name: model.name,
                    image: model.profileImage
                      ? { id: model.profileImage.fileId }
                      : null,
                  }}
                />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {model.name}
              </TableCell>
              <TableCell className="font-medium">{model.gender}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Edit</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <Link
                            href={`/admin/models/update/${model.id}/general`}
                          >
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                          </Link>
                          <Link
                            href={`/admin/models/update/${model.id}/images`}
                          >
                            <DropdownMenuItem>Images</DropdownMenuItem>
                          </Link>
                          <Link
                            href={`/admin/models/update/${model.id}/experiences`}
                          >
                            <DropdownMenuItem>Experiences</DropdownMenuItem>
                          </Link>
                          <Link
                            href={`/admin/models/update/${model.id}/settings`}
                          >
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                          </Link>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Blocks</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <Link href={`/admin/models/${model.id}/blocks/add`}>
                            <DropdownMenuItem>Add Block</DropdownMenuItem>
                          </Link>
                          <Link href={`/admin/models/${model.id}/blocks`}>
                            <DropdownMenuItem>View Blocks</DropdownMenuItem>
                          </Link>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              className="py-4 text-center text-muted-foreground"
              colSpan={4}
            >
              No Results
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
