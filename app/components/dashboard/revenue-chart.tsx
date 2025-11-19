"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Booking } from "@/app/lib/firestore";

interface RevenueChartProps {
  bookings: Booking[];
}

export function RevenueChart({ bookings }: RevenueChartProps) {
  // Group bookings by month
  const monthlyData = bookings.reduce((acc, booking) => {
    if (!booking.createdAt) return acc;

    const date = new Date(booking.createdAt as string);
    const monthKey = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    if (!acc[monthKey]) {
      acc[monthKey] = { name: monthKey, total: 0 };
    }

    acc[monthKey].total += booking.total || 0;

    return acc;
  }, {} as Record<string, { name: string; total: number }>);

  const chartData = Object.values(monthlyData).slice(-6); // Last 6 months

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Revenue
                      </span>
                      <span className="font-bold text-muted-foreground">
                        ${payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
