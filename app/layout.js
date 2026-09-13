import "./globals.css";
import { DoctorProvider } from "@/context/DoctorContext";
import { PatientProvider } from "@/context/PatientContext";
import { AppointmentProvider } from "@/context/AppointmentContext";

export const metadata = {
  title: "MediCare Hospital",
  description: "Modern Hospital Management Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DoctorProvider>
          <PatientProvider>
            <AppointmentProvider>
              {children}
            </AppointmentProvider>
          </PatientProvider>
        </DoctorProvider>
      </body>
    </html>
  );
}