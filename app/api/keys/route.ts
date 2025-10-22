export async function GET() {
  return new Response(JSON.stringify({ key: process.env.APIKEYS }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
