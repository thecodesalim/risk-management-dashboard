export async function GET() {
  const t = await fetch(
    `https://api.xdr.trendmicro.com/v3.0/asrm/assetGroups`,
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

  return new Response(JSON.stringify(data.items[0]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
