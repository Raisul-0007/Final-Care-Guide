"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDoctors } from "@/context/DoctorContext";
import DoctorCard from "@/components/DoctorCard";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navber";

export default function DoctorsPage() {
  const { doctors } = useDoctors();

  const searchParams = useSearchParams();

  const departmentFromUrl =
    searchParams.get("department") || "All";

  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState(departmentFromUrl);
  const [experience, setExperience] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 6;

  // URL থেকে department পরিবর্তন হলে state update হবে
  useEffect(() => {
    setDepartment(departmentFromUrl);
  }, [departmentFromUrl]);

  // Filter doctors
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch = doctor.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDepartment =
        department === "All" ||
        doctor.department === department;

      let matchesExperience = true;

      if (experience === "5+") {
        matchesExperience =
          doctor.experience >= 5;
      }

      if (experience === "10+") {
        matchesExperience =
          doctor.experience >= 10;
      }

      if (experience === "15+") {
        matchesExperience =
          doctor.experience >= 15;
      }

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesExperience
      );
    });
  }, [
    doctors,
    search,
    department,
    experience,
  ]);

  // Total pages
  const totalPages = Math.ceil(
    filteredDoctors.length / doctorsPerPage
  );

  // Current page doctors
  const startIndex =
    (currentPage - 1) * doctorsPerPage;

  const currentDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + doctorsPerPage
  );

  // Search/filter করলে page 1 এ যাবে
  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    department,
    experience,
  ]);

  // যদি filter করার পরে current page আর valid না থাকে
  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Page change
  const handlePageChange = (page) => {
    if (
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const departments = [
    "All",
    "Cardiology",
    "Neurology",
    "Gynecology",
    "Orthopedics",
    "Medicine",
    "Dermatology",
  ];

  const experiences = [
    "All",
    "5+",
    "10+",
    "15+",
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* Header */}
      <section className="bg-[#fff8ed] py-20">
        <div className="mx-auto max-w-7xl px-4">

          <div className="text-center">
            <p className="mb-3 font-semibold uppercase tracking-widest text-[#ffa500]">
              Our Specialists
            </p>

            <h1 className="text-4xl font-bold text-[#17202a] md:text-5xl">
              Find Your Doctor
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Find experienced and trusted doctors by
              name, department and experience.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mt-10 rounded-2xl bg-white p-5 shadow-lg">
            <div className="grid gap-4 md:grid-cols-3">

              {/* Search */}
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search doctor by name..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
                />
              </div>

              {/* Department */}
              <select
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
              >
                {departments.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All"
                      ? "All Departments"
                      : item}
                  </option>
                ))}
              </select>

              {/* Experience */}
              <select
                value={experience}
                onChange={(e) =>
                  setExperience(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
              >
                {experiences.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All"
                      ? "All Experience"
                      : `${item} Years Experience`}
                  </option>
                ))}
              </select>

            </div>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">

          {/* Result Count */}
          <div className="mb-8 flex items-center justify-between">

            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-[#17202a]">
                {filteredDoctors.length}
              </span>{" "}
              doctors
            </p>

            {totalPages > 0 && (
              <p className="text-sm text-gray-500">
                Page {currentPage} of{" "}
                {totalPages}
              </p>
            )}

          </div>

          {/* Doctor Cards */}
          {currentDoctors.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {currentDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                />
              ))}

            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">

              <h3 className="text-xl font-semibold text-[#17202a]">
                No Doctors Found
              </h3>

              <p className="mt-2 text-gray-500">
                Try changing your search or filter.
              </p>

            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">

              {/* Previous */}
              <button
                onClick={() =>
                  handlePageChange(
                    currentPage - 1
                  )
                }
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white transition hover:border-[#ffa500] hover:bg-[#ffa500] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Page Numbers */}
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() =>
                    handlePageChange(page)
                  }
                  className={`h-10 min-w-10 rounded-lg px-3 font-medium transition ${
                    currentPage === page
                      ? "bg-[#ffa500] text-white shadow-md"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-[#ffa500] hover:text-[#ffa500]"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() =>
                  handlePageChange(
                    currentPage + 1
                  )
                }
                disabled={
                  currentPage === totalPages
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white transition hover:border-[#ffa500] hover:bg-[#ffa500] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={20} />
              </button>

            </div>
          )}

        </div>
      </section>
    </main>
  );
}