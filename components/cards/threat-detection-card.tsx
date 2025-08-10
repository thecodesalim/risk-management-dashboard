"use client";
import Card from "../card";
import ThreatDetails from "../threat-detail";
import { Select } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import { useThreats } from "@/hooks/vulnerabilities/use-vulnerabilities";
import { formatDateTime } from "@/lib/utils";

export default function ThreatDetection() {
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const { threats, isLoading, loading } = useThreats(selectedSeverity);

  console.log(threats);

  if (isLoading || loading) return "Loading...";
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
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>
      {threats.items.slice(0, 5).map((threat) => (
        <ThreatDetails
          key={threat.id}
          id={threat.id}
          name={threat.model}
          type={threat.type}
          severity={threat.severity}
          time={formatDateTime(threat.createdDateTime).time}
          date={formatDateTime(threat.createdDateTime).date}
          action={"Blocked"}
          description={threat.description}
          deviceID={threat.impactScope.entities[0].entityValue.name}
          ip={threat.impactScope.entities[0].entityValue.ips[0]}
        />
      ))}
    </Card>
  );
}
