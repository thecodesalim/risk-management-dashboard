"use client";
import { LockIcon } from "lucide-react";
import Card from "../card";
import { useVulnerabilities } from "@/hooks/vulnerabilities/use-vulnerabilities";
import { RiskScoreResponse } from "@/types";

export default function ComplianceScoreCard() {
  const { vulnerabilities, isLoading } = useVulnerabilities("");
  let finalScore = "0.00";
  let riskLevelText = "Excellent";
  let riskLevelColor = "bg-green-500";
  let riskTextColor = "text-green-500";

  if (vulnerabilities && vulnerabilities.length > 0) {
    const scores = vulnerabilities
      .filter(
        (vulnerability: RiskScoreResponse) =>
          typeof vulnerability.cvss3_base_score === "number"
      )
      .map(
        (vulnerability: RiskScoreResponse) => vulnerability.cvss3_base_score
      );

    if (scores.length > 0) {
      const totalScore = scores.reduce(
        (sum: number, score: number) => sum + score,
        0
      );
      const averageScore = totalScore / scores.length;
      finalScore = averageScore.toFixed(2);

      if (averageScore >= 9.0) {
        riskLevelText = "Critical";
        riskLevelColor = "bg-red-500";
        riskTextColor = "text-red-500";
      } else if (averageScore >= 7.0) {
        riskLevelText = "High";
        riskLevelColor = "bg-orange-500";
        riskTextColor = "text-orange-500";
      } else if (averageScore >= 4.0) {
        riskLevelText = "Medium";
        riskLevelColor = "bg-yellow-500 text-black";
        riskTextColor = "text-yellow-500";
      } else {
        riskLevelText = "Low";
        riskLevelColor = "bg-blue-500";
        riskTextColor = "text-blue-500";
      }

      console.log(`The total sum of cvss3_base_scores is: ${totalScore}`);
      console.log(`The number of scores counted is: ${scores.length}`);
      console.log(`The average cvss3_base_score is: ${finalScore}`);
    } else {
      console.log("No valid cvss3_base_scores were found in the data.");
    }
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <Card
      title="CVSS Base Score"
      icon={<LockIcon className="h-4 w-4 text-muted-foreground" />}
      extra={
        <p
          className={`${riskLevelColor} text-white text-xs font-medium px-4 py-1 w-fit rounded-full`}
        >
          {riskLevelText}
        </p>
      }
    >
      <div className="flex justify-center items-center w-full">
        <p
          className={`${riskTextColor} text-3xl font-semibold px-4 py-1 w-fit rounded-full`}
        >
          {finalScore}
        </p>
      </div>
    </Card>
  );
}
