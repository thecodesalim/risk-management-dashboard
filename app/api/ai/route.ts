import { getThreatsToday } from "../threats-today/route";

export async function GET() {
  const API_KEY = process.env.GEMINI || "";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;
  const threats = await getThreatsToday();

  const headers: HeadersInit = {
    "x-goog-api-key": API_KEY,
    "Content-Type": "application/json",
  };

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `Group the following items into the type of cybersecurity threats e.g brute force, malware, ddos, phishing, etc. return only a valid JSON format {
  "threats": {
    "totalCount": 31,
    "count": 10,
    "items": [
      {
        "threat_type": "Command and Control",
        "threat_id": "WB-21498-20250813-00023",
        "threat_model": "[Heuristic Attribute] Command and Control - Application Layer Protocol"
      },  
    ]
  }
}.`,
          },
          {
            text: JSON.stringify(threats),
          },
        ],
      },
    ],
  };

  const t = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  });

  const data = await t.json();

  const responseText = data.candidates[0].content.parts[0].text;

  let cleanJsonString = responseText.trim();
  if (cleanJsonString.startsWith("```json")) {
    cleanJsonString = cleanJsonString.slice(7, -3).trim();
  }

  const classifiedThreats = JSON.parse(cleanJsonString);

  return new Response(JSON.stringify(classifiedThreats), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
