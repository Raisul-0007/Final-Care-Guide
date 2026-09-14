"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, GraduationCap, BriefcaseMedical } from "lucide-react";
import { motion } from "framer-motion";
import { useDoctors } from "@/context/DoctorContext";
import Navbar from "@/components/Navber";
import Footer from "@/components/Footer";

export default function DoctorDetails() {
  
  const { id } = useParams();
  const { doctors } = useDoctors();

  const doctor = doctors.find(
    (item) => String(item.id) === String(id)
  );
  if (!doctor) {
    return (
      <>
        <Navbar/>

        <main className="flex min-h-[60vh] items-center justify-center bg-[#fffaf2] px-5">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Doctor Not Found
            </h1>

            <Link
              href="/doctors"
              className="mt-6 inline-flex rounded-full bg-[#FFA500] px-6 py-3 font-semibold text-white"
            >
              Back to Doctors
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#fffaf2]">
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

          <Link
            href="/doctors"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#FFA500]"
          >
            <ArrowLeft size={17} />
            Back to Doctors
          </Link>

          <div className="grid overflow-hidden rounded-4px bg-white shadow-xl lg:grid-cols-[400px_1fr]">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="min-h-112.5 bg-orange-50"
            >
              
              <img
                src={doctor?.image}
                alt={doctor.name}
                className="h-full w-full object-cover object-top"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="p-8 md:p-12"
            >
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-[#FFA500]">
                {doctor.department}
              </span>

              <h1 className="mt-6 text-4xl font-bold text-gray-900">
                {doctor.name}
              </h1>

              <p className="mt-2 text-lg font-medium text-[#FFA500]">
                {doctor.specialty}
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">

                <div className="flex gap-4 rounded-2xl bg-gray-50 p-5">
                  <GraduationCap className="text-[#FFA500]" />
                  <div>
                    <p className="text-xs text-gray-500">
                      Qualification
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {doctor.qualification}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl bg-gray-50 p-5">
                  <BriefcaseMedical className="text-[#FFA500]" />
                  <div>
                    <p className="text-xs text-gray-500">
                      Experience
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {doctor.experience} Years
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl bg-gray-50 p-5 sm:col-span-2">
                  <Clock className="text-[#FFA500]" />
                  <div>
                    <p className="text-xs text-gray-500">
                      Available Time
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {doctor.available}
                    </p>
                  </div>
                </div>

              </div>

              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900">
                  About Doctor
                </h2>

                <p className="mt-3 leading-8 text-gray-600">
                  {doctor.about}
                </p>
              </div>

              <Link
                href="/appointments"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFA500] px-7 py-4 font-semibold text-white shadow-lg shadow-orange-100 transition duration-300 hover:-translate-y-1 hover:bg-orange-500"
              >
                <CalendarDays size={19} />
                Book Appointment
              </Link>
            </motion.div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}