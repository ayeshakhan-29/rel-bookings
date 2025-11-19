"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchBookings, Booking } from "@/app/lib/firestore";
import { Loader2 } from "lucide-react";
import { BookingsTab } from "./bookings-tab";
import { CustomersTab } from "./customers-tab";
import { OverviewTab } from "./overview-tab";

export function DashboardShell() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <OverviewTab bookings={bookings} />
      </TabsContent>
      <TabsContent value="bookings" className="space-y-4">
        <BookingsTab bookings={bookings} />
      </TabsContent>
      <TabsContent value="customers" className="space-y-4">
        <CustomersTab bookings={bookings} />
      </TabsContent>
    </Tabs>
  );
}
