import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useThreats(severity: string) {
  const { data, error, isLoading } = useSWR(`api/threats/${severity}`, fetcher);

  return {
    error,
    isLoading,
    threats: data,
  };
}

export function useVulnerabilities(severity: string) {
  const { data, error, isLoading } = useSWR(
    `api/vulnerabilities-test/${severity}`,
    fetcher
  );

  return {
    error,
    isLoading,
    vulnerabilities: data?.vulnerabilities,
  };
}

export function useVulnerabilityDetails() {
  const { data, error, isLoading } = useSWR(`api/vulnerabilities`, fetcher);

  return {
    error,
    isLoading,
    vulnerabilities: data,
  };
}

export function useThreatCategories() {
  const { data, error, isLoading } = useSWR(`api/ai`, fetcher);

  return {
    error,
    isLoading,
    threatCategories: data,
  };
}

export function useRiskScore() {
  const { data, error, isLoading } = useSWR(`api/risk-score`, fetcher);

  return {
    isLoading,
    error,
    riskScore: data,
  };
}
