import { Booking } from "@/app/lib/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Car, Activity } from "lucide-react";
import { RevenueChart } from "./revenue-chart";

interface OverviewTabProps {
  bookings: Booking[];
}

export function OverviewTab({ bookings }: OverviewTabProps) {
  // Calculate metrics
  const totalRevenue = bookings.reduce(
    (acc, curr) => acc + (curr.total || 0),
    0
  );
  const totalRides = bookings.length;
  // Assuming active rides logic needs to be adjusted based on available data
  // For now, we'll just show a placeholder or derive if possible.
  // Since we don't have status in the interface, we'll assume all are completed or just show total.
  const activeRides = 0;
  const totalDistance = bookings.reduce(
    (acc, curr) => acc + (curr.distance || 0),
    0
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Based on {bookings.length} bookings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRides}</div>
            <p className="text-xs text-muted-foreground">
              Total bookings recorded
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Distance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRides > 0 ? (totalDistance / totalRides).toFixed(1) : 0} mi
            </div>
            <p className="text-xs text-muted-foreground">Per ride average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Distance
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalDistance.toFixed(1)} mi
            </div>
            <p className="text-xs text-muted-foreground">Total miles covered</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart bookings={bookings} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {booking.fullName || "Unknown User"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.pickupLocation?.split(",")[0] || "Unknown"}{" "}
                      &rarr;{" "}
                      {booking.dropoffLocation?.split(",")[0] || "Unknown"}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    +${(booking.total || 0).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
