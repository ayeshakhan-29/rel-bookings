"use client";

import { Booking } from "../lib/firestore";

export default function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {booking.fullName}
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {booking.email}
      </p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        📞 {booking.phone}
      </p>

      <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <strong>Pickup:</strong> {booking.pickupLocation}
        </div>
        <div>
          <strong>Drop-off:</strong> {booking.dropoffLocation}
        </div>
      </div>

      <div className="mt-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <strong>Vehicle:</strong> {booking.vehicleType || "—"}
        </div>
        <div>
          <strong>Distance:</strong> {booking.distance ?? 0} mi
        </div>
        <div>
          <strong>Total:</strong>{" "}
          {booking.total != null
            ? `$${Number(booking.total).toFixed(2)}`
            : "N/A"}
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
        Created:{" "}
        {booking.createdAt
          ? new Date(booking.createdAt).toLocaleString()
          : "Unknown"}
      </p>
    </div>
  );
}
