"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, logout } from "@/services/firebase";
import { LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

function AvatarMenu() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    user && (
      <div className="p-4">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center float-right">
              <Image
                src={user?.photoURL}
                alt="logo"
                width={30}
                height={30}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[10rem]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex gap-2 justify-start w-full"
                  onClick={() => router.replace("/profile")}
                >
                  <User size={20} />
                  Profile
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex gap-2 justify-start w-full"
                  onClick={() => router.replace("/settings")}
                >
                  <Settings size={20} />
                  Settings
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex gap-2 justify-start w-full"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  );
}

export default AvatarMenu;
