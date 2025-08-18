"use client";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CheckCircleIcon,
  ShieldAlertIcon,
  Calendar,
  Target,
  TriangleAlertIcon,
} from "lucide-react";
import Card from "../card";
import { useVulnerabilityDetails } from "@/hooks/vulnerabilities/use-vulnerabilities";

import { ModalProps } from "@/types";
import { timestampToDate } from "@/lib/utils";

export default function VulnerabilitiesCard() {
  const { vulnerabilities, isLoading } = useVulnerabilityDetails();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading || !vulnerabilities) {
    return (
      <Card
        title="Vulnerabilities"
        icon={<TriangleAlertIcon className="h-4 w-4 text-muted-foreground" />}
        loading={true}
      >
        <div className="flex justify-center items-center w-full">
          <p className="text-3xl text-gray-400 font-semibold">--</p>
        </div>
      </Card>
    );
  }

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <Card
      onClick={handleClick}
      title="Vulnerabilities"
      icon={<TriangleAlertIcon className="h-4 w-4 text-muted-foreground" />}
      extra={`${vulnerabilities?.info?.name} - ${vulnerabilities?.dateNx}`}
      loading={false}
    >
      <div className="flex justify-center items-center w-full cursor-pointer">
        <p className="text-3xl text-orange-500 font-semibold">
          {vulnerabilities?.hosts[0].score || 0}
        </p>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        vulnerabilities={vulnerabilities?.scans?.scans || []}
        finding={vulnerabilities?.hosts[0].score || 0}
      />
    </Card>
  );
}

function ModalItem({
  name,
  time,
  finding,
  targets,
}: {
  name: string;
  time: number;
  finding: number;
  targets: number;
}) {
  return (
    <div className="flex flex-col gap-4 border border-neutral-200 rounded-lg p-4 py-6 text-sm ">
      <div className="flex items-center gap-2">
        <CheckCircleIcon className="h-4 w-4 text-green-500" />
        <p className="font-medium">{name}</p>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-gray-500" />
          <p className="text-xs text-gray-500">{timestampToDate(time)}</p>
        </div>
        <div className="flex items-center gap-1">
          <ShieldAlertIcon className="h-3 w-3 text-gray-500" />
          <p className="text-xs text-gray-500">{`${finding} ${
            finding > 1 ? "Findings" : "Finding"
          }`}</p>
        </div>
        <div className="flex items-center gap-1">
          <Target className="h-3 w-3 text-gray-500" />
          <p className="text-xs text-gray-500">{`${targets || 0} ${
            targets > 1 ? "Targets" : "Target"
          }`}</p>
        </div>
      </div>
    </div>
  );
}

function Modal({ isOpen, onClose, vulnerabilities, finding }: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50 text-black"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-h-[80vh] flex flex-col max-w-lg border border-[#EBEBEB] rounded bg-white w-full">
          <div className="p-6 border-b border-[#EBEBEB]">
            <DialogTitle className="font-medium">
              <div className="flex flex-row gap-4 mb-2">
                <TriangleAlertIcon />
                <p>Vulnerability Scan Details</p>
              </div>
              <p className="font-normal text-neutral-500 text-sm">
                Monitor your security scans across all systems and applications.
              </p>
            </DialogTitle>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {vulnerabilities?.map((vul) => {
                return (
                  <ModalItem
                    key={vul.creation_date}
                    name={vul.name}
                    time={vul.creation_date}
                    targets={vul.total_targets}
                    finding={finding}
                  />
                );
              })}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
