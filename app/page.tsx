import { RefreshCwIcon, CircleCheckBigIcon, LockIcon } from "lucide-react";
import Card from "@/components/card";
import ThreatDetection from "../components/cards/threat-detection-card";
import ThreatsCard from "../components/cards/threats-card";
import VulnerabilityDetection from "@/components/cards/vulnerability-detection-card";
import VulnerabilitiesCard from "@/components/cards/vulnerabilities-card";
import ThreatCategories from "@/components/cards/threat-categories";
import { RiskScoreCard } from "@/components/cards/risk-score-card";
import ThreatChart from "@/components/cards/threat-chart";
import TotalAssets from "@/components/total-assets";

export default function Home() {
  return (
    <div className="font-sans w-full p-8 ">
      <div className=" flex justify-between items-center mb-8 text-black">
        <div className=" flex items-center">
          <img src={"/logo.svg"} />
          <h1 className=" text-lg font-semibold">Risk Management Dashboard</h1>
        </div>
        <RefreshCwIcon className=" cursor-pointer h-4 w-4" />
      </div>
      <div className=" w-full flex justify-end">
        <TotalAssets />
      </div>
      <main className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-4">
        <RiskScoreCard />
        <ThreatsCard />
        <ThreatCategories />
        <VulnerabilitiesCard />
        <Card
          title="Incidents Resolved"
          icon={
            <CircleCheckBigIcon className="h-4 w-4 text-muted-foreground" />
          }
          extra="Avg. resolution: 2.4h"
        >
          <div className=" flex justify-center items-center w-full">
            <p className=" text-3xl font-semibold text-green-500">12</p>
          </div>
        </Card>

        <Card
          title="Compliance Score"
          icon={<LockIcon className="h-4 w-4 text-muted-foreground" />}
          extra="Excellent"
        >
          <div className=" flex justify-center items-center w-full">
            <p className=" text-3xl text-green-500 font-semibold">72/100</p>
          </div>
        </Card>
        <div className=" col-span-2">
          {/* <Card
            title="Interactions Over Time"
            icon={<ActivityIcon className="h-4 w-4 text-muted-foreground" />}
          >
            <div className=" flex justify-center items-center w-full">
              <p className=" text-3xl font-semibold">Chart</p>
            </div>
          </Card> */}
          <ThreatChart />
        </div>
        <div className=" row-span-2 col-span-2">
          <ThreatDetection />
        </div>
        <div className=" row-span-2 col-span-2">
          <VulnerabilityDetection />
        </div>
      </main>
    </div>
  );
}
