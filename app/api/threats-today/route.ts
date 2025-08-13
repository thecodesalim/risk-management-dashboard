export async function GET() {
  return new Response(JSON.stringify(await getThreatsToday()), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  const newUser = { id: Date.now(), name };

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function getThreatsToday() {
  const today = new Date();
  const yesterday = new Date(today);

  today.setUTCHours(12, 0, 0, 0);
  yesterday.setUTCHours(12, 0, 0, 0);

  yesterday.setDate(today.getDate() - 1);

  const endDateTime = today.toISOString().replace(/\.\d{3}Z$/, "Z");
  const startDateTime = yesterday.toISOString().replace(/\.\d{3}Z$/, "Z");

  const t = await fetch(
    `https://api.xdr.trendmicro.com/v3.0/workbench/alerts?startDateTime=${startDateTime}&endDateTime=${endDateTime}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  );

  if (!t.ok) {
    const errorText = await t.text();
    console.log("Error response:", errorText);
    throw new Error(`HTTP error! status: ${t.status}`);
  }

  const data = await t.json();

  return data;
}
