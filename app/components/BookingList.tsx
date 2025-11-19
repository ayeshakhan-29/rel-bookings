"use client";

import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import { Booking } from "../lib/firestore";
import { fetchBookings } from "../lib/firestore";

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchBookings();
      setBookings(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bookings.map((b) => (
        <BookingCard key={b.id} booking={b} />
      ))}
    </div>
  );
}
