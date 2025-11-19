// components/KpiCards.tsx
export default function KpiCards() {
  // For now hard-coded values — replace with real queries later
  const stats = [
    { label: "Bookings this Month", value: 24 },
    { label: "Total Bookings", value: 128 },
    { label: "Revenue", value: "$12,450" },
    { label: "Vehicles Used", value: 8 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition"
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {s.label}
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}
