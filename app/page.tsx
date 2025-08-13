import {
  RefreshCwIcon,
  ShieldIcon,
  CircleCheckBigIcon,
  ActivityIcon,
  LockIcon,
} from "lucide-react";
import Card from "@/components/card";
import ThreatDetection from "../components/cards/threat-detection-card";
import ThreatsCard from "../components/cards/threats-card";
import VulnerabilityDetection from "@/components/cards/vulnerability-detection-card";
import VulnerabilitiesCard from "@/components/cards/vulnerabilities-card";
import ThreatCategories from "@/components/cards/threat-categories";

export default function Home() {
  return (
    <div className="font-sans w-full p-8 ">
      <div className=" flex justify-between mb-8 text-black">
        <div className=" flex items-center">
          <img src={"/logo.svg"} />
          <h1 className=" text-lg font-semibold">Risk Management Dashboard</h1>
        </div>
        <RefreshCwIcon className=" cursor-pointer" />
      </div>
      <main className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-4">
        <Card title="Risk Score" icon={<ShieldIcon />} extra="Medium">
          <div className=" flex justify-center items-center w-full">
            <p className=" text-3xl text-orange-500 font-semibold">72/100</p>
          </div>
        </Card>
        <ThreatsCard />
        <ThreatCategories />
        <VulnerabilitiesCard />
        <Card
          title="Incidents Resolved"
          icon={<CircleCheckBigIcon />}
          extra="Avg. resolution: 2.4h"
        >
          <div className=" flex justify-center items-center w-full">
            <p className=" text-3xl font-semibold text-green-500">12</p>
          </div>
        </Card>

        <Card title="Compliance Score" icon={<LockIcon />} extra="Excellent">
          <div className=" flex justify-center items-center w-full">
            <p className=" text-3xl text-green-500 font-semibold">72/100</p>
          </div>
        </Card>
        <div className=" col-span-2">
          <Card title="Interactions Over Time" icon={<ActivityIcon />}>
            <div className=" flex justify-center items-center w-full">
              <p className=" text-3xl font-semibold">Chart</p>
            </div>
          </Card>
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
