"use client";

import { motion } from "framer-motion";
import {
  HeartPulse,
  Stethoscope,
  Ambulance,
  Microscope,
} from "lucide-react";

const services = [
  {
    icon: HeartPulse,
    title: "Cardiology",
    text: "Advanced diagnosis and treatment for heart-related conditions.",
  },
  {
    icon: Stethoscope,
    title: "Expert Doctors",
    text: "Experienced specialists dedicated to providing quality care.",
  },
  {
    icon: Ambulance,
    title: "Emergency Care",
    text: "24/7 emergency medical support for urgent situations.",
  },
  {
    icon: Microscope,
    title: "Modern Laboratory",
    text: "Accurate diagnostic testing using modern technology.",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-widest text-[#FFA500]">
            Our Services
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Healthcare You Can Trust
          </h2>

          <p className="mt-4 leading-7 text-gray-500">
            Everything you need for better health, all under one roof.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:border-orange-100 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#FFA500] transition duration-300 group-hover:bg-[#FFA500] group-hover:text-white">
                  <Icon size={27} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-500">
                  {service.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}