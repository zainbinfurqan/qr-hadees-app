'use client';

import { use, useEffect, useState } from "react";
import { useRequestNotification } from "./components/RequestNotification";
import { onMessage } from "firebase/messaging";
import  { usePWAInstall } from "./components/InstallPWAButton";
import HalfModalExample from "./components/BotttomModel";
import { Share, X,  } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { enableNotifications, granted } = useRequestNotification()
  const { canInstall, install } = usePWAInstall()
  const [isPWA, setIsPWA] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Foreground messages
    onMessage((payload) => {
      if (Notification.permission === "granted") {
        new Notification(payload.notification?.title || "Notification", {
          body: payload.notification?.body || "",
          icon: "/app-icon.jpg",
        });
      }
    });
        window.addEventListener("click", (e) => {
        
          if(granted !== 'granted'){
enableNotifications()
          }
    return () => {
      window.removeEventListener("click", (e) => log("click", e));
    };
    });
  }, [granted]);
 

  const links = [
    "/https://www.dropbox.com/scl/fi/kfhk0787n9clf2cgk7r9i/Khutbah-6th-Feb.pdf?rlkey=awwxj3hb25gpd8vzqgcvpsg0q&st=n171559a&dl=0",
    "https://www.dropbox.com/scl/fi/r8oo2ks35thmth3bs2ro5/Khutbah-30th-Jan.pdf?rlkey=zn2qiu73vjgxm88sgdc3ghkdq&st=5cvr7vzx&dl=0",
    "https://www.facebook.com/watch/?v=1704157787629794",
    "https://www.youtube.com/watch?v=A1JncuGkBmY",
    "https://apps.apple.com/my/app/think-quran/id6449696143",
    "https://youtube.com/playlist?list=PLOgzoHFjWOqNVDWPGHwjzrEQ9bgMKSKQ1&si=aLTASKq1MT-YRA9V",
    "https://www.dropbox.com/scl/fi/vbiuh9s8jetdt07831o9x/Reflecting_On_the_Names_of_Allah.pdf?rlkey=rebw2nfrfhce0yeyxrk6z3g9z&st=txo6puou&dl=0",
    "https://youtube.com/shorts/pJ7o-ZKyIZQ?si=XcJ-el3KVHstCBbK",
    "https://www.dropbox.com/scl/fo/w496a8jr214tw7zt8irt0/AAV9WoAHCP7d-JGE7kY30hA?rlkey=awb8vx0e1kt6uty77ct6h9ys8&st=33sq50we&dl=0",
    "https://www.dropbox.com/scl/fo/1hvjiu5h9pl0vlc5dtq72/ADl6RaQfqeHUFRZnfFO7t-I?rlkey=4yn1e8lbqchyktxm0d3mxe8oc&st=7w0vvogf&dl=0",
    "https://www.youtube.com/watch?v=ZcwdOdV05J0"
  ]

  const InstallPWAButton = () => {
    if (!canInstall) return null;

  return (
    <button onClick={install}>
      📲 Install App
    </button>
  );
}

 useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone
    ) {
      console.log("PWA Mode");
      setIsPWA(true);
    } else {
      console.log("Browser Mode");
    }setIsPWA(false);
  }, []);

  return (
    <div className="flex py-10 flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="flex justify-evenly w-full px-7">
      {/* <InstallPWAButton/> */}
        <a className="self-end mx-2 top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white text-sm   py-1 px-2 rounded" href="/another">Random Hadith</a>
        <a className="self-end mx-2 top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded" href="/ramadan">Ramadan/Fasting Hadith</a>
        </div>
      <LinkCard url={links[9]}>
  {"Dua's for Ramadam specialy"}
</LinkCard>
     <LinkCard url={links[8]}>
  {"Qoutes for daily motivation and reflection"}
</LinkCard>
<LinkCard url={links[2]}>
  {"Khutbah’s you could listen to pre-Ramadan"}
</LinkCard>
<LinkCard url={links[3]}>
  {"Spiritual Talk | WSG | Moeen Mahmood"}
</LinkCard>
<LinkCard url={links[4]}>
  {" ⁠App that teaches 80% of the words in Quran Duo Lingo style"}
</LinkCard>
<LinkCard url={links[5]}>
  {"⁠Project Zamzam, visual summary of Surahs playlist"}
</LinkCard>
<LinkCard url={links[6]}>
  {"Reflecting_On_the_Names_of_Allah"}
</LinkCard>
<LinkCard url={links[7]}>
  {"How to prepare for Ramadan | Moeen Mahmood | Short"}
</LinkCard>
<LinkCard url={links[10]}>
  {"Life Is Full of Hardships"}
</LinkCard>
 <LinkCard url={links[0]}>
  {"Khutbah 6th Feb"}
</LinkCard>
<LinkCard url={links[1]}>
  {"Khutbah 30th Jan"}
</LinkCard>
{!isPWA && <HalfModalExample>
  <>
    <div className="py-3">
      <p className="text-lg text-center">Install the App</p>
    </div>
  <div className="flex items-center mb-2">
  
  <div className="flex-shrink-0 w-4 h-4 text-xs bg-green-800 text-white font-bold rounded flex items-center justify-center mr-1">1
  </div>
              <p className="text-gray-700 text-sm flex items-center">Open this page in Safari</p>
  </div>

 <div className="flex items-center mb-2">
  <div className="flex-shrink-0 w-4 h-4 text-xs bg-green-800 text-white font-bold rounded flex items-center justify-center mr-1">2
  </div>
              <p className="text-gray-700 text-sm flex items-center">Tap the <Share style={{
                margin: '0px 4px'
              }} size={15}/> button</p>
  </div>

   <div className="flex items-center mb-2">
  <div className="flex-shrink-0 w-4 h-4 text-xs bg-green-800 text-white font-bold rounded flex items-center justify-center mr-1">3
  </div>
              <p className="text-gray-700 text-sm flex items-center">Select <span className="mx-1 bg-gray-100 px-1 rounded"> Add to Home Screen</span></p>
  </div>

   <div className="flex items-center mb-2">
  <div className="flex-shrink-0 w-4 h-4 text-xs bg-green-800 text-white font-bold rounded flex items-center justify-center mr-1">4
  </div>
              <p className="text-gray-700 text-sm flex items-center">Look for the <Image alt='' src="/app-icon.jpg" width={20} height={20} className="mx-1"/> on your home screen</p>
  </div>
  </>
</HalfModalExample>}
    </div>
  );
}

