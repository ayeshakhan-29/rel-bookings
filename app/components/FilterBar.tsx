// components/FilterBar.tsx
"use client";

import { useState } from "react";

export default function FilterBar({
  onFilter,
}: {
  onFilter: (opts: any) => void;
}) {
  const [vehicleType, setVehicleType] = useState("");
  const [search, setSearch] = useState("");

  const handleApply = () => {
    onFilter({ vehicleType, search });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      />
      <select
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        className="w-full sm:w-1/4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      >
        <option value="">All Vehicles</option>
        <option value="Business Sedan">Business Sedan</option>
        <option value="Economy Sedan">Economy Sedan</option>
        {/* add more */}
      </select>
      <button
        onClick={handleApply}
        className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        Apply
      </button>
    </div>
  );
}
