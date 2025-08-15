"use client";

import { GroupIcon } from "lucide-react";
import Card from "../card";
import { useThreatCategories } from "@/hooks/vulnerabilities/use-vulnerabilities";
import { ThreatCounts, ThreatPercentages, ThreatResponse } from "@/types";
import { Progress } from "../ui/progress";

export default function ThreatCategories() {
  const { threatCategories, isLoading, loading } = useThreatCategories();

  if (isLoading || loading || !threatCategories) return "Loading...";

  const t = convertToThreatPercentages(threatCategories);

  return (
    <Card
      title="Threat Categories"
      icon={<GroupIcon className="h-4 w-4 text-muted-foreground" />}
    >
      <div className=" grid grid-row-[1fr_1fr] gap-2 max-h-20 overflow-y-auto w-full">
        {Object.entries(t).map(([threatType, data]) => (
          <ThreatCategoriesItem
            key={threatType}
            type={threatType}
            progress={data.percentage}
          />
        ))}
      </div>
    </Card>
  );
}

function ThreatCategoriesItem({
  type,
  progress,
}: {
  type: string;
  progress: number;
}) {
  return (
    <div className=" flex gap-1 items-center text-sm justify-between">
      <p className=" font-medium">{type}</p>
      <Progress value={progress} color="orangered" className="w-[40%]" />
    </div>
  );
}

function convertToThreatCounts(data?: ThreatResponse): ThreatCounts {
  if (
    !data ||
    !data.threats ||
    !data.threats.items ||
    !Array.isArray(data.threats.items)
  ) {
    return {};
  }

  const counts: ThreatCounts = {};

  data.threats.items.forEach((threat) => {
    const threatType = threat.threat_type.toLowerCase();
    counts[threatType] = (counts[threatType] || 0) + 1;
  });

  return counts;
}

function convertToThreatPercentages(data?: ThreatResponse): ThreatPercentages {
  const counts = convertToThreatCounts(data);
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const percentages: ThreatPercentages = {};

  Object.entries(counts).forEach(([threatType, count]) => {
    percentages[threatType] = {
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    };
  });

  return percentages;
}
