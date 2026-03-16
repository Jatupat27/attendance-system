"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {

  const checkinUrl = "https://obsequent-entangleable-paul.ngrok-free.dev/checkin";

  return (
    <div style={{
      padding:40,
      textAlign:"center",
      fontFamily:"sans-serif",
      background:"#f3f4f6",
      minHeight:"100vh"
    }}>

      <h1 style={{
        fontSize:32,
        marginBottom:10
      }}>
        QR Code เช็คชื่อ
      </h1>

      <p style={{marginBottom:30}}>
        ให้นักศึกษาสแกน QR นี้เพื่อเช็คชื่อ
      </p>

      <div style={{
        background:"white",
        display:"inline-block",
        padding:30,
        borderRadius:10,
        boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
      }}>

        <QRCodeCanvas
          value={checkinUrl}
          size={250}
        />

      </div>

      <p style={{marginTop:20,color:"#666"}}>
        {checkinUrl}
      </p>

    </div>
  );
}