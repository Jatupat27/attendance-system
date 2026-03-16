"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function CheckinPage() {

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  const checkin = async () => {

    if (!name || !studentId) {
      alert("กรุณากรอกชื่อและรหัสนักศึกษา");
      return;
    }

    try {

      // ใช้ studentId เป็น document ID
      await setDoc(doc(db, "attendance", studentId), {
        name: name,
        studentId: studentId,
        time: new Date()
      });

      alert("เช็คชื่อสำเร็จ");

      setName("");
      setStudentId("");

    } catch (error) {

      console.error("Error saving attendance:", error);
      alert("เกิดข้อผิดพลาด");

    }

  };

  return (
    <div style={{ padding: 20 }}>

      <h1>เช็คชื่อเข้าเรียน</h1>

      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="ชื่อนักศึกษา"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 8, width: 250 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="รหัสนักศึกษา"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: 8, width: 250 }}
        />
      </div>

      <button
        onClick={checkin}
        style={{
          padding: 10,
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer"
        }}
      >
        เช็คชื่อ
      </button>

    </div>
  );
}