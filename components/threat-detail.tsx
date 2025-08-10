import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { BugIcon, Calendar, Clock, TriangleAlert } from "lucide-react";
import { useState } from "react";

type ThreatDetailsProps = {
  id: string;
  name: string;
  type: string;
  severity: string;
  time?: string;
  date?: string;
  action: string;
  description: string;
  deviceID: string;
  ip?: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  threat: ThreatDetailsProps;
};

type ModalItemProps = {
  title: string;
  description: string;
};

function ModalItem({ title, description }: ModalItemProps) {
  return (
    <div className=" space-y-1 text-sm">
      <p className=" text-gray-500">{title}</p>
      <p className=" font-medium">{description}</p>
    </div>
  );
}

function Modal({ isOpen, onClose, threat }: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50 text-black"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border border-[#EBEBEB] rounded bg-white p-6 w-full">
          <div className=" flex justify-between">
            <DialogTitle className="font-bold">
              {isNaN(Number(threat.id)) ? (
                <div className="flex flex-row gap-4 mb-2">
                  <BugIcon />
                  <p>Threat Details</p>
                </div>
              ) : (
                <div className="flex flex-row gap-4 mb-2">
                  <TriangleAlert />
                  <p>Vulnerability Details</p>
                </div>
              )}
              <p className="font-normal text-neutral-500 text-sm">
                Security incident detected and automatically blocked
              </p>
            </DialogTitle>
            <div className=" flex gap-2">
              <p
                className={`${
                  threat.severity === "high"
                    ? "bg-red-500"
                    : threat.severity === "medium"
                    ? "bg-orange-500"
                    : "bg-green-500"
                } text-white text-xs font-semibold px-4 py-1 w-fit h-fit rounded-full`}
              >
                {threat.severity.charAt(0).toUpperCase() +
                  threat.severity.slice(1)}
              </p>
              <p className=" text-green-500 bg-green-100 text-xs font-semibold px-4 py-1 w-fit h-fit rounded-full">
                {threat.action}
              </p>
            </div>
          </div>
          <div className=" flex flex-col gap-8">
            <ModalItem title="Name" description={threat.name} />
            <ModalItem title="Description" description={threat.description} />
            <div className=" flex gap-10">
              <ModalItem title="Device ID" description={threat.deviceID} />
              <ModalItem title="Source IP" description={threat.ip || ""} />
            </div>
            <ModalItem title="Threat ID" description={threat.id} />
            <div className=" flex gap-4">
              <div className=" flex items-center gap-1 text-sm">
                <Clock className=" w-4 h-4 text-gray-500" />
                <p className=" text-gray-500">{threat.time}</p>
              </div>
              <div className=" flex items-center gap-1 text-sm">
                <Calendar className=" w-4 h-4 text-gray-500" />
                <p className=" text-gray-500">{threat.date}</p>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default function ThreatDetails({
  id,
  name,
  type,
  severity,
  time,
  date,
  action,
  description,
  deviceID,
  ip,
}: ThreatDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const threatData = {
    id,
    name,
    type,
    severity,
    time,
    date,
    action,
    description,
    deviceID,
    ip,
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="cursor-pointer hover:bg-neutral-50 p-1 rounded-xl"
      >
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 text-xs">
          <div className="space-y-1">
            <p>{name}</p>
            <p className="text-sm text-neutral-400">{type}</p>
          </div>
          <div className="space-y-1">
            <p
              className={`${
                severity === "high"
                  ? "bg-red-500"
                  : severity === "medium"
                  ? "bg-orange-500"
                  : "bg-green-500"
              } text-white text-xs font-medium px-4 py-1 w-fit rounded-full`}
            >
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </p>
            {time ? (
              <p className="text-xs text-neutral-400">{`${date} ${time}`}</p>
            ) : (
              " "
            )}
          </div>
          <div className="space-y-1">
            <p className="text-green-500">{action}</p>
            <p className="text-xs text-neutral-400">1 affected</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        threat={threatData}
      />
    </>
  );
}
