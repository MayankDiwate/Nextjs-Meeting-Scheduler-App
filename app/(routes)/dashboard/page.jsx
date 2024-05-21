"use client";

import { Button } from "@/components/ui/button";
import { auth, db, logout } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const isBusinessRegistered = async () => {
    const docRef = doc(db, "Business", user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      toast.success("Document data:", docSnap.data());
    } else {
      toast.error("No such document!");
      router.replace("/create-business");
    }
  };

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    } else {
      isBusinessRegistered();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Welcome {user?.displayName}</h1>
      <Image
        src={user?.photoURL}
        width={100}
        height={100}
        className="h-10 w-10 object-cover rounded-full"
        alt="profile"
      />
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default Dashboard;
