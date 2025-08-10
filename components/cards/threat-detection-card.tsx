"use client";
import Card from "../card";
import ThreatDetails from "../threat-detail";
import { Select } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import { useThreats } from "@/hooks/vulnerabilities/use-vulnerabilities";
import { formatDateTime } from "@/lib/utils";
import { SecurityAlert } from "@/types";

export default function ThreatDetection() {
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const { threats, isLoading, loading } = useThreats(selectedSeverity);

  return (
    <Card title="Realtime Threat Detection" extra="">
      <Select
        className={clsx(
          "mt-1 block w-full appearance-none rounded-lg border border-[#D9D9D9] bg-white/5 px-3 py-1.5 text-sm/6 text-black",
          "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
          "*:text-black"
        )}
        name="severity"
        aria-label="Project status"
        value={selectedSeverity}
        onChange={(e) => setSelectedSeverity(e.target.value)}
      >
        <option value="">All</option>
        <option value="critical">Critical</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      <div className="flex-1 overflow-y-auto max-h-96">
        <div className="space-y-4">
          {isLoading || loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg p-4 h-12"></div>
              </div>
            ))
          ) : !threats?.items || threats.items.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No threats found</p>
          ) : (
            threats.items
              .slice(0, 20)
              .map((threat: SecurityAlert) => (
                <ThreatDetails
                  key={threat.id}
                  id={threat.id}
                  name={threat.model}
                  type={""}
                  severity={threat.severity}
                  time={formatDateTime(threat.createdDateTime).time}
                  date={formatDateTime(threat.createdDateTime).date}
                  action={"Blocked"}
                  description={threat.description}
                  deviceID={threat.impactScope.entities[0].entityValue.name}
                  ip={
                    threat.impactScope?.entities?.[0]?.entityValue?.ips?.[0] ||
                    "N/A"
                  }
                />
              ))
          )}
        </div>
      </div>
    </Card>
  );
}
