"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/services/firebase";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-5 shadow-md">
      <div>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="w-[150px] md:w-[200px]"
        />
      </div>
      <ul className="hidden md:flex gap-4 lg:gap-8 font-medium text-lg">
        <li className="hover:text-primary transition-all duration-300 cursor-pointer">
          Product
        </li>
        <li className="hover:text-primary transition-all duration-300 cursor-pointer">
          Pricing
        </li>
        <li className="hover:text-primary transition-all duration-300 cursor-pointer">
          Contact Us
        </li>
        <li className="hover:text-primary transition-all duration-300 cursor-pointer">
          About Us
        </li>
      </ul>
      <div className="flex gap-5">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10"
          onClick={() => signInWithGoogle()}
        >
          Login
        </Button>

        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
