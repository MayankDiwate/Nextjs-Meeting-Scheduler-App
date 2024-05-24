"use client";

import MeetingTimeDateSelection from "@/app/_components/meeting-date-time/MeetingTimeDateSelection";
import { db } from "@/services/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const SharedMeetingEvent = ({ params }) => {
  const [meetingInfo, setMeetingInfo] = useState();
  const [businessInfo, setBusinessInfo] = useState();
  const [loading, setLoading] = useState(false);
  const { business, meeting } = params;

  const getMeetingInfo = async () => {
    setLoading(true);
    const q = query(
      collection(db, "Business"),
      where("businessName", "==", business)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessInfo(doc.data());
    });

    const docRef = doc(db, "MeetingEvent", meeting);
    const docSnap = await getDoc(docRef);
    setMeetingInfo(docSnap.data());
    setLoading(false);
  };

  useEffect(() => {
    meeting && business && getMeetingInfo();
  }, [meeting, business]);

  return (
    <div>
      <MeetingTimeDateSelection
        meetingInfo={meetingInfo}
        businessInfo={businessInfo}
      />
    </div>
  );
};

export default SharedMeetingEvent;
