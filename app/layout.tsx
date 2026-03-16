import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ระบบเช็คชื่อเข้าเรียนด้วย QR Code",
  description: "QR Code Attendance System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}