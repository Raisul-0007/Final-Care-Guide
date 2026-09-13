"use client";

import { useMemo, useState } from "react";
import { Search, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { usePatients } from "@/context/PatientContext";
import Navbar from "@/components/Navber";

export default function PatientsPage() {
  const { patients } = usePatients();

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        patient.phone.includes(search);

      const matchesGender =
        gender === "All" || patient.gender === gender;

      return matchesSearch && matchesGender;
    });
  }, [patients, search, gender]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar/>
      {/* Header */}
      <section className="bg-[#fff8ed] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-[#ffa500]">
            Patients
          </p>

          <h1 className="text-4xl font-bold text-[#17202a] md:text-5xl">
            Our Patients
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Patient information and hospital records.
          </p>
        </div>
      </section>

      {/* Patient List */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">

          {/* Search */}
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
              />
            </div>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#ffa500]"
            >
              <option value="All">All Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <p className="mb-6 text-gray-600">
            Total Patients:{" "}
            <span className="font-bold text-[#ffa500]">
              {filteredPatients.length}
            </span>
          </p>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1d6] text-[#ffa500]">
                    <UserRound size={28} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#17202a]">
                      {patient.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Patient ID: #{patient.id}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <p>
                    <strong>Age:</strong> {patient.age}
                  </p>

                  <p>
                    <strong>Gender:</strong> {patient.gender}
                  </p>

                  <p>
                    <strong>Blood Group:</strong>{" "}
                    <span className="font-semibold text-[#ffa500]">
                      {patient.bloodGroup}
                    </span>
                  </p>

                  <p>
                    <strong>Phone:</strong> {patient.phone}
                  </p>

                  <p>
                    <strong>Address:</strong> {patient.address}
                  </p>
                </div>

                <span className="mt-5 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                  {patient.status}
                </span>
              </motion.div>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="py-20 text-center">
              <h3 className="text-xl font-bold">
                No Patient Found
              </h3>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}