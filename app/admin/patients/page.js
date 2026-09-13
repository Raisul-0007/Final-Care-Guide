"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  UserRound,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePatients } from "@/context/PatientContext";

const emptyForm = {
  name: "",
  age: "",
  gender: "Male",
  phone: "",
  email: "",
  bloodGroup: "A+",
  address: "",
  status: "Active",
};

export default function AdminPatientsPage() {
  const {
    patients,
    addPatient,
    updatePatient,
    deletePatient,
  } = usePatients();

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");

  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [editingPatient, setEditingPatient] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        patient.phone.includes(search);

      const matchesGender =
        gender === "All" || patient.gender === gender;

      return matchesSearch && matchesGender;
    });
  }, [patients, search, gender]);

  const openAddModal = () => {
    setEditingPatient(null);
    setForm(emptyForm);
    setModal(true);
  };

  const openEditModal = (patient) => {
    setEditingPatient(patient);
    setForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      bloodGroup: patient.bloodGroup,
      address: patient.address,
      status: patient.status,
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

    if (editingPatient) {
      updatePatient(editingPatient.id, form);
    } else {
      addPatient(form);
    }

    setModal(false);
    setEditingPatient(null);
    setForm(emptyForm);
  };

  const confirmDelete = () => {
    deletePatient(deleteId);
    setDeleteId(null);
  };

  return (
    <main className="min-h-screen bg-[#fffaf2] p-4 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#ffa500]">
            Patient Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#17202a]">
            Patients
          </h1>

          <p className="mt-2 text-gray-500">
            Manage hospital patients.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#ffa500] px-5 py-3 font-semibold text-white shadow-md transition hover:bg-[#e99400] hover:shadow-lg"
        >
          <Plus size={20} />
          Add Patient
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">

          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#ffa500]"
            />
          </div>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#ffa500]"
          >
            <option value="All">All Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#fff5e6]">
              <tr>
                <th className="px-5 py-4 text-left text-sm">
                  Patient
                </th>
                <th className="px-5 py-4 text-left text-sm">
                  Age
                </th>
                <th className="px-5 py-4 text-left text-sm">
                  Gender
                </th>
                <th className="px-5 py-4 text-left text-sm">
                  Blood
                </th>
                <th className="px-5 py-4 text-left text-sm">
                  Phone
                </th>
                <th className="px-5 py-4 text-right text-sm">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-t border-gray-100"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1d6] text-[#ffa500]">
                        <UserRound size={19} />
                      </div>

                      <div>
                        <p className="font-semibold text-[#17202a]">
                          {patient.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          #{patient.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {patient.age}
                  </td>

                  <td className="px-5 py-4">
                    {patient.gender}
                  </td>

                  <td className="px-5 py-4 font-semibold text-[#ffa500]">
                    {patient.bloodGroup}
                  </td>

                  <td className="px-5 py-4">
                    {patient.phone}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          openEditModal(patient)
                        }
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() =>
                          setDeleteId(patient.id)
                        }
                        className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
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

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {filteredPatients.map((patient) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-[#17202a]">
                  {patient.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {patient.phone}
                </p>
              </div>

              <span className="font-bold text-[#ffa500]">
                {patient.bloodGroup}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <p>
                <strong>Age:</strong> {patient.age}
              </p>

              <p>
                <strong>Gender:</strong> {patient.gender}
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() =>
                  openEditModal(patient)
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-blue-600"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() =>
                  setDeleteId(patient.id)
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-red-600"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#17202a]">
                  {editingPatient
                    ? "Edit Patient"
                    : "Add Patient"}
                </h2>

                <button
                  onClick={() => setModal(false)}
                  className="rounded-lg bg-gray-100 p-2"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-4 md:grid-cols-2"
              >
                <input
                  name="name"
                  placeholder="Patient Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ffa500]"
                />

                <input
                  name="age"
                  type="number"
                  placeholder="Age"
                  value={form.age}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ffa500]"
                />

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#ffa500]"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>

                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#ffa500]"
                >
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>

                <input
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ffa500]"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ffa500]"
                />

                <input
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ffa500] md:col-span-2"
                />

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#ffa500]"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <button
                  type="submit"
                  className="rounded-xl bg-[#ffa500] px-5 py-3 font-semibold text-white transition hover:bg-[#e99400]"
                >
                  {editingPatient
                    ? "Update Patient"
                    : "Add Patient"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Trash2 />
              </div>

              <h2 className="mt-4 text-xl font-bold">
                Delete Patient?
              </h2>

              <p className="mt-2 text-gray-500">
                Are you sure you want to delete this patient?
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 rounded-xl bg-gray-100 py-3 font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}