"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CheckinPage() {

  const [name,setName] = useState("");
  const [studentId,setStudentId] = useState("");
  const [message,setMessage] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!name || !studentId){
      setMessage("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try{

      await addDoc(collection(db,"attendance"),{
        name:name,
        studentId:studentId,
        time:Date.now()
      });

      setMessage("เช็คชื่อสำเร็จ ✅");

      setName("");
      setStudentId("");

    }catch(err){

      console.error(err);
      setMessage("เกิดข้อผิดพลาด");

    }

  };

  return (

    <div style={{
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"#f3f4f6",
      fontFamily:"sans-serif"
    }}>

      <div style={{
        background:"white",
        padding:40,
        borderRadius:10,
        width:350,
        boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{marginBottom:20}}>
          เช็คชื่อเข้าเรียน
        </h2>

        <form onSubmit={handleSubmit}>

          <input
          placeholder="ชื่อ"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={{
            width:"100%",
            padding:10,
            marginBottom:10,
            border:"1px solid #ddd",
            borderRadius:5
          }}
          />

          <input
          placeholder="รหัสนักศึกษา"
          value={studentId}
          onChange={(e)=>setStudentId(e.target.value)}
          style={{
            width:"100%",
            padding:10,
            marginBottom:20,
            border:"1px solid #ddd",
            borderRadius:5
          }}
          />

          <button
          type="submit"
          style={{
            width:"100%",
            padding:12,
            background:"#2563eb",
            color:"white",
            border:"none",
            borderRadius:5,
            fontSize:16
          }}
          >
          เช็คชื่อ
          </button>

        </form>

        {message && (
          <p style={{
            marginTop:15,
            color:"green"
          }}>
            {message}
          </p>
        )}

      </div>

    </div>

  );

}