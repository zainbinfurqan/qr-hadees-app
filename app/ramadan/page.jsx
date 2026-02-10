'use client'
import { useEffect, useState , useRef} from "react"
import * as htmlToImage from 'html-to-image';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Image as ImageIcon, FileText } from "lucide-react";

const ramadan_hadees = {
    "eng-abudawud":[[1371, 1400], [2313, 2476]],
    "eng-bukhari": [1891, 2013],
    "eng-ibnmajah": [1638, 1782],
    "eng-muslim": [2495, 2779],
    "eng-nasai": [2090, 2434],
    "eng-tirmidhi": [682, 808],
}
const editions = [
        'eng-abudawud',
        'eng-bukhari',
        'eng-muslim',
        'eng-tirmidhi',
        'eng-nasai',
        'eng-ibnmajah'
    ];
const books = {
  "Sunan an Nasai": "Nasai",
  "Sahih Muslim": "Muslim",
  "Sunan Abu Dawud": "AbuDawood",
  "Jami At Tirmidhi": "Tirmidhi",
  "Sunan Ibn Majah": "IbnMajah",
  "Sahih al Bukhari": "Bukhari"
}

export default function Page() {
  const [hadees, setHadees] = useState(null);
  const [urduTranslation, setUrduTranslation] = useState(null);
  const [linkToHadith, setLinkToHadith] = useState("");
useEffect(() => {
  hadees && setLinkToHadith(`https://sunnah.com/${books[hadees?.metadata.name]}:${hadees?.hadiths[0].hadithnumber}`);
},[hadees])

    const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

    useEffect(() => {
        document.title = 'Ramadan Hadees';
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', 'Ramadan Hadees App - Read random authentic hadees during Ramadan with Urdu translation.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Ramadan Hadees App - Read random authentic hadees during Ramadan with Urdu translation.';
      document.head.appendChild(meta);
    }
    }, []);

    function getRandomRamadanHadeesRef() {
  // step 1 — random edition
  const edition = editions[Math.floor(Math.random() * editions.length)];
  // step 2 — get ranges
  const ranges = ramadan_hadees[edition];
  if (!ranges) return null;

  let chosenRange;

  // step 3 — check if single range or multiple ranges
  if (Array.isArray(ranges[0])) {
    // multiple ranges → pick random range
    chosenRange = ranges[Math.floor(Math.random() * ranges.length)];
  } else {
    // single range
    chosenRange = ranges;
  }

  // step 4 — random number from chosen range
  const number = randBetween(chosenRange[0], chosenRange[1]);

  return { edition, number };
}

    async function fetchHadees() {
      try {
       const ref = getRandomRamadanHadeesRef();
        const res = await fetch(`/api/random-hadees?edition=${ref.edition}&number=${ref.number}`);
        const data = await res.json();
        setHadees(data.text);
        setUrduTranslation(data.urdu);
      } catch (err) {
        console.error(err);
      }
    }
    useEffect(() => {
         fetchHadees()
    }, [])

// --text to image //
const ref = useRef();


  const shareImage = async () => {
    const dataUrl = await htmlToImage.toPng(ref.current);

    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], "text-image.png", { type: "image/png" });

    if (navigator.share) {
      await navigator.share({
        title: "Hadees Image",
        files: [file],
      });
    } else {
      alert("Share not supported on this browser");
    }
  };

