"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, HeartPulse } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Departments", href: "/departments" },
    { name: "Patients", href: "/patients" },
    { name: "Appointments", href: "/appointments" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFA500] text-white">
            <HeartPulse size={25} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Medi<span className="text-[#FFA500]">Care</span>
            </h1>
            <p className="text-[10px] font-medium tracking-widest text-gray-500">
              HOSPITAL
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-sm font-medium text-gray-600 transition hover:text-[#FFA500]"
            >
              {link.name}

              <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-[#FFA500] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <Link
          href="/appointments"
          className="hidden rounded-full bg-[#FFA500] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-100 transition duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:shadow-lg lg:block"
        >
          Book Appointment
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-gray-700 lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 bg-white lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-gray-100 py-4 text-gray-700 transition hover:pl-2 hover:text-[#FFA500]"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/appointments"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-xl bg-[#FFA500] py-3 text-center font-semibold text-white"
              >
                Book Appointment
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}