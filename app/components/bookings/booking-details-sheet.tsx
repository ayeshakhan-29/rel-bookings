"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  User,
  Phone,
  Mail,
  Car,
  Eye,
} from "lucide-react";
import { BookingStatusBadge } from "./booking-status-badge";
import { Booking } from "@/app/lib/firestore";

interface BookingDetailsSheetProps {
  booking: Booking;
}

export function BookingDetailsSheet({ booking }: BookingDetailsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <SheetTitle className="text-xl">Booking Details</SheetTitle>
            <BookingStatusBadge status="completed" />
          </div>
          <SheetDescription className="text-sm text-muted-foreground">
            ID: {booking.id}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8">
          {/* Customer Info */}
          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              Customer
            </h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{booking.fullName || "N/A"}</p>
                  <p className="text-xs text-muted-foreground">Customer</p>
                </div>
              </div>
              <Separator className="bg-border/50" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{booking.email || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{booking.phone || "N/A"}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Trip Details */}
          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              Trip Route
            </h3>
            <div className="relative pl-4 border-l-2 border-muted space-y-8">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">
                    PICKUP
                  </p>
                  <p className="text-sm font-medium leading-snug">
                    {booking.pickupLocation || "N/A"}
                  </p>
                  {booking.pickupLocationCoords &&
                    booking.pickupLocationCoords.lat !== undefined && (
                      <p className="text-xs text-muted-foreground font-mono">
                        {booking.pickupLocationCoords.lat.toFixed(6)},{" "}
                        {booking.pickupLocationCoords.lng.toFixed(6)}
                      </p>
                    )}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary" />
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">
                    DROPOFF
                  </p>
                  <p className="text-sm font-medium leading-snug">
                    {booking.dropoffLocation || "N/A"}
                  </p>
                  {booking.dropoffLocationCoords &&
                    booking.dropoffLocationCoords.lat !== undefined && (
                      <p className="text-xs text-muted-foreground font-mono">
                        {booking.dropoffLocationCoords.lat.toFixed(6)},{" "}
                        {booking.dropoffLocationCoords.lng.toFixed(6)}
                      </p>
                    )}
                </div>
              </div>
            </div>
          </section>

          {/* Vehicle & Time */}
          <section className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Car className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">VEHICLE</span>
              </div>
              <p className="text-sm font-medium">
                {booking.vehicleType || "N/A"}
              </p>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">DATE</span>
              </div>
              <p className="text-sm font-medium">
                {booking.createdAt
                  ? new Date(booking.createdAt as string).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </section>

          {/* Payment Breakdown */}
          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              Payment Breakdown
            </h3>
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="p-4 space-y-3">
                {booking.totals?.breakdown &&
                  booking.totals.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-mono">
                        ${(item.amount || 0).toFixed(2)}
                      </span>
                    </div>
                  ))}

                {booking.totals && (
                  <>
                    <Separator className="my-2" />

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Gratuity</span>
                      <span className="font-mono">
                        $
                        {(
                          booking.totals.gratuity ||
                          booking.gratuity ||
                          0
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-mono">
                        ${(booking.totals.tax || booking.tax || 0).toFixed(2)}
                      </span>
                    </div>
                    {(booking.totals.ccFee || booking.ccFee) && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">CC Fee</span>
                        <span className="font-mono">
                          $
                          {(booking.totals.ccFee || booking.ccFee || 0).toFixed(
                            2
                          )}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="bg-muted/50 p-4 flex justify-between items-center border-t">
                <span className="font-medium">Total Charged</span>
                <span className="text-lg font-bold font-mono">
                  ${(booking.totals?.total || booking.total || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          {/* Additional Info */}
          {(booking.distance !== undefined ||
            booking.tripType ||
            booking.hours) && (
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                Trip Info
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {booking.distance !== undefined && (
                  <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      DISTANCE
                    </p>
                    <p className="text-sm font-medium">
                      {Number(booking.distance).toFixed(1)} mi
                    </p>
                  </div>
                )}
                {booking.tripType && (
                  <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      TRIP TYPE
                    </p>
                    <p className="text-sm font-medium">{booking.tripType}</p>
                  </div>
                )}
                {booking.hours && (
                  <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">HOURS</p>
                    <p className="text-sm font-medium">{booking.hours}</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
