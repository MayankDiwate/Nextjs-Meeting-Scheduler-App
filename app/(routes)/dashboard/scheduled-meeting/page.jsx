"use client";
import ScheduledMeetingList from "@/app/_components/scheduled-meeting/ScheduledMeetingList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth, db } from "@/services/firebase";
import { format } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function ScheduledMeeting() {
  const [user] = useAuthState(auth);
  const [meetingList, setMeetingList] = useState([]);
  useEffect(() => {
    user && getScheduledMeetings();
  }, [user]);
  const getScheduledMeetings = async () => {
    setMeetingList([]);
    const q = query(
      collection(db, "ScheduledMeetings"),
      where("businessEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setMeetingList((prev) => [...prev, doc.data()]);
    });
  };

  const filterMeetingList = (type) => {
    if (type == "upcoming") {
      return meetingList.filter(
        (item) => item.formatedTimeStamp >= format(new Date(), "t")
      );
    } else {
      return meetingList.filter(
        (item) => item.formatedTimeStamp < format(new Date(), "t")
      );
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Scheduled Meetings</h2>
      <hr className="my-5"></hr>
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ScheduledMeetingList meetingList={filterMeetingList("upcoming")} />{" "}
        </TabsContent>
        <TabsContent value="expired">
          <ScheduledMeetingList meetingList={filterMeetingList("expired")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ScheduledMeeting;
