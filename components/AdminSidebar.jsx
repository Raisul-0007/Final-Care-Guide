"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Stethoscope, Users, CalendarDays, Building2, HeartPulse, ArrowLeft } from "lucide-react";
const menu = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Appointments", href: "/admin/appointments", icon: CalendarDays },
  { name: "Departments", href: "/departments", icon: Building2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-gray-100 bg-white lg:block">
      <div className="sticky top-0 flex min-h-screen flex-col p-5">

        <Link href="/" className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFA500] text-white">
            <HeartPulse size={24} />
          </div>

          <div>
            <h1 className="font-bold text-gray-900">
              Medi<span className="text-[#FFA500]">Care</span>
            </h1>
            <p className="text-[9px] tracking-widest text-gray-400">
              ADMIN PANEL
            </p>
          </div>
        </Link>

        <div className="mt-8">
          <p className="px-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Management
          </p>

          <nav className="mt-4 space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-[#FFA500] text-white shadow-lg shadow-orange-100"
                      : "text-gray-500 hover:bg-orange-50 hover:text-[#FFA500]"
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition hover:bg-orange-50 hover:text-[#FFA500]"
          >
            <ArrowLeft size={19} />
            Back to Website
          </Link>
        </div>
      </div>
    </aside>
  );
}