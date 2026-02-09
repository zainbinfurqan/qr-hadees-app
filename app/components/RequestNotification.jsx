'use client';

import { useState } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";

export const  useRequestNotification = () => {
  const [granted, setGranted] = useState(false);

  const enableNotifications = async () => {
    try {
      console.process.env.NODE_ENVlog("Requesting notification permission...");
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      // Register service worker
      const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

      // Get FCM token
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: reg,
      });

      console.log("FCM Token:", token);
        await fetch("/api/save-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fcmtoken: token
          })
        });

      // TODO: Send token to backend (MongoDB or Firebase Admin) to send notifications later

      setGranted(true);
    } catch (err) {
      <p>err</p>
      console.error("Error enabling notifications:", err);
    }
  };

  return {enableNotifications, granted}
}