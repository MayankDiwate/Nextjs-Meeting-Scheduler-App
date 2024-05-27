"use client";
import { Button } from "@/components/ui/button";
import SideBarMenuOptions from "@/utils/SideBarMenuOptions";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function SideNavBar() {
  const path = usePathname();
  const [activePath, setActivePath] = useState(path);

  useEffect(() => {
    path && setActivePath(path);
  }, [path]);
  return (
    <div className="p-5 py-8">
      <div className="flex justify-center">
        <Link href={"/dashboard"}>
          <Image src="/logo.svg" width={150} height={150} alt="logo" />
        </Link>
      </div>

      <Link href={"/create-meeting"}>
        <Button
          className="flex gap-2 w-full 
                mt-7
                rounded-full"
        >
          <Plus /> Create
        </Button>
      </Link>

      <div className="mt-5 flex flex-col gap-5">
        {SideBarMenuOptions.map((item, index) => (
          <Link href={item.path} key={index}>
            <Button
              variant="ghost"
              className={`w-full flex gap-2 justify-start hover:bg-blue-100 hover:text-primary font-normal text-lg
                        ${activePath == item.path && "text-primary bg-blue-100"}
                        `}
            >
              <item.icon /> {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNavBar;
