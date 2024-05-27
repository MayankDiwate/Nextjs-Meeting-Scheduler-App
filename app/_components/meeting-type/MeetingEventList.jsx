"use client";
import { Button } from "@/components/ui/button";
import { app, auth } from "@/services/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Clock, Copy, MapPin, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

function MeetingEventList() {
  const db = getFirestore(app);
  const [user] = useAuthState(auth);
  const [businessInfo, setBusinessInfo] = useState();
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    user && getEventList();
    user && BusinessInfo();
  }, [user]);
  const getEventList = async () => {
    setEventList([]);
    const q = query(
      collection(db, "MeetingEvent"),
      where("createdBy", "==", user?.email),
      orderBy("id", "desc")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setEventList((prevEvent) => [...prevEvent, doc.data()]);
    });
  };

  const BusinessInfo = async () => {
    const docRef = doc(db, "Business", user?.uid);
    const docSnap = await getDoc(docRef);
    setBusinessInfo(docSnap.data());
  };

  const onDeleteMeetingEvent = async (event) => {
    await deleteDoc(doc(db, "MeetingEvent", event?.id)).then((resp) => {
      toast("Meeting Event Deleted!");
      getEventList();
    });
  };

  const onCopyClickHandler = (event) => {
    const meetingEventUrl =
      window.location.origin +
      "/" +
      businessInfo?.businessName +
      "/" +
      event.id;
    navigator.clipboard.writeText(meetingEventUrl);
    toast("Copied to Clicpboard");
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {eventList && eventList.length > 0 ? (
        eventList?.map((event, index) => (
          <div
            key={index}
            className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3"
            style={{ borderTopColor: event?.themeColor }}
          >
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-xl">{event?.eventName}</h2>
              <Trash
                size={18}
                onClick={() => onDeleteMeetingEvent(event)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between">
              <h2 className="flex gap-2 text-gray-500">
                <Clock /> {event.duration} Min
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <MapPin /> {event.locationType}
              </h2>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <h2
                className="flex gap-2 text-sm text-primary 
                    items-center cursor-pointer"
                onClick={() => {
                  onCopyClickHandler(event);
                }}
              >
                <Copy className="h-4 w-4" /> Copy Link
              </h2>
              <Button
                variant="outline"
                className="rounded-full text-primary border-primary "
              >
                Share
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-full">
          No meetings added yet.
        </div>
      )}
    </div>
  );
}

export default MeetingEventList;
