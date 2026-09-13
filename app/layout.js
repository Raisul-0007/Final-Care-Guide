import "./globals.css";
import { DoctorProvider } from "@/context/DoctorContext";

export const metadata = {
  title: "MediCare Hospital",
  description: "Modern Hospital Management Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DoctorProvider>
          {children}
        </DoctorProvider>
      </body>
    </html>
  );
}