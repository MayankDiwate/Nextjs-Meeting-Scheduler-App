"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/services/firebase";
import DaysList from "@/utils/DaysList";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

function Availability() {
    const router = useRouter();
  const [availableDays, setAvailableDays] = useState(
    { Sunday: false },
    { Monday: false },
    { Tuesday: false },
    { Wendsday: false },
    { Thursday: false },
    { Friday: false },
    { Saturday: false }
  );
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [user] = useAuthState(auth);

  useEffect(() => {
    user && getBusinessInfo();
  }, [user]);
  const getBusinessInfo = async () => {
    const docRef = doc(db, "Business", user.email);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    setAvailableDays(result.availableDays);
    setStartTime(result.startTime);
    setEndTime(result.endTime);
  };

  const onHandleChange = (day, value) => {
    setAvailableDays({
      ...availableDays,
      [day]: value,
    });
  };

  const handleSave = async () => {
    const docRef = doc(db, "Business", user?.uid);
    await updateDoc(docRef, {
      availableDays: availableDays,
      startTime: startTime,
      endTime: endTime,
    }).then((resp) => {
        toast("Change Updated !");
        router.replace('/dashboard')
    });
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7"></hr>
      <div>
        <h2 className="font-bold">Availability Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
          {DaysList &&
            DaysList.map((item, index) => (
              <div key={index}>
                <h2>
                  <Checkbox
                    checked={
                      availableDays && availableDays[item?.day]
                        ? availableDays[item?.day]
                        : false
                    }
                    onCheckedChange={(e) => onHandleChange(item.day, e)}
                  />{" "}
                  {item.day}
                </h2>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mt-10">Availability Time</h2>
        <div className="flex gap-10">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input
              type="time"
              defaultValue={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h2>End Time</h2>
            <Input
              type="time"
              defaultValue={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button className="mt-10" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

export default Availability;