function getLinkType(url) {
  if (!url) return "other";
  const lower = url.toLowerCase();
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  if (lower.includes("facebook.com") || lower.includes("fb.watch") || lower.includes("fb.com") || lower.includes("m.facebook.com")) return "facebook";
  if (lower.includes("apps.apple.com")) return "app-apple";
  if (lower.includes("play.google.com")) return "app-play";
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.toLowerCase();
    if (path.endsWith(".pdf")) return "pdf";
  } catch (e) {
    // ignore invalid URL parsing
  }
  // handle links where .pdf appears before query params (e.g. Dropbox share links)
  if (lower.match(/\.pdf(\b|$|[?#])/)) return "pdf";
  return "other";
}

const LinkCard = ({ url, children }) => {
  const type = getLinkType(url);
    const normalizedUrl = typeof url === "string" ? url.replace(/^\/+(?=https?:\/\/)/i, "") : url;

  const badgeText =
    type === "youtube" ? "YouTube" :
    type === "pdf" ? "PDF" : 
    type === "facebook" ? "Facebook" :
    type === "app-apple" ? "App Store" :
    type === "app-play" ? "Google Play" : null;
  const badgeClass =
    type === "youtube" ? "bg-red-600" :
    type === "pdf" ? "bg-gray-800" :
    type === "facebook" ? "bg-blue-600" :
    type === "app-apple" ? "bg-black" :
    type === "app-play" ? "bg-green-600" : "bg-transparent";
  return (
    <a
      href={normalizedUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={badgeText ? `Open ${badgeText} (new tab)` : "Open link (new tab)"}
      className="block"
    >
      <div className=" w-96 text-center relative rounded rounded-lg overflow-hidden shadow-lg p-4 mt-4 bg-white text-black hover:shadow-xl transition">
        {badgeText && (
          <span className={` absolute top-2 right-2 text-xs px-2 py-1 rounded text-white ${badgeClass}`}>
            {badgeText} {(type === "youtube" || type === "facebook" || type === "app-apple" || type === "app-play") ? "▶" : ""}
          </span>
        )}
        {badgeText == null && (
          <span className={` absolute top-2 right-2 text-xs px-2 py-1 rounded text-white bg-black`}>
            Images
          </span>
        )}
        <div className="mt-5">{children}</div>
      </div>
    </a>
  );
}
