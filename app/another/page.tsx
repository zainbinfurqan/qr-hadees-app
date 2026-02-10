'use client'

import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../helpers/localStorage";

export default function AnotherPage() {
  const [hadees, setHadees] = useState<any>(null);
  const [totalDonations, setTotalDonations] = useState<number>(0);
  const [hadithReadCount, setHadithReadCount] = useState<number>(0);
  const [linkToHadith, setLinkToHadith] = useState<string>("");
  const [lastHadithRead, setLastHadithRead] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<string>("");

  useEffect(() => {
    document.title = 'Hadith';
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', 'Hadith displaying page.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Hadith displaying page.';
      document.head.appendChild(meta);
    }
// check stored time (prefer "last_hadith_read", fallback to any timestamp stored in "hadith_read_count")
    const storedTime = getLocalStorageItem("last_hadith_read") || getLocalStorageItem("hadith_read_count");
    if (storedTime) {
      const ts = typeof storedTime === "string" ? Date.parse(storedTime) : Number(storedTime);
      if (!isNaN(ts) && ts <= Date.now()) {
        // time is equal or greater than now -> reset read count to 0
        setLocalStorageItem("hadith_read_count", 0);
        setHadithReadCount(0);
      }
    }
  }, []);

const books = {
  "Sunan an Nasai": "Nasai",
  "Sahih Muslim": "Muslim",
  "Sunan Abu Dawud": "AbuDawood",
  "Jami At Tirmidhi": "Tirmidhi",
  "Sunan Ibn Majah": "IbnMajah",
  "Sahih al Bukhari": "Bukhari"
}

 const [scans, setScans] = useState([]);


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
  const count = getLocalStorageItem("hadith_read_count") || "0";
  if (parseInt(count) >= 0 && parseInt(count) < 3) {
    setLocalStorageItem("hadith_read_count", parseInt(count) + 1);
    setLocalStorageItem("last_hadith_read", new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString());
  postDonation();
  fetchHadees();
  }else{
    setHadithReadCount(parseInt(count));
    setLastHadithRead(getLocalStorageItem("last_hadith_read") || "");
  }
}, []);

useEffect(() => {
  hadees && setLinkToHadith(`https://sunnah.com/${books[hadees?.metadata.name as keyof typeof books]}:${hadees?.hadiths[0].hadithnumber}`);
},[hadees])

  useEffect(() => {
    fetch("/api/donation")
      .then(res => res.json())
      .then(setScans);
  }, []);


  useEffect(() => {
    const total = scans.reduce((sum, scan:any) => sum + (scan?.amount || 0), 0);
    setTotalDonations(total);

  }, [scans]);

  useEffect(() => {
    if (!lastHadithRead) return;
    const interval = setInterval(() => {
      const nextTime = new Date(lastHadithRead).getTime();
      const now = new Date().getTime();
      const diff = nextTime - now;
      
      if (diff <= 0) {
        setRemainingTime("Ready! You can read a new hadith now.");
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setRemainingTime(`${hours}h ${minutes}m ${seconds}s remaining`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastHadithRead]);
  
    async function fetchHadees() {
      try {
        const res = await fetch("/api/random-hadees");
        const data = await res.json();
        setHadees(data.text);
      } catch (err) {
        console.error(err);
      }
    }

  return (
    <>
      {hadithReadCount > 0 && <p className="text-center rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black font-semibold text-blue-600">{remainingTime}</p>}
      {hadees && <div className=" max-w-md rounded overflow-hidden shadow-lg mx-auto p-6 mt-10 bg-green-900 text-center text-white">
      {/* <h1 className="font-bold text-xl mb-2">Only for testing purpose for now</h1> */}
      <div className="flex flex-row justify-between">
      <a href="/" className="flex">
      <span aria-hidden="true" className="mr-1">←</span>
      <p className="text-right text-sm ">Home</p>
      </a>
      <p className="text-left text-xs">Total Donation: <span className="font-bold">{totalDonations.toFixed(2)} RM</span></p>
        </div>
      <h1 className="font-bold text-xl mb-2">Hadees</h1>
      <div className="flex flex-row text-center justify-center gap-4 mb-4 rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black">
      {hadees?.hadiths && hadees?.hadiths.length >0 && <p>Arabic Number: {hadees?.hadiths[0].arabicnumber}</p>}
      {hadees?.hadiths && hadees?.hadiths.length >0 && <p>Hadith Number: {hadees?.hadiths[0].hadithnumber}</p>}
      </div>
      {hadees?.hadiths && hadees?.hadiths.length >0 && <a href={linkToHadith} target="_blank" rel="noopener noreferrer" className="block">
        <p className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-blue-600 hover:bg-blue-50 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer font-semibold" >
          {hadees?.hadiths[0].text}
          <span className="ml-2">↗</span>
        </p>
      </a>}
      {hadees?.hadiths && hadees?.hadiths.length >0 && hadees?.hadiths[0].grades?.map((grade:any, index:number) => (
        <div key={index}  className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black">
          <p>
            {grade.grade} - {grade.name}
          </p>
        </div>
      ))}
      {hadees?.hadiths && hadees?.hadiths.length >0 && <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4">
      <p >book: {hadees?.hadiths[0].reference.book} | hadith: {hadees?.hadiths[0].reference.hadith} | name: {hadees?.metadata.name}</p>
      </div>}
      {hadees?.metadata && hadees?.metadata.section && Object.keys(hadees?.metadata.section).map((key) => (
        <div key={key} className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4">
          <p style={{ fontSize: "1.2rem" }}>{hadees?.metadata.section[key as keyof typeof hadees.metadata.section]}</p>
        </div>
      ))}
      {hadees?.metadata && hadees?.metadata.section_detail && Object.keys(hadees?.metadata.section_detail).map((key) => (
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
        </div>
        <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-gray-800 text-white text-center justify-center gap-4">
        <p className="text-xs">Report at zain.ahmed199524@gmail.com, If you found any wrong hadith</p>
        </div>
      </div>}
    </>
  );
}