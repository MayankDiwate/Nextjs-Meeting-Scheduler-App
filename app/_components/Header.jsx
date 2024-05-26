"use client";

import { Button } from "@/components/ui/button";
import { auth, signInWithGoogle } from "@/services/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import AvatarMenu from "./AvatarMenu";

const Header = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle().then((_) => {
      router.push("/dashboard");
    });
  };

  return (
    <div className="flex items-center justify-between p-5 max-w-7xl mx-auto">
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
      <div className="flex items-center gap-3">
        {!user &&
          <Button
          variant="ghost"
          size="icon"
          className="w-14 h-10"
            onClick={handleSignInWithGoogle}
          >
            Login
          </Button>
        }

        {user ? (
          <AvatarMenu />
        ) : (
          <Button onClick={handleSignInWithGoogle}>Get Started</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
