export async function GET() {
  const now = new Date();

  const endDate = new Date(now);
  endDate.setDate(now.getDate() - 1);
  endDate.setUTCHours(12, 0, 0, 0);

  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 2);
  startDate.setUTCHours(12, 0, 0, 0);

  const endDateTime = endDate.toISOString().replace(/\.\d{3}Z$/, "Z");
  const startDateTime = startDate.toISOString().replace(/\.\d{3}Z$/, "Z");

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

  return new Response(JSON.stringify(data), {
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
