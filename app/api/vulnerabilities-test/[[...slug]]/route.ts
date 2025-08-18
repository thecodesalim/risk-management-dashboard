export async function GET(request: Request, { params }) {
  const t = await getVulnerabilities(request, { params });

  return new Response(JSON.stringify(t), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function getVulnerabilities(request: Request, { params }) {
  const { slug } = (await params) || {};

  const headers: HeadersInit = {
    "X-ApiKeys": `${process.env.APIKEYS}`,
  };

  const t = await fetch(
    `https://cloud.tenable.com/workbenches/vulnerabilities${
      slug !== undefined
        ? "?filter.0.filter=severity&filter.0.quality=eq&filter.0.value=" +
          slug[0]
        : ""
    }`,
    {
      method: "GET",
      headers,
    }
  );

  if (!t.ok) {
    throw new Error(`HTTP error! status: ${t.status}`);
  }

  const data = await t.json();

  return data;
}
