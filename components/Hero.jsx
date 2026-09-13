"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf2]">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FFA500]/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-100 blur-3xl" />

      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#FFA500] shadow-sm">
            <ShieldCheck size={17} />
            Trusted Healthcare Since 1998
          </div>

          <h2 className="max-w-2xl text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
            Your Health Is Our
            <span className="text-[#FFA500]"> Priority.</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Quality healthcare with experienced doctors, modern technology,
            and compassionate care. We are here for you and your family.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/appointments"
              className="flex items-center gap-2 rounded-full bg-[#FFA500] px-7 py-4 font-semibold text-white shadow-lg shadow-orange-200 transition duration-300 hover:-translate-y-1 hover:bg-orange-500"
            >
              Book Appointment
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/doctors"
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-4 font-semibold text-gray-700 transition duration-300 hover:-translate-y-1 hover:border-[#FFA500] hover:text-[#FFA500]"
            >
              <PlayCircle size={18} />
              Find a Doctor
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">25+</h3>
              <p className="text-sm text-gray-500">Years Experience</p>
            </div>

            <div className="h-10 w-px bg-gray-200" />

            <div>
              <h3 className="text-2xl font-bold text-gray-900">50+</h3>
              <p className="text-sm text-gray-500">Expert Doctors</p>
            </div>

            <div className="h-10 w-px bg-gray-200" />

            <div>
              <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
              <p className="text-sm text-gray-500">Emergency Care</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-[3rem] bg-[#FFA500]/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#FFA500] p-3 shadow-2xl">
            <div className="flex min-h-[480px] items-end rounded-[2rem] bg-[linear-gradient(to_right,rgba(0,0,0,0.4),rgba(0,0,0,0.1)),url('/ban.jpg')] bg-cover bg-center p-8">
              <div className="rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur">
                <p className="text-sm font-medium text-[#FFA500]">
                  Emergency Service
                </p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  We're here 24/7
                </h3>
                <p className="mt-2 text-gray-500">
                  Immediate medical assistance whenever you need it.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -left-5 top-16 rounded-2xl bg-white p-4 shadow-xl"
          >
            <p className="text-xs text-gray-500">Patient Satisfaction</p>
            <p className="mt-1 text-xl font-bold text-[#FFA500]">98%</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}