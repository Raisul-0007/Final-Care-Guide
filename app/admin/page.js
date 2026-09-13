"use client";

import Link from "next/link";
import {
  Stethoscope,
  Users,
  CalendarDays,
  Building2,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";

import AdminHeader from "@/components/AdminHeader";
import { useDoctors } from "@/context/DoctorContext";

export default function AdminDashboard() {
  const { doctors } = useDoctors();

  const stats = [
    {
      title: "Total Doctors",
      value: doctors.length,
      icon: Stethoscope,
      href: "/admin/doctors",
    },
    {
      title: "Total Patients",
      value: 350,
      icon: Users,
      href: "/admin/patients",
    },
    {
      title: "Appointments",
      value: 128,
      icon: CalendarDays,
      href: "/admin/appointments",
    },
    {
      title: "Departments",
      value: 6,
      icon: Building2,
      href: "/departments",
    },
  ];

  return (
    <>
      <AdminHeader />

      <main className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-medium text-[#FFA500]">
              ADMIN DASHBOARD
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Dashboard Overview
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your hospital information from one place.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={stat.href}
                    className="group block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#FFA500]">
                        <Icon size={23} />
                      </div>

                      <ArrowUpRight
                        size={19}
                        className="text-gray-300 transition group-hover:text-[#FFA500]"
                      />
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-1 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </h2>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">

            <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Doctors
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Recently added medical professionals
                  </p>
                </div>

                <Link
                  href="/admin/doctors"
                  className="text-sm font-semibold text-[#FFA500]"
                >
                  View All
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {doctors.slice(-4).reverse().map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {doctor.department}
                      </p>
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#FFA500] p-7 text-white shadow-xl shadow-orange-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <Plus size={25} />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Add a New Doctor
              </h2>

              <p className="mt-3 leading-7 text-white/80">
                Add a new medical professional to your hospital doctor
                directory.
              </p>

              <Link
                href="/admin/doctors"
                className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#FFA500] transition hover:-translate-y-1"
              >
                Manage Doctors
              </Link>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}