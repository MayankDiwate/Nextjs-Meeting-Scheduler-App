"use client";

import { auth, db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const isBusinessRegistered = async () => {
    const docRef = doc(db, "Business", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) router.replace("/create-business");
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

  return (
    <div>
      <h1>Meeting Type</h1>
    </div>
  );
};

export default Dashboard;
