'use client'
import { useEffect, useState } from "react";

export default function AnotherPage() {
  const [hadees, setHadees] = useState<any>(null);
  const [totalDonations, setTotalDonations] = useState<number>(0);

  async function getClientIP() {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  return data.ip; // public IP
}

 const [scans, setScans] = useState([]);

  useEffect(() => {
    fetch("/api/donation")
      .then(res => res.json())
      .then(setScans);
  }, []);

useEffect(() => {
  const postDonation = async () => {
    await fetch("/api/donation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 0.10,
      })
    });
  };
  postDonation();
}, []);

  useEffect(() => {
    const total = scans.reduce((sum, scan:any) => sum + (scan?.amount || 0), 0);
    setTotalDonations(total);

  }, [scans]);

  useEffect(() => {
    async function fetchHadees() {
      try {
        const res = await fetch("/api/random-hadees");
        const data = await res.json();
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

getClientIP().then(ip => console.log("Client IP:", ip));

    fetchHadees();
  }, []);
  return (
    hadees && <div className=" max-w-md rounded overflow-hidden shadow-lg mx-auto p-6 mt-10 bg-green-900 text-center text-white">
      <h1 className="font-bold text-xl mb-2">Only for testing purpose for now</h1>
      <p className="text-left text-xs">Total Donation: <span className="font-bold">{totalDonations.toFixed(2)} RM</span></p>
      <h1 className="font-bold text-xl mb-2">Hadees</h1>
      <div className="flex flex-row text-center justify-center gap-4 mb-4 rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black">
      <p>Arabic Number: {hadees?.hadiths[0].arabicnumber}</p>
      <p>Hadith Number: {hadees?.hadiths[0].hadithnumber}</p>
      </div>
      <p className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black" >{hadees?.hadiths[0].text}</p>
      {hadees?.hadiths[0] && hadees?.hadiths[0].grades?.map((grade:any, index:number) => (
        <div key={index}  className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black">
          <p>
            {grade.grade} - {grade.name}
          </p>
        </div>
      ))}
      <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4">
      <p >book: {hadees?.hadiths[0].reference.book} | hadith: {hadees?.hadiths[0].reference.hadith} | name: {hadees?.metadata.name}</p>
      </div>
      {Object.keys(hadees?.metadata.section).map((key) => (
        <div key={key} className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4">
          <p style={{ fontSize: "1.2rem" }}>{hadees?.metadata.section[key as keyof typeof hadees.metadata.section]}</p>
        </div>
      ))}
      {Object.keys(hadees?.metadata.section_detail).map((key) => (
        <div key={key}>
        <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4">

        <p>Arabic number first: {hadees?.metadata.section_detail[key as keyof typeof hadees.metadata.section_detail].arabicnumber_first}</p>
        <p>Arabic number last: {hadees?.metadata.section_detail[key as keyof typeof hadees.metadata.section_detail].arabicnumber_last}</p>
        </div>
        <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4">
        
        <p>Hadith number first: {hadees?.metadata.section_detail[key as keyof typeof hadees.metadata.section_detail].hadithnumber_first}</p>
        <p>Hadith number last: {hadees?.metadata.section_detail[key as keyof typeof hadees.metadata.section_detail].hadithnumber_last}</p>
        </div>
        </div>
      ))}
        <div className="text-sm flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-black text-white text-center justify-center gap-4">
        <p className="font-bold">On every hadith you read, I will donate 0.10rm to authentic registered charity organization</p>
        </div>
        <div className="text-sm flex flex-col rounded overflow-hidden shadow-lg p-4 mt-4 bg-black text-white text-center justify-center gap-4">
        <p className="font-bold">If you want to donate by youself, Here are some authentic registered charity organizations:</p>
        <p>1. MATW Project - <a href="https://matwproject.org/" target="_blank" rel="noopener noreferrer">https://matwproject.org/</a></p>
        {/* <p>2. Mercy Malaysia - https://www.mercy.org.my/</p>
        <p>3. Yayasan Amal Malaysia - https://yayasanamalmalaysia.org/</p>
        <p>4. Global Peace Mission (GPM) - https://www.gpm.org.my/</p>
        <p>5. Humanitarian Care Malaysia (MyCARE) - https://mycare.org.my/</p> */}
        </div>
        <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-gray-800 text-white text-center justify-center gap-4">
        <p className="text-xs">Report at zain.ahmed199524@gmail.com, If you found any wrong hadith</p>
        </div>
    </div>
  );
}