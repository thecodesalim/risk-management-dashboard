export async function GET(request: Request, { params }) {
  const { slug } = await params;

  const today = new Date();
  const yesterday = new Date(today);

  today.setUTCHours(12, 0, 0, 0);
  yesterday.setUTCHours(12, 0, 0, 0);

  yesterday.setDate(today.getDate() - 1);

  const endDateTime = today.toISOString().replace(/\.\d{3}Z$/, "Z");
  const startDateTime = yesterday.toISOString().replace(/\.\d{3}Z$/, "Z");

  const headers: HeadersInit = {
    Authorization: `Bearer ${process.env.TOKEN}`,
  };

  if (typeof slug !== "undefined") {
    headers["TMV1-Filter"] = `severity eq '${slug[0]}'`;
  }

  const t = await fetch(
    `https://api.xdr.trendmicro.com/v3.0/workbench/alerts`,
    {
      method: "GET",
      headers,
    }
  );

  if (!t.ok) {
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
