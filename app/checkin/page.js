"use client";

import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CheckinPage() {

  const checkin = async () => {
    try {
      await addDoc(collection(db, "attendance"), {
        time: new Date(),
      });

      alert("เช็คชื่อสำเร็จ");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>เช็คชื่อเข้าเรียน</h1>

      <button onClick={checkin}>
        กดเพื่อเช็คชื่อ
      </button>
    </div>
  );
}