//   text to PDF //
const sharePDF = async () => {
    const element = ref.current;

    const canvas = await html2canvas(element, {
      scale: 3, // better quality
      onclone: (doc) => {
        doc.querySelectorAll("*").forEach(el => {
        el.style.color = "#000";
        el.style.backgroundColor = "#fff";
        });
  }
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a3");

    const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 10; // ✅ margin mm
    let position = margin;
    const imgWidth = pageWidth - margin * 2;
     const pxPerMm = canvas.width / imgWidth;

    const imgHeight = canvas.height * imgWidth / canvas.width;
const pageHeightPx = (pageHeight - margin * 2) * pxPerMm;
   
  let y = 0;

  while (y < canvas.height) {
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvas.width;
    pageCanvas.height = Math.min(pageHeightPx, canvas.height - y);

    const ctx = pageCanvas.getContext("2d");

    ctx.drawImage(
      canvas,
      0,
      y,
      canvas.width,
      pageCanvas.height,
      0,
      0,
      canvas.width,
      pageCanvas.height
    );

    const imgData = pageCanvas.toDataURL("image/png");

    if (y > 0) pdf.addPage();

    const imgHeight = pageCanvas.height / pxPerMm;

    pdf.addImage(
      imgData,
      "PNG",
      margin,
      margin,
      imgWidth,
      imgHeight
    );

    y += pageHeightPx;
  }
     // download fallback
    pdf.save("Hadees.pdf");

    // share option
    const blob = pdf.output("blob");
    const file = new File([blob], "Hadees.pdf", {
      type: "application/pdf",
    });

    if (navigator.share) {
      await navigator.share({
        files: [file],
        title: "Hadees PDF",
      });
    }
  };

    return (
        hadees && <div className=" max-w-md rounded overflow-hidden shadow-lg mx-auto p-6 mt-2 bg-green-900 text-center text-white">
            <div className="flex flex-row justify-between">
      <a href="/" className="flex">
      <span aria-hidden="true" className="mr-1">←</span>
      <p className="text-right text-sm ">Home</p>
      </a>
        </div>
      <h1 className="font-bold text-xl mb-2">Hadees</h1>
      <div className="flex flex-row  gap-4 justify-end">
        <p>Share</p>
        <p className="cursor-pointer" onClick={shareImage}><ImageIcon size={20} /></p>
        <p className="cursor-pointer" onClick={sharePDF}><FileText size={20} /></p>
      </div>
      <div className="flex flex-row text-center justify-center gap-4 mb-4 rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black">
      {hadees?.hadiths && hadees?.hadiths.length >0 && <p>Arabic Number: {hadees?.hadiths[0].arabicnumber}</p>}
      {hadees?.hadiths && hadees?.hadiths.length >0 && <p>Hadith Number: {hadees?.hadiths[0].hadithnumber}</p>}
      </div>
      
      {<div ref={ref}>
      {hadees?.hadiths && hadees?.hadiths.length >0 && <a href={linkToHadith} target="_blank" rel="noopener noreferrer" className="block">
        <p className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-blue-600 hover:bg-blue-50 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer font-semibold" >
          {hadees?.hadiths[0].text}
          <span className="ml-2">↗</span>
        </p>
      </a>}
      {
        urduTranslation && 
        <a href={linkToHadith} target="_blank" rel="noopener noreferrer" className="block">
            <div className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-blue-600 hover:bg-blue-50 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer font-semibold">
          <p className="font-bold mb-2">Urdu Translation:</p>
          <p>{urduTranslation}</p>
        </div>
        </a>
      }
      </div>}
      {hadees?.hadiths && hadees?.hadiths.length >0 && hadees?.hadiths[0].grades?.map((grade, index) => (
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
          <p style={{ fontSize: "1.2rem" }}>{hadees?.metadata.section[key]}</p>
        </div>
      ))}
      {hadees?.metadata && hadees?.metadata.section_detail && Object.keys(hadees?.metadata.section_detail).map((key) => (
        <div key={key}>
        <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4">

        <p>Arabic number first: {hadees?.metadata.section_detail[key].arabicnumber_first}</p>
        <p>Arabic number last: {hadees?.metadata.section_detail[key].arabicnumber_last}</p>
        </div>
        <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4">
        
        <p>Hadith number first: {hadees?.metadata.section_detail[key].hadithnumber_first}</p>
        <p>Hadith number last: {hadees?.metadata.section_detail[key].hadithnumber_last}</p>
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
      </div>
    )
}