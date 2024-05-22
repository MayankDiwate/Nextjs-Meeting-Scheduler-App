"use client";
import MeetingForm from "@/app/_components/create-meeting/MeetingForm";
import PreviewMeeting from "@/app/_components/create-meeting/PreviewMeeting";
import { useState } from "react";

function CreateMeeting() {
  const [formValue, setFormValue] = useState({
    duration: 30,
    date: new Date(),
    time: "8:00 AM",
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      {/* Meeting Form  */}
      <div className="shadow-md border h-screen">
        <MeetingForm
          formValue={formValue}
          setFormValue={(v) => setFormValue(v)}
        />
      </div>

      {/* Preview  */}
      <div className="md:col-span-2">
        <PreviewMeeting
          formValue={formValue}
          setFormValue={(v) => setFormValue(v)}
        />
      </div>
    </div>
  );
}

export default CreateMeeting;
