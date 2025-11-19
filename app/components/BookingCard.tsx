"use client";

import { Booking } from "../lib/firestore";

export default function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-gray-900">
        {booking.fullName}
      </h2>
      <p className="text-sm text-gray-500">{booking.email}</p>
      <p className="text-sm">📞 {booking.phone}</p>
      <div className="text-sm mt-2">
        <strong>Pickup:</strong> {booking.pickupLocation}
        <br />
        <strong>Dropoff:</strong> {booking.dropoffLocation}
      </div>
      <div className="text-sm mt-2">
        <strong>Vehicle:</strong> {booking.vehicleType || "N/A"} <br />
        <strong>Distance:</strong> {booking.distance ?? 0} mi <br />
        <strong>Total:</strong>{" "}
        {booking.total ? `$${Number(booking.total).toFixed(2)}` : "N/A"}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Created:{" "}
        {booking.createdAt
          ? new Date(booking.createdAt).toLocaleString()
          : "Unknown"}
      </p>
    </div>
  );
}
