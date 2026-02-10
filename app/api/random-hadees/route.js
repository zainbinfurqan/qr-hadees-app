import axios from "axios";

export async function GET(request) {
const { searchParams } = new URL(request.url);
    const editions = [
        'eng-abudawud',
        'eng-bukhari',
        'eng-muslim',
        'eng-tirmidhi',
        'eng-nasai',
        'eng-ibnmajah'
    ];
    let randomEdition = editions[Math.floor(Math.random() * editions.length)];
    let randomHadithNumber = Math.floor(Math.random() * 5000)
    if(searchParams.get("edition") && searchParams.get("number")){
        randomEdition = searchParams.get("edition");
        randomHadithNumber = searchParams.get("number");
    }
  try {
    const response = await axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${randomEdition}/${randomHadithNumber}.json`
    );
    // const a = randomEdition
    const responseUrdu = await axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${randomEdition.replace("eng", "urd")}/${randomHadithNumber}.json`
    );
    const hadeesList = response.data;
    return new Response(JSON.stringify({ text: hadeesList, urdu:responseUrdu.data?.hadiths[0]?.text }), {
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