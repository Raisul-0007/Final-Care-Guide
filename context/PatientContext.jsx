"use client";

import { createContext, useContext, useState } from "react";
import { patientsData } from "@/data/patients";

const PatientContext = createContext();

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState(patientsData);

  const addPatient = (patient) => {
    setPatients((prev) => [
      ...prev,
      {
        ...patient,
        id: Date.now(),
      },
    ]);
  };

  const updatePatient = (id, updatedPatient) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === id
          ? { ...patient, ...updatedPatient }
          : patient
      )
    );
  };

  const deletePatient = (id) => {
    setPatients((prev) =>
      prev.filter((patient) => patient.id !== id)
    );
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        addPatient,
        updatePatient,
        deletePatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatients() {
  return useContext(PatientContext);
}