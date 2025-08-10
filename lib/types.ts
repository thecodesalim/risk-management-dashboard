export type ThreatDetailsProps = {
  id: string;
  name: string;
  type: string;
  severity: string;
  time: string;
  action: string;
  description: string;
  deviceID: string;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  threat?: ThreatDetailsProps;
  vulnerabilities?: ScanItemArray;
};

export type ModalItemProps = {
  title: string;
  description: string;
};

type ScanStatusTimes = {
  initializing: number;
  pending: number;
  processing: number;
  publishing: number;
  running: number;
};

type ScanItem = {
  control: boolean;
  creation_date: number;
  enabled: boolean;
  id: number;
  last_modification_date: number;
  legacy: boolean;
  name: string;
  owner: string;
  policy_id: number;
  read: boolean;
  schedule_uuid: string;
  shared: boolean;
  status: string;
  template_uuid: string;
  has_triggers: boolean;
  type: string;
  permissions: number;
  user_permissions: number;
  uuid: string;
  wizard_uuid: string;
  progress: number;
  total_targets: number;
  status_times: ScanStatusTimes;
};

type ScanItemArray = ScanItem[];
