import { Metadata } from "next";
import { DashboardShell } from "./components/dashboard/dashboard-shell";
import { MainNav } from "./components/main-nav";
import { UserNav } from "./components/user-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Booking management dashboard",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background dark">
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <div className="mr-4 hidden md:flex">
            <div className="h-6 w-6 rounded-full bg-primary mr-2" />
            <span className="font-bold">RideAdmin</span>
          </div>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <DashboardShell />
      </div>
    </div>
  );
}
