"use client";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSignOut } from "@/hooks/queries/auth";

export default function UserMenu() {
  const router = useRouter();
  const { mutate } = useSignOut();
  return (
    <div className="mt-auto flex flex-col items-center gap-4 py-5">
      <Button
        onClick={() => router.push("/admin/users/self/update")}
        size={"icon"}
        variant={"ghost"}
      >
        <Settings className="w-5 h-5 text-muted-foreground" />
      </Button>
      <Button
        onClick={async () =>
          mutate(undefined, { onSettled: () => router.push("/auth/sign-in") })
        }
        size={"icon"}
        variant={"ghost"}
      >
        <LogOut className="w-5 h-5 text-muted-foreground" />
      </Button>
    </div>
  );
}
