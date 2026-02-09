import admin from "@/lib/firebase-admin";

export async function POST(req) {
  const { token } = await req.json();

  await admin.messaging().send({
    token,
    notification: {
      title: "Daily Hadith 📿",
      body: "Read today's Hadith"
    }
  });

  return Response.json({ success: true });
}