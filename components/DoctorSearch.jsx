"use client";

import { Search } from "lucide-react";

export default function DoctorSearch({ value, onChange }) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search doctor by name..."
        className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-5 text-sm outline-none transition focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
      />
    </div>
  );
}