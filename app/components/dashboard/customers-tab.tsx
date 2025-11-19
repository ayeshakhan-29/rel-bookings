"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone } from "lucide-react";
import { Booking } from "@/app/lib/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CustomersTabProps {
  bookings: Booking[];
}

export function CustomersTab({ bookings }: CustomersTabProps) {
  // Derive unique customers from bookings
  const customersMap = new Map();

  bookings.forEach((booking) => {
    if (booking.email && !customersMap.has(booking.email)) {
      customersMap.set(booking.email, {
        id: booking.email,
        name: booking.fullName,
        email: booking.email,
        phone: booking.phone,
        totalRides: 0,
        totalSpent: 0,
        lastRide: booking.createdAt,
      });
    }

    if (booking.email && customersMap.has(booking.email)) {
      const customer = customersMap.get(booking.email);
      customer.totalRides += 1;
      customer.totalSpent += booking.total || 0;
      // Update last ride if this one is newer
      if (
        booking.createdAt &&
        new Date(booking.createdAt as string) > new Date(customer.lastRide)
      ) {
        customer.lastRide = booking.createdAt;
      }
    }
  });

  const customers = Array.from(customersMap.values());

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Total Rides</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Ride</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`/placeholder-user.jpg`}
                        alt={customer.name}
                      />
                      <AvatarFallback>
                        {customer.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">
                      {customer.name || "Unknown"}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      {customer.phone || "N/A"}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer.totalRides}</TableCell>
                <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>
                  {customer.lastRide
                    ? new Date(customer.lastRide).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Active
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
