'use client'
import { useEffect, useState } from "react";

export default function AnotherPage() {
  const [hadees, setHadees] = useState<{
    number: number;
    arab: string;
    id: string;
  } | null>(null);

  async function getClientIP() {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  return data.ip; // public IP
}

  useEffect(() => {
    async function fetchHadees() {
      try {
        const res = await fetch("/api/random-hadees");
        const data = await res.json();
        console.log("data",data.text)
        setHadees(data.text);
      } catch (err) {
        console.error(err);
        // setHadees("Failed to load hadees.");
      }
    }
    const deviceInfo = {
  ua: navigator.userAgent,         // Full user agent string
  browser: (() => {
    const ua = navigator.userAgent;
    if (/firefox/i.test(ua)) return "Firefox";
    if (/chrome|chromium|crios/i.test(ua)) return "Chrome";
    if (/safari/i.test(ua)) return "Safari";
    if (/edg/i.test(ua)) return "Edge";
    if (/opr|opera/i.test(ua)) return "Opera";
    return "Other";
  })(),
  platform: navigator.platform,    // OS/platform
  language: navigator.language,    // e.g., "en-US"
  screen: `${screen.width}x${screen.height}`, // screen resolution
  time: new Date().toISOString(),  // timestamp
};

console.log(deviceInfo);
getClientIP().then(ip => console.log("Client IP:", ip));

    fetchHadees();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Random Hadees</h1>
      <p style={{ fontSize: "1.5rem" }}>{hadees?.number}</p>
      <p style={{ fontSize: "1.2rem" }}>{hadees?.arab}</p>
      <p style={{ fontSize: "1.2rem" }}>{hadees?.id}</p>
    </div>
  );
}