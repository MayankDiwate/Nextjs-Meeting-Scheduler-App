import AvatarMenu from "@/app/_components/AvatarMenu";
import SideNavBar from "@/app/_components/dashbaord/SideNavBar";
import { Toaster } from "@/components/ui/sonner";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="hidden md:block md:w-64 bg-slate-50 h-screen fixed">
        <SideNavBar />
      </div>
      <div className="md:ml-64">
        <AvatarMenu />
        <Toaster />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
