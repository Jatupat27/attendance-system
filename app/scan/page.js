"use client";

import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function ScanPage() {
  const params = useSearchParams();
  const studentId = params.get("studentId");

  useEffect(() => {
    const saveAttendance = async () => {
      if (!studentId) return;

      await addDoc(collection(db, "attendance"), {
        studentId: studentId,
        time: new Date()
      });

      alert("เช็คชื่อสำเร็จ");
    };

    saveAttendance();
  }, [studentId]);

  return <h1>กำลังบันทึกการเช็คชื่อ...</h1>;
}