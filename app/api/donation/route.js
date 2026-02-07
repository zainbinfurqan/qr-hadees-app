import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("qr-hadith-app");

    const scans = await db
      .collection("donation")
      .find({})
      .sort({ time: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json(scans);

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "DB fetch failed" },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("qr-hadith-app");

    const result = await db.collection("donation").insertOne({
      ...body,
      createdAt: new Date()
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Insert failed" },
      { status: 500 }
    );
  }
}