import React from "react";
import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import useSWR from "swr";
import { useRiskScore } from "@/hooks/vulnerabilities/use-vulnerabilities";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 15,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#374151",
  },
  contentBox: {
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 4,
    fontSize: 11,
    lineHeight: 1.5,
  },
  paragraph: {
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 4,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#374151",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ef4444",
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 10,
    color: "#6b7280",
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    paddingBottom: 3,
  },
  modalItemTitle: {
    fontSize: 11,
    color: "#374151",
  },
  modalItemValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#374151",
  },
  recommendation: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  recommendationIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    marginTop: 2,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#374151",
  },
  recommendationText: {
    fontSize: 10,
    color: "#6b7280",
    lineHeight: 1.4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
    marginVertical: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 7,
  },
  footerText: {
    fontSize: 10,
    color: "#6b7280",
  },
  threatReduction: {
    color: "#10b981",
    fontWeight: "medium",
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },
});

const ModalItem = ({ title, value }: { title: string; value: string }) => (
  <View style={styles.modalItem}>
    <Text style={styles.modalItemTitle}>{title}</Text>
    <Text style={styles.modalItemValue}>{value}</Text>
  </View>
);

const ModalRecommendation = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <View style={styles.recommendation}>
    <View style={styles.recommendationContent}>
      <Text style={styles.recommendationTitle}>• {title}</Text>
      <Text style={styles.recommendationText}>{value}</Text>
    </View>
  </View>
);

const RiskScoreCard = () => {
  const { riskScore } = useRiskScore();
  return (
    <View style={styles.gridItem}>
      <Text style={styles.cardTitle}>Risk Score</Text>
      <Text style={styles.cardValue}>{riskScore?.riskIndex}</Text>
      <Text style={styles.cardSubtext}>
        {riskScore.riskLevel.charAt(0).toUpperCase() +
          riskScore.riskLevel.slice(1)}{" "}
        Risk Level
      </Text>
    </View>
  );
};

const ThreatsCard = () => {
  const { data: threats } = useSWR("api/threats-today", fetcher);
  const { data: t } = useSWR("api/threats-yesterday", fetcher);

  const diff = threats?.totalCount - t?.totalCount;

  return (
    <View style={styles.gridItem}>
      <Text style={styles.cardTitle}>Active Threats</Text>
      <Text style={styles.cardValue}>{threats?.totalCount}</Text>
      <Text style={[styles.cardSubtext, styles.threatReduction]}>
        {`${diff > 0 ? "+" : ""}${diff} `} from yesterday
      </Text>
    </View>
  );
};

export const SecurityReportDocument = () => {
  const { riskScore } = useRiskScore();
  const { data: threats } = useSWR("api/threats-today", fetcher);
  const { data: t } = useSWR("api/threats-yesterday", fetcher);
  const diff = threats?.totalCount - t?.totalCount;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image source={"/firs_logo_small.png"} style={styles.image} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Cyber Risk Dashboard Executive Summary
          </Text>
          <View style={styles.contentBox}>
            <View style={styles.paragraph}>
              <Text>
                <Text style={styles.boldText}>Overall Security Posture: </Text>
                Medium Risk ({riskScore?.riskIndex}/100) - Your organization
                maintains a reasonable security stance with active threat
                monitoring and incident response capabilities.
              </Text>
            </View>
            <Text>
              <Text style={styles.boldText}>Key Highlights: </Text>
              {threats?.totalCount} active threats detected with a {` ${diff} `}
              threat {Math.sign(diff) > 0 ? "increase" : "decrease"} from
              yesterday, demonstrating effective threat mitigation.{" "}
              {riskScore?.assetCount} devices monitored with 99% uptime.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Assessment</Text>
          <View style={styles.gridContainer}>
            <RiskScoreCard />
            <ThreatsCard />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operational Performance</Text>
          <View style={styles.contentBox}>
            <ModalItem title="Incidents Resolved" value={threats?.totalCount} />
            <ModalItem title="Avg. Resolution Time" value="2.4h" />
            <ModalItem title="Total Assets" value={riskScore?.assetCount} />
            <ModalItem title="System Uptime" value="99%" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Recommendations</Text>
          <View style={styles.contentBox}>
            <ModalRecommendation
              title="Address SSL Certificate Issues"
              value="2 systems have SSL certificate vulnerabilities that require immediate attention"
            />
            <ModalRecommendation
              title="Enhance Malware Protection"
              value="High malware risk detected - consider additional endpoint protection measures"
            />
            <ModalRecommendation
              title="Maintain Current Response Times"
              value="2.4h average response time is excellent - continue current procedures"
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Report generated on {new Date().toLocaleDateString()}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
