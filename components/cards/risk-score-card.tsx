"use client";
import { ShieldIcon } from "lucide-react";
import Card from "../card";
import { useRiskScore } from "@/hooks/vulnerabilities/use-vulnerabilities";

export function RiskScoreCard() {
  const { riskScore, isLoading } = useRiskScore();

  return (
    <Card
      loading={isLoading || !riskScore}
      title="Risk Score"
      icon={<ShieldIcon className="h-4 w-4 text-muted-foreground" />}
      extra={
        <p
          className={`${
            riskScore?.riskLevel === "critical"
              ? "bg-red-500"
              : riskScore?.riskLevel === "high"
              ? "bg-orange-500"
              : riskScore?.riskLevel === "medium"
              ? "bg-yellow-600"
              : "bg-green-500"
          } text-white text-xs font-medium px-4 py-1 w-fit rounded-full`}
        >
          {riskScore?.riskLevel.charAt(0).toUpperCase() +
            riskScore?.riskLevel.slice(1)}
        </p>
      }
    >
      <div className="flex justify-center items-center w-full">
        <p
          className={`${
            riskScore?.riskLevel === "critical"
              ? "text-red-500"
              : riskScore?.riskLevel === "high"
              ? "text-orange-500"
              : riskScore?.riskLevel === "medium"
              ? "text-yellow-600"
              : "text-green-500"
          } text-white text-3xl font-semibold px-4 py-1 w-fit rounded-full`}
        >
          {riskScore?.riskIndex}
        </p>
      </div>
    </Card>
  );
}
