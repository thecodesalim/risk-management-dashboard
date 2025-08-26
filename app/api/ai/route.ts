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
            text: `Group the following items into back door, malware(trojan, virus, ransomware), ddos, phishing, others. return only a valid JSON format. return only a JSON in this format below:
      {
    "threats": {
        "totalCount": 18,
        "items": [
            {
                "threat_type": "Back Door",
                "threat_id": "WB-21498-20250825-00016",
                "threat_model": "[Heuristic Attribute] Backdoor File Detection",
                "indicators": [
                    "Backdoor.Win32.PLUGX.EYSGVK.enc",
                    "AvastAuth.dat",
                    "192.168.1.122"
                ]
            },
            {
                "threat_type": "Malware",
                "threat_id": "WB-21498-20250825-00015",
                "threat_model": "Unknown Threat Detection and Mitigation via Predictive Machine Learning",
                "indicators": [
                    "TROJ.Win32.TRX.XXPE50FLM011",
                    "EZCastLiteService.exe"
                ]
            },
            {
                "threat_type": "Back Door",
                "threat_id": "WB-21498-20250825-00014",
                "threat_model": "[Heuristic Attribute] Backdoor File Detection",
                "indicators": [
                    "Backdoor.Win32.PLUGX.SM",
                    "wsc.dll",
                    "192.168.240.194"
                ]
            },
            {
                "threat_type": "Malware",
                "threat_id": "WB-21498-20250825-00013",
                "threat_model": "File Detections in Windows Directory - Blocked",
                "indicators": [
                    "Worm.Win32.PYSIS.SM",
                    "tmp00031050"
                ]
            },
            {
                "threat_type": "Malware",
                "threat_id": "WB-21498-20250825-00011",
                "threat_model": "[Heuristic Attribute] Worm File Detection",
                "indicators": [
                    "Worm.Win32.PYSIS.SM",
                    "System Volume Information.exe",
                    "10.2.93.153"
                ]
            },
            {
                "threat_type": "Malware",
                "threat_id": "WB-21498-20250825-00012",
                "threat_model": "File Detections in Windows Directory - Blocked",
                "indicators": [
                    "Worm.Win32.PYSIS.SM",
                    "tmp00030ffe"
                ]
            },
            {
                "threat_type": "Malware",
                "threat_id": "WB-21498-20250825-00010",
                "threat_model": "File Detections in Windows Directory - Blocked",
                "indicators": [
                    "WORM_VB_FB25010D.UVPM",
                    "OlfVir1.exe"
                ]
            },
            {
                "threat_type": "Others",
                "threat_id": "WB-21498-20250825-00009",
                "threat_model": "[Heuristic Attribute] Possible Modify Registry Behavior",
                "indicators": [
                    "Multiple Executable In One Registry"
                ]
            },
            {
                "threat_type": "Malware",
                "threat_id": "WB-21498-20250825-00008",
                "threat_model": "Possible Renamed AutoIt Executable",
                "indicators": [
                    "UMS-Windows-14.12.0-x86_64.exe",
                    "THEY-SHALL-NOT-PASS-GORDON-RYAN.zip"
                ]
            },
            {
                "threat_type": "Malware",
                "threat_id": "WB-21498-20250825-00006",
                "threat_model": "Possible Renamed AutoIt Executable",
                "indicators": [
                    "C:\\Windows\\SysWOW64\\more.com",
                    "ensuer.com"
                ]
            }
        ]
    }
}`,
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
