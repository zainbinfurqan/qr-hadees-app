'use client';

import { useEffect, useState } from "react";
import { useRequestNotification } from "./components/RequestNotification";
import { onMessage } from "firebase/messaging";
import HalfModalExample from "./components/BotttomModel";
import { resourcesLinks } from "./constants/constants";
import HadithDropdown from './components/options'
import { Share  } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { enableNotifications, granted } = useRequestNotification()
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

 useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone
    ) {
      console.log("PWA Mode");
      setIsPWA(true);
    } else {
      console.log("Browser Mode");
      setIsPWA(false);
    }
  }, []);

  return (
    <div className="flex py-10 flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex justify-evenly w-full px-7">
        <HadithDropdown />
        <a
          className="self-end mx-2 top-4 right-4 text-black underline text-sm py-2 px-3 rounded"
          href="/naats"
        >
          Naats
        </a>
      </div>
      <LinkCard url={resourcesLinks[9]}>
        {"Dua's for Ramadam specially"}
      </LinkCard>
      <LinkCard url={resourcesLinks[11]}>
        {"Quran recitation by Yasser Al-Dosari"}
      </LinkCard>
      <LinkCard url={resourcesLinks[8]}>
        {"Qoutes for daily motivation and reflection"}
      </LinkCard>
      <LinkCard url={resourcesLinks[2]}>
        {"Khutbah’s you could listen to pre-Ramadan"}
      </LinkCard>
      <LinkCard url={resourcesLinks[3]}>
        {"Spiritual Talk | WSG | Moeen Mahmood"}
      </LinkCard>
      <LinkCard url={resourcesLinks[4]}>
        {" ⁠App that teaches 80% of the words in Quran Duo Lingo style"}
      </LinkCard>
      <LinkCard url={resourcesLinks[5]}>
        {"⁠Project Zamzam, visual summary of Surahs playlist"}
      </LinkCard>
      <LinkCard url={resourcesLinks[6]}>
        {"Reflecting_On_the_Names_of_Allah"}
      </LinkCard>
      <LinkCard url={resourcesLinks[7]}>
        {"How to prepare for Ramadan | Moeen Mahmood | Short"}
      </LinkCard>
      <LinkCard url={resourcesLinks[10]}>
        {"Life Is Full of Hardships"}
      </LinkCard>
      <LinkCard url={resourcesLinks[0]}>{"Khutbah 6th Feb"}</LinkCard>
      <LinkCard url={resourcesLinks[1]}>{"Khutbah 30th Jan"}</LinkCard>
      {!isPWA && (
        <HalfModalExample>
          <>
            <div className="py-3">
              <p className="text-lg text-center">Install the App</p>
            </div>
            <div className="flex items-center mb-2">
              <div className="flex-shrink-0 w-4 h-4 text-xs bg-green-800 text-white font-bold rounded flex items-center justify-center mr-1">
                1
              </div>
              <p className="text-gray-700 text-sm flex items-center">
                Open this page in Safari
              </p>
            </div>

            <div className="flex items-center mb-2">
              <div className="flex-shrink-0 w-4 h-4 text-xs bg-green-800 text-white font-bold rounded flex items-center justify-center mr-1">
                2
              </div>
              <p className="text-gray-700 text-sm flex items-center">
                Tap the{" "}
                <Share
                  style={{
                    margin: "0px 4px",
                  }}
                  size={15}
                />{" "}
                button
              </p>
            </div>

            <div className="flex items-center mb-2">
              <div className="flex-shrink-0 w-4 h-4 text-xs bg-green-800 text-white font-bold rounded flex items-center justify-center mr-1">
                3
              </div>
              <p className="text-gray-700 text-sm flex items-center">
                Select{" "}
                <span className="mx-1 bg-gray-100 px-1 rounded">
                  {" "}
                  Add to Home Screen
                </span>
              </p>
            </div>

            <div className="flex items-center mb-2">
              <div className="flex-shrink-0 w-4 h-4 text-xs bg-green-800 text-white font-bold rounded flex items-center justify-center mr-1">
                4
              </div>
              <p className="text-gray-700 text-sm flex items-center">
                Look for the{" "}
                <Image
                  alt=""
                  src="/app-icon.jpg"
                  width={20}
                  height={20}
                  className="mx-1"
                />{" "}
                on your home screen
              </p>
            </div>
          </>
        </HalfModalExample>
      )}
    </div>
  )
}

function getLinkType(url) {
  if (!url) return "other";
  const lower = url.toLowerCase();
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  if (lower.includes("facebook.com") || lower.includes("fb.watch") || lower.includes("fb.com") || lower.includes("m.facebook.com")) return "facebook";
  if (lower.includes("apps.apple.com")) return "app-apple";
  if (lower.includes("play.google.com")) return "app-play";
  if (lower.includes("assabile")) return "audio"
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
  const type = getLinkType(url)
  const normalizedUrl =
    typeof url === "string" ? url.replace(/^\/+(?=https?:\/\/)/i, "") : url
  const badgeText =
    type === "youtube"
      ? "YouTube"
      : type === "pdf"
        ? "PDF"
        : type === "facebook"
          ? "Facebook"
          : type === "app-apple"
            ? "App Store"
            : type === "app-play"
              ? "Google Play"
              : type === "audio"
                ? "Audio"
                : null
  const badgeClass =
    type === "youtube"
      ? "bg-red-600"
      : type === "pdf"
        ? "bg-gray-800"
        : type === "facebook"
          ? "bg-blue-600"
          : type === "app-apple"
            ? "bg-black"
            : type === "audio"
              ? "bg-black"
              : null
  return (
    <a
      href={normalizedUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        badgeText ? `Open ${badgeText} (new tab)` : "Open link (new tab)"
      }
      className="block"
    >
      <div className=" w-96 text-center relative rounded rounded-lg overflow-hidden shadow-lg p-4 mt-4 bg-white text-black hover:shadow-xl transition">
        {badgeText && (
          <span
            className={` absolute top-2 right-2 text-xs px-2 py-1 rounded text-white ${badgeClass}`}
          >
            {badgeText}{" "}
            {type === "youtube" ||
            type === "facebook" ||
            type === "app-apple" ||
            type === "app-play"
              ? "▶"
              : ""}
          </span>
        )}
        {badgeText == null && (
          <span
            className={` absolute top-2 right-2 text-xs px-2 py-1 rounded text-white bg-black`}
          >
            Images
          </span>
        )}
        <div className="mt-5">{children}</div>
      </div>
    </a>
  )
}
