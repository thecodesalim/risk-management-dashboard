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
  finding: number;
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

type EntityValue = {
  guid: string;
  name: string;
  ips: string[];
};

type Entity = {
  entityType: string;
  entityValue: EntityValue;
  entityId: string;
  relatedEntities: string[];
  relatedIndicatorIds: number[];
  provenance: string[];
  managementScopeGroupId: string;
};

type ImpactScope = {
  desktopCount: number;
  serverCount: number;
  accountCount: number;
  emailAddressCount: number;
  containerCount: number;
  cloudIdentityCount: number;
  entities: Entity[];
};

type MatchedEvent = {
  uuid: string;
  matchedDateTime: string;
  type: string;
};

type MatchedFilter = {
  id: string;
  name: string;
  matchedDateTime: string;
  mitreTechniqueIds: string[];
  matchedEvents: MatchedEvent[];
};

type MatchedRule = {
  id: string;
  name: string;
  matchedFilters: MatchedFilter[];
};

type Indicator = {
  id: number;
  type: string;
  field: string;
  value: string;
  relatedEntities: string[];
  filterIds: string[];
  provenance: string[];
};

export type SecurityAlert = {
  schemaVersion: string;
  id: string;
  investigationStatus: string;
  status: string;
  investigationResult: string;
  workbenchLink: string;
  alertProvider: string;
  modelId: string;
  model: string;
  modelType: string;
  score: number;
  severity: string;
  createdDateTime: string;
  updatedDateTime: string;
  ownerIds: string[];
  incidentId: string;
  impactScope: ImpactScope;
  description: string;
  matchedRules: MatchedRule[];
  indicators: Indicator[];
};

export type SecurityAlertArray = SecurityAlert[];

export type ThreatItem = {
  threat_type: string;
  threat_id: string;
  threat_model: string;
};

export type ThreatsData = {
  totalCount: number;
  count: number;
  items: ThreatItem[];
};

export type ThreatResponse = {
  threats: ThreatsData;
};

export type ThreatCounts = {
  [key: string]: number;
};

export type ThreatPercentages = {
  [key: string]: {
    count: number;
    percentage: number;
  };
};

export type RiskItem = {
  name: string;
  id: string;
  parent: string | null;
  children: string[];
  riskIndex: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  assetCount: number;
  updatedDateTime: string;
};

export type RiskDataResponse = {
  items: RiskItem[];
  count: number;
  totalCount: number;
};
