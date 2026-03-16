"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function StudentsPage() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const querySnapshot = await getDocs(collection(db, "attendance"));

      const list = [];

      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });

      setStudents(list);
    };

    fetchData();

  }, []);

  return (
    <div style={{ padding: 20 }}>

      <h1>รายชื่อผู้เช็คชื่อ</h1>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>รหัสนักศึกษา</th>
            <th>เวลา</th>
          </tr>
        </thead>

        <tbody>

          {students.map((s, index) => (
            <tr key={index}>
              <td>{s.name}</td>
              <td>{s.studentId}</td>
              <td>{new Date(s.time.seconds * 1000).toLocaleString()}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}