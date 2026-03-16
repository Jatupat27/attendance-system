"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  const addStudent = async () => {
    await addDoc(collection(db, "students"), {
      name: name,
      studentId: studentId,
      time: new Date()
    });

    alert("บันทึกสำเร็จ");
    setName("");
    setStudentId("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>เพิ่มนักศึกษา</h1>

      <input
        placeholder="ชื่อนักศึกษา"
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

      <button onClick={addStudent}>บันทึก</button>
    </div>
  );
}