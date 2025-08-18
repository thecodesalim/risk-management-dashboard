"use client";
import { useRiskScore } from "@/hooks/vulnerabilities/use-vulnerabilities";
import LoadingState from "./loading-state";

export default function TotalAssets() {
  const { riskScore, isLoading } = useRiskScore();
  return (
    <div>
      {isLoading ? (
        <LoadingState />
      ) : (
        <p className=" text-sm">
          Total Devices{" "}
          <span className="font-medium text-lg">{riskScore.assetCount}</span>{" "}
        </p>
      )}
    </div>
  );
}
