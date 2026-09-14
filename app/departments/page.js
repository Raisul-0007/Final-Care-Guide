"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { departmentsData } from "@/data/departments";
import Navbar from "@/components/Navber";

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-[#fff8ed] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">

          <p className="mb-3 font-semibold uppercase tracking-widest text-[#ffa500]">
            Our Departments
          </p>

          <h1 className="text-4xl font-bold text-[#17202a] md:text-5xl">
            Specialized Healthcare Departments
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore our specialized departments and
            find the right healthcare service for you.
          </p>

        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departmentsData.map(
              (department, index) => (
                <motion.div
                  key={department.id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-md transition duration-300 hover:-translate-y-2 hover:border-[#ffa500]/30 hover:shadow-xl"
                >

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1d6] text-3xl transition group-hover:scale-110">
                    <department.icon size={30} strokeWidth={1.8} />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-[#17202a]">
                    {department.name}
                  </h2>

                  <p className="mt-3 leading-7 text-gray-600">
                    {department.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                    <Users size={17} className="text-[#ffa500]" />

                    {department.doctors} Expert Doctors
                  </div>

                  <Link
                    href={`/doctors?department=${encodeURIComponent(
                      department.name
                    )}`}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-[#ffa500] transition group-hover:gap-3"
                  >
                    Find Doctors
                    <ArrowRight size={18} />
                  </Link>

                </motion.div>
              )
            )}
          </div>

        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#ffa500] px-6 py-12 text-center text-white md:px-10">

          <h2 className="text-3xl font-bold md:text-4xl">
            Need Help Finding the Right Doctor?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Browse our doctors and find a specialist
            according to your healthcare needs.
          </p>

          <Link
            href="/doctors"
            className="mt-7 inline-block rounded-xl bg-white px-7 py-3 font-bold text-[#ffa500] transition hover:scale-105"
          >
            Browse Doctors
          </Link>

        </div>
      </section>

    </main>
  );
}