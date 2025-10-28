export async function GET() {
  return new Response(
    JSON.stringify({
      key: process.env.APIKEYS,
      token: process.env.TOKEN,
      gemini: process.env.GEMINI,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
