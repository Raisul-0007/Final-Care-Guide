"use client";

import { createContext, useContext, useState } from "react";
import { doctorsData } from "@/data/doctors";

const DoctorContext = createContext();

export function DoctorProvider({ children }) {
  const [doctors, setDoctors] = useState(doctorsData);

  const addDoctor = (doctor) => {
    setDoctors((prev) => [
      ...prev,
      {
        ...doctor,
        id: Date.now(),
      },
    ]);
  };

  const updateDoctor = (id, updatedDoctor) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === id
          ? { ...doctor, ...updatedDoctor }
          : doctor
      )
    );
  };

  const deleteDoctor = (id) => {
    setDoctors((prev) =>
      prev.filter((doctor) => doctor.id !== id)
    );
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        addDoctor,
        updateDoctor,
        deleteDoctor,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctors() {
  return useContext(DoctorContext);
}