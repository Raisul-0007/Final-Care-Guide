"use client";

import { createContext, useContext, useState } from "react";
import { appointmentsData } from "@/data/appointments";

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] =
    useState(appointmentsData);

  const addAppointment = (appointment) => {
    setAppointments((prev) => [
      ...prev,
      {
        ...appointment,
        id: Date.now(),
      },
    ]);
  };

  const updateAppointment = (id, updatedAppointment) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              ...updatedAppointment,
            }
          : appointment
      )
    );
  };

  const deleteAppointment = (id) => {
    setAppointments((prev) =>
      prev.filter(
        (appointment) => appointment.id !== id
      )
    );
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentContext);
}