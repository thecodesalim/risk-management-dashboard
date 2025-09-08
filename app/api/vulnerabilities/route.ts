import { timestampToDate } from "@/lib/utils";

export async function GET() {
  const headers: HeadersInit = {
    "X-ApiKeys": `${process.env.APIKEYS}`,
  };

  const scans = await fetch(`https://cloud.tenable.com/scans`, {
    method: "GET",
    headers,
  });

  if (!scans.ok) {
    throw new Error(`HTTP error! status: ${scans.status}`);
  }

  const data = await scans.json();

  const scanDetails = await fetch(
    `https://cloud.tenable.com/scans/${data.scans[0].id}`,
    {
      method: "GET",
      headers,
    }
  );

  const scanDetailsData = await scanDetails.json();
  scanDetailsData.dateNx = timestampToDate(data.scans[0].creation_date);
  scanDetailsData.scans = data;

  return new Response(JSON.stringify(scanDetailsData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
