import { getThreats } from "@/lib/utils";

export async function GET(request, { params }) {
  const t = await getThreats(request, { params });

  return new Response(JSON.stringify(t), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
