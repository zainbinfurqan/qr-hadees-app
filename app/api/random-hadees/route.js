import axios from "axios";

export async function GET() {

    const editions = [
        'eng-abudawud',
        'eng-bukhari',
        'eng-muslim',
        'eng-tirmidhi',
        'eng-nasai',
        'eng-ibnmajah'
    ];
    const randomEdition = editions[Math.floor(Math.random() * editions.length)
    ]
  try {
    const response = await axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${randomEdition}/${Math.floor(Math.random() * 5000)}.json`
    );
    const hadeesList = response.data;
    return new Response(JSON.stringify({ text: hadeesList }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ text: "Failed to fetch hadees" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}