'use client';
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/lib/firebase";

export default function ForegroundNotifications() {
  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload) => {

      // Only show system notification if permission granted
      if (Notification.permission === "granted") {
        const title = payload.notification?.title
        const options = {
          body: payload.notification?.body || "",
          icon: '/app-icon.jpg',
        };

        try {
          new Notification(title, options);
        } catch (err) {
          console.error("Failed to show notification:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}