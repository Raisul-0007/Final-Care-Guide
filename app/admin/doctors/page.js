"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, X, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminHeader from "@/components/AdminHeader";
import { useDoctors } from "@/context/DoctorContext";

const emptyDoctor = {
  name: "",
  department: "Cardiology",
  specialty: "",
  experience: "",
  qualification: "",
  available: "",
  image: "",
  about: "",
};

export default function AdminDoctorsPage() {
  const {
    doctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
  } = useDoctors();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const [modal, setModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [form, setForm] = useState(emptyDoctor);

  const [deleteId, setDeleteId] = useState(null);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const searchMatch = doctor.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const departmentMatch =
        department === "All" ||
        doctor.department === department;

      return searchMatch && departmentMatch;
    });
  }, [doctors, search, department]);

  const openAddModal = () => {
    setEditingDoctor(null);
    setForm(emptyDoctor);
    setModal(true);
  };

  const openEditModal = (doctor) => {
    setEditingDoctor(doctor);
    setForm({
      name: doctor.name,
      department: doctor.department,
      specialty: doctor.specialty,
      experience: doctor.experience,
      qualification: doctor.qualification,
      available: doctor.available,
      image: doctor.image,
      about: doctor.about,
    });
    setModal(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingDoctor) {
      updateDoctor(editingDoctor.id, {
        ...form,
        experience: Number(form.experience),
      });
    } else {
      addDoctor({
        ...form,
        experience: Number(form.experience),
      });
    }

    setModal(false);
    setEditingDoctor(null);
    setForm(emptyDoctor);
  };

  const confirmDelete = () => {
    deleteDoctor(deleteId);
    setDeleteId(null);
  };

  return (
    <>
      <AdminHeader />

      <main className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-[#FFA500]">
                MANAGEMENT
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                Doctors
              </h1>

              <p className="mt-2 text-gray-500">
                Add, edit, remove and manage hospital doctors.
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#FFA500] px-5 py-3 font-semibold text-white shadow-lg shadow-orange-100 transition duration-300 hover:-translate-y-1 hover:bg-orange-500"
            >
              <Plus size={19} />
              Add Doctor
            </button>
          </div>
          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">

              <div className="relative">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search doctor by name..."
                  className="h-12 w-full rounded-xl border border-gray-200 pl-11 pr-4 text-sm outline-none transition focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="h-12 rounded-xl border border-gray-200 px-4 text-sm text-gray-600 outline-none transition focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
              >
                <option value="All">All Departments</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Medicine">Medicine</option>
                <option value="Dermatology">Dermatology</option>
              </select>

            </div>
          </div>

          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-200">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Experience
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredDoctors.map((doctor) => (
                    <tr
                      key={doctor.id}
                      className="transition hover:bg-orange-50/40"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-orange-50">
                            {doctor.image ? (
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Stethoscope
                                size={19}
                                className="text-[#FFA500]"
                              />
                            )}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900">
                              {doctor.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {doctor.specialty}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {doctor.department}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {doctor.experience} Years
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                          Active
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(doctor)}
                            className="rounded-lg bg-orange-50 p-2.5 text-[#FFA500] transition hover:bg-[#FFA500] hover:text-white"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            onClick={() => setDeleteId(doctor.id)}
                            className="rounded-lg bg-red-50 p-2.5 text-red-500 transition hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 space-y-4 md:hidden">
            {filteredDoctors.map((doctor) => (
              <motion.div
                layout
                key={doctor.id}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-50">
                      {doctor.image ? (
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Stethoscope
                          size={20}
                          className="text-[#FFA500]"
                        />
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        {doctor.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#FFA500]">
                        {doctor.department}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {doctor.experience} Years Experience
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                    Active
                  </span>
                </div>

                <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => openEditModal(doctor)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-50 py-2.5 text-sm font-semibold text-[#FFA500]"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(doctor.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-sm font-semibold text-red-500"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="mt-6 rounded-2xl bg-white p-16 text-center">
              <Stethoscope className="mx-auto text-gray-300" size={45} />

              <h2 className="mt-4 font-bold text-gray-800">
                No doctors found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try another search or department.
              </p>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 md:p-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingDoctor ? "Edit Doctor" : "Add Doctor"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Enter doctor information below.
                  </p>
                </div>

                <button
                  onClick={() => setModal(false)}
                  className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <X />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Doctor Name
                    </label>

                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Dr. John Doe"
                      className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Specialty
                    </label>

                    <input
                      required
                      name="specialty"
                      value={form.specialty}
                      onChange={handleChange}
                      placeholder="Senior Cardiologist"
                      className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Department
                    </label>

                    <select
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
                    >
                      <option>Cardiology</option>
                      <option>Neurology</option>
                      <option>Gynecology</option>
                      <option>Orthopedics</option>
                      <option>Medicine</option>
                      <option>Dermatology</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Experience
                    </label>

                    <input
                      required
                      type="number"
                      min="0"
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      placeholder="8"
                      className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Qualification
                    </label>

                    <input
                      required
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChange}
                      placeholder="MBBS, FCPS"
                      className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Available Time
                    </label>

                    <input
                      required
                      name="available"
                      value={form.available}
                      onChange={handleChange}
                      placeholder="Sat - Thu, 9 AM - 2 PM"
                      className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Image URL
                  </label>

                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="/images/doctors/doctor.jpg"
                    className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    About Doctor
                  </label>

                  <textarea
                    required
                    name="about"
                    value={form.about}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Write about the doctor..."
                    className="w-full resize-none rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-[#FFA500] focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div className="flex gap-3 border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#FFA500] py-3 font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-500"
                  >
                    {editingDoctor ? "Update Doctor" : "Add Doctor"}
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md rounded-3xl bg-white p-7 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Trash2 />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Delete Doctor?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Are you sure you want to remove this doctor from the list?
              </p>

              <div className="mt-7 flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-600"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}