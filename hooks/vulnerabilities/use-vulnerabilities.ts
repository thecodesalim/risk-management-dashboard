import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useThreats(severity: string) {
  const { data, error, isLoading } = useSWR(`api/threats/${severity}`, fetcher);

  const loading = !data && !error;

  return {
    loading,
    isLoading,
    threats: data,
  };
}

export function useVulnerabilities(severity: string) {
  const { data, error, isLoading } = useSWR(
    `api/vulnerabilities-test/${severity}`,
    fetcher
  );

  const loading = !data && !error;

  return {
    loading,
    isLoading,
    vulnerabilities: data?.vulnerabilities,
  };
}

export function useVulnerabilityDetails() {
  const { data, error, isLoading } = useSWR(`api/vulnerabilities/`, fetcher);

  const loading = !data && !error;

  return {
    loading,
    isLoading,
    vulnerabilities: data,
  };
}

export function useThreatCategories() {
  const { data, error, isLoading } = useSWR(`api/ai`, fetcher);

  const loading = !data && !error;

  console.log(data, "twice");

  return {
    loading,
    isLoading,
    threatCategories: data,
  };
}
