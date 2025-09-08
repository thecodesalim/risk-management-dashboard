import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

type FormattedDateTime = {
  date: string;
  time: string;
};

export function formatDateTime(isoString: string): FormattedDateTime {
  const date = new Date(isoString);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export async function getThreatsToday() {
  const today = new Date();
  const yesterday = new Date(today);

  today.setUTCHours(12, 0, 0, 0);
  yesterday.setUTCHours(12, 0, 0, 0);

  yesterday.setDate(today.getDate() - 1);

  const endDateTime = today.toISOString().replace(/\.\d{3}Z$/, "Z");
  const startDateTime = yesterday.toISOString().replace(/\.\d{3}Z$/, "Z");

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

  return data;
}

export async function getVulnerabilities(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const { slug } = params || {};

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

export async function getThreats(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const { slug } = params || {};

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

  return data;
}
