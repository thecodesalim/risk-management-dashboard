"use client";
import { Bug, TrendingDown, TrendingUp } from "lucide-react";
import Card from "../card";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ThreatsCard() {
  const { data: threats, isLoading } = useSWR("api/threats-today", fetcher);
  const {
    data: t,
    error: e,
    isLoading: tLoading,
  } = useSWR("api/threats-yesterday", fetcher);

  if (e) return "An error has occurred.";

  if (isLoading || tLoading || !threats || !t) {
    return (
      <Card
        title="Threats"
        icon={<Bug className="h-4 w-4 text-muted-foreground" />}
        loading={true}
      >
        <div className="flex justify-center items-center w-full">
          <p className="text-3xl text-gray-400 font-semibold">--</p>
        </div>
      </Card>
    );
  }

  const diff = threats.totalCount - t.totalCount;

  return (
    <Card
      title="Threats"
      icon={<Bug className="h-4 w-4 text-muted-foreground" />}
      extra={
        <p className=" flex gap-1 items-center">
          {diff <= 0 ? (
            <TrendingDown className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingUp className="h-3 w-3 text-red-500" />
          )}
          <span className={`${diff > 0 ? "text-red-500" : "text-green-500"}`}>
            {`${diff > 0 ? "+" : ""}${diff} `}
          </span>
          from yesterday
        </p>
      }
      loading={false}
    >
      <div className="flex justify-center items-center w-full">
        <p className="text-3xl text-red-500 font-semibold">
          {threats.totalCount}
        </p>
      </div>
    </Card>
  );
}
