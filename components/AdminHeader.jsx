"use client";

import { Bell, Menu } from "lucide-react";

export default function AdminHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/95 px-5 backdrop-blur-md lg:px-8">

      <button
        onClick={onMenuClick}
        className="rounded-xl p-2 text-gray-600 hover:bg-orange-50 hover:text-[#FFA500] lg:hidden"
      >
        <Menu size={23} />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm text-gray-500">
          Welcome back,
        </p>
        <h2 className="font-bold text-gray-900">
          Hospital Administrator
        </h2>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button className="relative rounded-xl p-2.5 text-gray-500 transition hover:bg-orange-50 hover:text-[#FFA500]">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#FFA500]" />
        </button>

        <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFA500] font-bold text-white">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">
              Admin
            </p>
            <p className="text-xs text-gray-400">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}