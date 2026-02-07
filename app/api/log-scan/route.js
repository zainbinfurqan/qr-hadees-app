import clientPromise from "../../../lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("qr_tracking");

    const ip =
      req.headers.get("x-forwarded-for") || req.ip || "unknown";

    await db.collection("scans").insertOne({
      ip,
      ...body,
    });

    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to log scan" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}