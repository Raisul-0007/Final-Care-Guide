"use client";

export default function DoctorFilter({
  department,
  setDepartment,
  experience,
  setExperience,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="h-14 rounded-2xl border border-gray-200 bg-white px-5 text-sm text-gray-600 outline-none transition focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
      >
        <option value="All">All Departments</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Neurology">Neurology</option>
        <option value="Gynecology">Gynecology</option>
        <option value="Orthopedics">Orthopedics</option>
        <option value="Medicine">Medicine</option>
        <option value="Dermatology">Dermatology</option>
      </select>

      <select
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="h-14 rounded-2xl border border-gray-200 bg-white px-5 text-sm text-gray-600 outline-none transition focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
      >
        <option value="All">All Experience</option>
        <option value="5">5+ Years</option>
        <option value="10">10+ Years</option>
        <option value="15">15+ Years</option>
      </select>
    </div>
  );
}