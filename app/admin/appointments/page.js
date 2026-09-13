"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  CalendarDays,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppointments } from "@/context/AppointmentContext";

const emptyForm = {
  patient: "",
  doctor: "",
  department: "Cardiology",
  date: "",
  time: "",
  type: "Consultation",
  status: "Pending",
};

export default function AdminAppointmentsPage() {
  const {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  } = useAppointments();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [modal, setModal] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patient
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        appointment.doctor
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ||
        appointment.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, status]);

  const openAddModal = () => {
    setEditingAppointment(null);
    setForm(emptyForm);
    setModal(true);
  };

  const openEditModal = (appointment) => {
    setEditingAppointment(appointment);

    setForm({
      patient: appointment.patient,
      doctor: appointment.doctor,
      department: appointment.department,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status,
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

    if (editingAppointment) {
      updateAppointment(
        editingAppointment.id,
        form
      );
    } else {
      addAppointment(form);
    }

    setModal(false);
    setEditingAppointment(null);
    setForm(emptyForm);
  };

  const confirmDelete = () => {
    deleteAppointment(deleteId);
    setDeleteId(null);
  };

  return (
    <main className="min-h-screen bg-[#fffaf2] p-4 md:p-8">

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#ffa500]">
            Appointment Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#17202a]">
            Appointments
          </h1>

          <p className="mt-2 text-gray-500">
            Manage hospital appointments.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#ffa500] px-5 py-3 font-semibold text-white shadow-md hover:bg-[#e99400]"
        >
          <Plus size={20} />
          Add Appointment
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
              placeholder="Search patient or doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#ffa500]"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#ffa500]"
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[#fff5e6]">
              <tr>
                <th className="px-5 py-4 text-left">
                  Patient
                </th>

                <th className="px-5 py-4 text-left">
                  Doctor
                </th>

                <th className="px-5 py-4 text-left">
                  Date
                </th>

                <th className="px-5 py-4 text-left">
                  Time
                </th>

                <th className="px-5 py-4 text-left">
                  Type
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>

                <th className="px-5 py-4 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map(
                (appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-t border-gray-100"
                  >
                    <td className="px-5 py-4 font-semibold">
                      {appointment.patient}
                    </td>

                    <td className="px-5 py-4">
                      {appointment.doctor}
                    </td>

                    <td className="px-5 py-4">
                      {appointment.date}
                    </td>

                    <td className="px-5 py-4">
                      {appointment.time}
                    </td>

                    <td className="px-5 py-4">
                      {appointment.type}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          appointment.status ===
                          "Confirmed"
                            ? "bg-green-50 text-green-600"
                            : appointment.status ===
                              "Pending"
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            openEditModal(
                              appointment
                            )
                          }
                          className="rounded-lg bg-blue-50 p-2 text-blue-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() =>
                            setDeleteId(
                              appointment.id
                            )
                          }
                          className="rounded-lg bg-red-50 p-2 text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {editingAppointment
                    ? "Edit Appointment"
                    : "Add Appointment"}
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
                  name="patient"
                  placeholder="Patient Name"
                  value={form.patient}
                  onChange={handleChange}
                  required
                  className="rounded-xl border px-4 py-3 outline-none focus:border-[#ffa500]"
                />

                <input
                  name="doctor"
                  placeholder="Doctor Name"
                  value={form.doctor}
                  onChange={handleChange}
                  required
                  className="rounded-xl border px-4 py-3 outline-none focus:border-[#ffa500]"
                />

                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="rounded-xl border bg-white px-4 py-3 outline-none focus:border-[#ffa500]"
                >
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Gynecology</option>
                  <option>Orthopedics</option>
                  <option>Medicine</option>
                  <option>Dermatology</option>
                </select>

                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="rounded-xl border px-4 py-3 outline-none focus:border-[#ffa500]"
                />

                <input
                  name="time"
                  placeholder="10:00 AM"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="rounded-xl border px-4 py-3 outline-none focus:border-[#ffa500]"
                />

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="rounded-xl border bg-white px-4 py-3 outline-none focus:border-[#ffa500]"
                >
                  <option>Consultation</option>
                  <option>Checkup</option>
                  <option>Follow Up</option>
                  <option>Emergency</option>
                </select>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="rounded-xl border bg-white px-4 py-3 outline-none focus:border-[#ffa500]"
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                </select>

                <button
                  type="submit"
                  className="rounded-xl bg-[#ffa500] px-5 py-3 font-semibold text-white hover:bg-[#e99400]"
                >
                  {editingAppointment
                    ? "Update Appointment"
                    : "Add Appointment"}
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
                Delete Appointment?
              </h2>

              <p className="mt-2 text-gray-500">
                Are you sure you want to delete this
                appointment?
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