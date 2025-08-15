"use client";
import { ShieldIcon } from "lucide-react";
import Card from "../card";
import { useRiskScore } from "@/hooks/vulnerabilities/use-vulnerabilities";

export function RiskScoreCard() {
  const { riskScore, isLoading, loading } = useRiskScore();

  return isLoading || loading ? (
    <p>Loading...</p>
  ) : (
    <Card
      title="Risk Score"
      icon={<ShieldIcon className="h-4 w-4 text-muted-foreground" />}
      extra={
        riskScore.riskLevel.charAt(0).toUpperCase() +
        riskScore.riskLevel.slice(1)
      }
    >
      <div className="flex justify-center items-center w-full">
        <p className="text-3xl text-orange-500 font-semibold">
          {riskScore.riskIndex}
        </p>
      </div>
    </Card>
  );
}
