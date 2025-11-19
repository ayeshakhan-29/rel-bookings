"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";
import { Booking } from "@/app/lib/firestore";
import { BookingDetailsSheet } from "../bookings/booking-details-sheet";
import { BookingStatusBadge } from "../bookings/booking-status-badge";

interface BookingsTabProps {
  bookings: Booking[];
}

export function BookingsTab({ bookings }: BookingsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  // const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const filteredBookings = bookings.filter(
    (booking) =>
      (booking.fullName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (booking.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id} className="hover:bg-muted/50">
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {booking.id.slice(0, 8)}...
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {booking.fullName || "Unknown"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {booking.email || "No email"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col max-w-[200px]">
                    <span
                      className="truncate text-xs font-medium"
                      title={booking.pickupLocation}
                    >
                      From: {booking.pickupLocation?.split(",")[0] || "N/A"}
                    </span>
                    <span
                      className="truncate text-xs text-muted-foreground"
                      title={booking.dropoffLocation}
                    >
                      To: {booking.dropoffLocation?.split(",")[0] || "N/A"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {booking.createdAt
                    ? new Date(booking.createdAt as string).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <BookingStatusBadge status="completed" />
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${(booking.total || 0).toFixed(2)}
                </TableCell>
                <TableCell>
                  <BookingDetailsSheet booking={booking} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
