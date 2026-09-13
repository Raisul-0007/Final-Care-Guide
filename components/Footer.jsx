import Link from "next/link";
import { HeartPulse, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFA500]">
              <HeartPulse size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Medi<span className="text-[#FFA500]">Care</span>
              </h2>
              <p className="text-[10px] tracking-widest text-gray-400">
                HOSPITAL
              </p>
            </div>
          </div>

          <p className="mt-5 leading-7 text-gray-400">
            Providing trusted healthcare services with compassion,
            technology, and experienced medical professionals.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>

          <div className="mt-5 flex flex-col gap-3">
            <Link className="text-gray-400 transition hover:text-[#FFA500]" href="/">
              Home
            </Link>
            <Link className="text-gray-400 transition hover:text-[#FFA500]" href="/doctors">
              Doctors
            </Link>
            <Link className="text-gray-400 transition hover:text-[#FFA500]" href="/departments">
              Departments
            </Link>
            <Link className="text-gray-400 transition hover:text-[#FFA500]" href="/appointments">
              Appointments
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Departments</h3>

          <div className="mt-5 space-y-3 text-gray-400">
            <p>Cardiology</p>
            <p>Neurology</p>
            <p>Orthopedics</p>
            <p>Medicine</p>
            <p>Dermatology</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>

          <div className="mt-5 space-y-4 text-gray-400">
            <p className="flex gap-3">
              <MapPin className="shrink-0 text-[#FFA500]" size={19} />
              123 Medical Road, Dhaka, Bangladesh
            </p>

            <p className="flex gap-3">
              <Phone className="shrink-0 text-[#FFA500]" size={19} />
              +880 1234-567890
            </p>

            <p className="flex gap-3">
              <Mail className="shrink-0 text-[#FFA500]" size={19} />
              info@medicare.com
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-5 text-center text-sm text-gray-500 lg:px-8">
          © 2026 MediCare Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}