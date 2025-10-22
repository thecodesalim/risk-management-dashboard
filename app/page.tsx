import { RefreshCwIcon, CircleCheckBigIcon } from "lucide-react";
import Card from "@/components/card";
import ThreatDetection from "../components/cards/threat-detection-card";
import ThreatsCard from "../components/cards/threats-card";
import VulnerabilityDetection from "@/components/cards/vulnerability-detection-card";
import VulnerabilitiesCard from "@/components/cards/vulnerabilities-card";
import ThreatCategories from "@/components/cards/threat-categories";
import { RiskScoreCard } from "@/components/cards/risk-score-card";
import ThreatChart from "@/components/cards/threat-chart";
import TotalAssets from "@/components/total-assets";
import ComplianceScoreCard from "@/components/cards/compliance-score-card";
import { Button } from "@headlessui/react";
import ReportModalButton from "@/components/report-modal";

export default function Home() {
  return (
    <div className="font-sans w-full p-8 ">
      <div className=" flex justify-between items-center mb-8 text-black">
        <div className=" flex items-center">
          <img src={"/logo.svg"} alt="logo" />
          <h1 className=" text-lg font-semibold">Cyber Risk Dashboard</h1>
        </div>
        <div className=" flex items-center gap-4">
          <ReportModalButton />

          <Button className="inline-flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm/6 font-medium text-black shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-neutral-100 data-open:bg-neutral-100 ">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      {/* <div className=" w-full flex justify-end">
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
        </Card> */}

      <ComplianceScoreCard />
      {/* <div className=" col-span-2">
          <ThreatChart />
        </div>
        <div className=" row-span-2 col-span-2">
          <ThreatDetection />
        </div>
        <div className=" row-span-2 col-span-2">
          <VulnerabilityDetection />
        </div>
      </main> */}
      {/* <ReportModal open={isOpen} close={() => setIsOpen(false)} /> */}
    </div>
  );
}
