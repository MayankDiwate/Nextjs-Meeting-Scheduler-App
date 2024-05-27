import { Briefcase, Calendar, Clock, Settings } from "lucide-react";

export default [
  {
    id: 1,
    name: "Meeting Type",
    path: "/dashboard",
    icon: Briefcase,
  },
  {
    id: 2,
    name: "Scheduled Meeting",
    path: "/dashboard/scheduled-meeting",
    icon: Calendar,
  },
  {
    id: 3,
    name: "Availability",
    path: "/dashboard/availability",
    icon: Clock,
  },
];
