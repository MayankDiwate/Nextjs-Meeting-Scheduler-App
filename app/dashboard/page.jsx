"use client";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, []);

  return <div>{user.displayName}</div>;
};

export default Dashboard;
