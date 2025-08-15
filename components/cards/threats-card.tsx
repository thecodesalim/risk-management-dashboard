"use client";
import { Bug } from "lucide-react";
import Card from "../card";
import useSWR from "swr";
import { useThreats } from "@/hooks/vulnerabilities/use-vulnerabilities";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ThreatsCard() {
  const { data: threats, isLoading } = useSWR("api/threats-today", fetcher);

  const {
    data: t,
    error: e,
    isLoading: tLoading,
  } = useSWR("api/threats-yesterday", fetcher);

  if (e) return "An error has occurred.";
  if (isLoading || tLoading) return "Loading...";

  const diff = threats.totalCount - t.totalCount;

  return (
    <Card
      title="Threats"
      icon={<Bug className="h-4 w-4 text-muted-foreground" />}
      extra={
        <p>
          <span
            className={`${diff > 0 ? " text-red-500" : " text-green-500"} `}
          >
            {`${diff > 0 ? "+" : ""}${diff} `}
          </span>
          from yesterday
        </p>
      }
    >
      <div className=" flex justify-center items-center w-full">
        <p className=" text-3xl text-red-500 font-semibold">
          {threats.totalCount}
        </p>
      </div>
    </Card>
  );
}
