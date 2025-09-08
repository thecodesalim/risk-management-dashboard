import { getVulnerabilities } from "@/lib/utils";

export async function GET(request, { params }) {
  const t = await getVulnerabilities(request, { params });

  return new Response(JSON.stringify(t), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
