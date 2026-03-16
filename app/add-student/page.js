"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function AddStudentPage() {

  const [name,setName] = useState("");
  const [studentId,setStudentId] = useState("");

  const saveStudent = async () => {

    if(!name || !studentId){
      alert("กรุณากรอกข้อมูล");
      return;
    }

    try{

      await setDoc(doc(db,"students",studentId),{
        name:name,
        studentId:studentId,
        createdAt:new Date()
      });

      alert("เพิ่มนักศึกษาสำเร็จ");

      setName("");
      setStudentId("");

    }catch(error){

      console.error(error);
      alert("เกิดข้อผิดพลาด");

    }

  };

  return(

<div style={{padding:20}}>

<h1>เพิ่มนักศึกษา</h1>

<div style={{marginBottom:10}}>

<input
type="text"
placeholder="ชื่อ"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{padding:8,width:250}}
/>

</div>

<div style={{marginBottom:10}}>

<input
type="text"
placeholder="รหัสนักศึกษา"
value={studentId}
onChange={(e)=>setStudentId(e.target.value)}
style={{padding:8,width:250}}
/>

</div>

<button
onClick={saveStudent}
style={{
padding:10,
background:"#2563eb",
color:"white",
border:"none",
borderRadius:6
}}
>

เพิ่มนักศึกษา

</button>

</div>

  );
}