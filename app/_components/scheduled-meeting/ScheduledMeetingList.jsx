import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Clock, Timer } from "lucide-react";
import Link from "next/link";

function ScheduledMeetingList({ meetingList }) {
  return (
    <div>
      {meetingList &&
        meetingList.map((meeting, index) => (
          <Accordion type="single" collapsible key={index}>
            <AccordionItem value="item-1">
              <AccordionTrigger>{meeting?.formatedDate}</AccordionTrigger>
              <AccordionContent>
                <div>
                  <div className="mt-5 flex flex-col gap-4">
                    <h2 className="flex gap-2 items-center">
                      <Clock />
                      {meeting?.duration} Min
                    </h2>
                    <h2 className="flex gap-2 items-center">
                      <CalendarCheck />
                      {meeting.formatedDate}
                    </h2>
                    <h2 className="flex gap-2 items-center">
                      <Timer />
                      {meeting.selectedTime}
                    </h2>

                    <Link
                      href={  meeting?.locationUrl ? 'https://' + meeting?.locationUrl : "#"}
                      className="text-primary"
                    >
                      {meeting?.locationUrl}
                    </Link>
                  </div>
                  <Link href={meeting?.locationUrl}>
                    <Button className="mt-5">Join Now</Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
}

export default ScheduledMeetingList;
