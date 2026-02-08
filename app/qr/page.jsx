"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QRPage() {
  const canvasRef = useRef();

  useEffect(() => {
    document.title = 'QR Code for Hadees';
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', 'scan this QR code to view a random hadith.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'scan this QR code to view a random hadith.';
      document.head.appendChild(meta);
    }
  }, []);

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
      <h1 className="font-bold">Scan This QR Code</h1>
        <canvas style={{
            margin:'0 auto'
        }} ref={canvasRef}></canvas>
      <h1 className="text-xs">OR click to navigate without scanning</h1>
      <span className="text-sm underline"><a href="/another">Show me hadith</a></span>
    </div>
  );
}