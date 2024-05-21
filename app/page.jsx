'use client';

import { auth } from "@/services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      )}
    </div>
  );
}
