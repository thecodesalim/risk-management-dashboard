import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useThreats(severity: string) {
  const { data, error, isLoading } = useSWR(
    `api/threats-today/${severity}`,
    fetcher
  );

  const loading = !data && !error;

  return {
    loading,
    isLoading,
    threats: data,
  };
}

export function useVulnerabilities() {
  const { data, error, isLoading } = useSWR(
    `api/vulnerabilities-today/`,
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
