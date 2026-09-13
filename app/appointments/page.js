"use client";

import { useState } from "react";
import { CalendarDays, Clock, User, Phone, Mail } from "lucide-react";

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    doctor: "",
    department: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Appointment Data:", formData);

    alert("Appointment booked successfully!");

    setFormData({
      patientName: "",
      phone: "",
      email: "",
      doctor: "",
      department: "",
      date: "",
      time: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#fff8ed] py-16">
      <div className="mx-auto max-w-4xl px-4">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-[#ffa500]">
            Appointment
          </p>

          <h1 className="text-4xl font-bold text-[#17202a] md:text-5xl">
            Book Your Appointment
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Fill out the form below to schedule an appointment
            with one of our experienced doctors.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-xl md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">

            {/* Patient Name */}
            <div>
              <label className="mb-2 block font-medium text-[#17202a]">
                Patient Name
              </label>

              <div className="relative">
                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter patient name"
                  required
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block font-medium text-[#17202a]">
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block font-medium text-[#17202a]">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="mb-2 block font-medium text-[#17202a]">
                Department
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Medicine">Medicine</option>
                <option value="Dermatology">Dermatology</option>
              </select>
            </div>

            {/* Doctor */}
            <div>
              <label className="mb-2 block font-medium text-[#17202a]">
                Select Doctor
              </label>

              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
              >
                <option value="">Select Doctor</option>
                <option value="Dr. Sarah Ahmed">
                  Dr. Sarah Ahmed
                </option>
                <option value="Dr. Mahmud Hasan">
                  Dr. Mahmud Hasan
                </option>
                <option value="Dr. Nusrat Jahan">
                  Dr. Nusrat Jahan
                </option>
                <option value="Dr. Tanvir Rahman">
                  Dr. Tanvir Rahman
                </option>
                <option value="Dr. Farhan Kabir">
                  Dr. Farhan Kabir
                </option>
                <option value="Dr. Ayesha Rahman">
                  Dr. Ayesha Rahman
                </option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block font-medium text-[#17202a]">
                Appointment Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="mb-2 block font-medium text-[#17202a]">
                Appointment Time
              </label>

              <div className="relative">
                <Clock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
                />
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="mb-2 block font-medium text-[#17202a]">
                Additional Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#ffa500] focus:ring-2 focus:ring-[#ffa500]/20"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-[#ffa500] px-6 py-3.5 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#e69500] hover:shadow-lg"
              >
                Book Appointment
              </button>
            </div>

          </div>
        </form>
      </div>
    </main>
  );
}