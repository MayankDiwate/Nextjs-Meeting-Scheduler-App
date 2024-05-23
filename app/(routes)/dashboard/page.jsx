"use client";

import MeetingEventList from "@/app/_components/meeting-type/MeetingEventList";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const isBusinessRegistered = async () => {
    const docRef = doc(db, "Business", user?.uid);
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
    <div className="p-5">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-3xl">Meeting Event Type</h2>
        <Input placeholder="Search" className="max-w-xs " />
        <hr></hr>
      </div>
      <MeetingEventList />
    </div>
  );
};

export default Dashboard;
