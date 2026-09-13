"use client";

import Link from "next/link";
import { ArrowUpRight, BriefcaseMedical } from "lucide-react";
import { motion } from "framer-motion";

export default function DoctorCard({ doctor, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow duration-500 hover:shadow-2xl"
    >
      <div className="relative h-72 overflow-hidden bg-orange-50">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#FFA500] shadow">
          {doctor.department}
        </div>

        <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-3 py-2 backdrop-blur">
          <p className="text-xs text-gray-500">Experience</p>
          <p className="font-bold text-gray-900">
            {doctor.experience} Years
          </p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm font-medium text-[#FFA500]">
          {doctor.specialty}
        </p>

        <h3 className="mt-2 text-xl font-bold text-gray-900">
          {doctor.name}
        </h3>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <BriefcaseMedical size={16} />
          {doctor.qualification}
        </div>

        <Link
          href={`/doctors/${doctor.id}`}
          className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5 font-semibold text-gray-700 transition hover:text-[#FFA500]"
        >
          View Profile

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-[#FFA500] transition group-hover:bg-[#FFA500] group-hover:text-white">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}