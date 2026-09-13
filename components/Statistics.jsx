"use client";

import { motion } from "framer-motion";

const stats = [
  ["25+", "Years of Excellence"],
  ["50+", "Expert Doctors"],
  ["15K+", "Happy Patients"],
  ["24/7", "Emergency Support"],
];

export default function Statistics() {
  return (
    <section className="bg-[#FFA500] py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 text-center md:grid-cols-4 lg:px-8">
        {stats.map(([number, title], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-4xl font-bold text-white">{number}</h3>
            <p className="mt-2 text-sm text-white/80">{title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}