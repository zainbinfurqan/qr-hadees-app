"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QRPage() {
  const canvasRef = useRef();

  useEffect(() => {
    const scanUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/another`;
    QRCode.toCanvas(canvasRef.current, scanUrl, {
      width: 300, // this sets both width and height
      color: {
        dark: "#000000",  // black squares
        light: "#ffffff"  // white background
      }
    }).catch(err => console.error(err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Scan This QR Code</h1>
        <canvas style={{
            margin:'0 auto'
        }} ref={canvasRef}></canvas>
    </div>
  );
}