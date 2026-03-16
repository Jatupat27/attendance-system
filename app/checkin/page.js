"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CheckinPage() {

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  const checkin = async () => {

    if (!name || !studentId) {
      alert("กรุณากรอกข้อมูล");
      return;
    }

    await addDoc(collection(db, "attendance"), {
      name: name,
      studentId: studentId,
      time: new Date()
    });

    alert("เช็คชื่อสำเร็จ");

    setName("");
    setStudentId("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>เช็คชื่อเข้าเรียน</h1>

      <input
        placeholder="ชื่อ"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="รหัสนักศึกษา"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <br /><br />

      <button onClick={checkin}>เช็คชื่อ</button>
    </div>
  );
}