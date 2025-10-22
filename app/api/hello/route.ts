export async function GET() {
  return new Response(
    JSON.stringify({
      message: "Hello from the Cyber Risk Dashboard API!",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
