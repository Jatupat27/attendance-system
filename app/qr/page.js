"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {

  const studentId = "663450035-5";

  const checkinUrl =
    "https://attendance-system-mu-dun.vercel.app/scan?studentId=" + studentId;

  return (
    <div style={{ padding: 20 }}>
      <h1>QR Code เช็คชื่อ</h1>

      <QRCodeCanvas value={checkinUrl} size={250} />

      <p>ให้นักศึกษาสแกน QR นี้เพื่อเช็คชื่อ</p>
    </div>
  );
}