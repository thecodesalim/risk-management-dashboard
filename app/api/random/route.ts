export async function GET() {
  const t = await fetch(`https://api.genderize.io/?name=luc`, {
    method: "GET",
  });

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
