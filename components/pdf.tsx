import React, { useState } from "react";
import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { AlertTriangle, Shield, CheckCircle2 } from "lucide-react";

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#374151",
  },
  contentBox: {
    backgroundColor: "#fafafa",
    padding: 20,
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
    marginBottom: 6,
    paddingBottom: 6,
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
    paddingTop: 10,
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
    width: 60,
    height: 60,
    marginBottom: 20,
  },
});

// PDF Components
const ModalItem = ({ title, value }) => (
  <View style={styles.modalItem}>
    <Text style={styles.modalItemTitle}>{title}</Text>
    <Text style={styles.modalItemValue}>{value}</Text>
  </View>
);

const ModalRecommendation = ({ title, value, iconType }) => (
  <View style={styles.recommendation}>
    <View style={styles.recommendationContent}>
      <Text style={styles.recommendationTitle}>• {title}</Text>
      <Text style={styles.recommendationText}>{value}</Text>
    </View>
  </View>
);

const RiskScoreCard = () => (
  <View style={styles.gridItem}>
    <Text style={styles.cardTitle}>Risk Score</Text>
    <Text style={styles.cardValue}>61.1/100</Text>
    <Text style={styles.cardSubtext}>Medium Risk Level</Text>
  </View>
);

const ThreatsCard = () => (
  <View style={styles.gridItem}>
    <Text style={styles.cardTitle}>Active Threats</Text>
    <Text style={styles.cardValue}>21</Text>
    <Text style={[styles.cardSubtext, styles.threatReduction]}>
      -11 from yesterday
    </Text>
  </View>
);

// Main PDF Document
export const SecurityReportDocument = () => (
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
              Medium Risk (61.1/100) - Your organization maintains a reasonable
              security stance with active threat monitoring and incident
              response capabilities.
            </Text>
          </View>
          <Text>
            <Text style={styles.boldText}>Key Highlights: </Text>
            21 active threats detected with an 11-threat reduction from
            yesterday, demonstrating effective threat mitigation. 247 devices
            monitored with 98% uptime.
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
          <ModalItem title="Incidents Resolved" value="12" />
          <ModalItem title="Avg. Resolution Time" value="2.4h" />
          <ModalItem title="Total Assets" value="247" />
          <ModalItem title="System Uptime" value="98%" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Recommendations</Text>
        <View style={styles.contentBox}>
          <ModalRecommendation
            iconType="alert"
            title="Address SSL Certificate Issues"
            value="2 systems have SSL certificate vulnerabilities that require immediate attention"
          />
          <ModalRecommendation
            iconType="shield"
            title="Enhance Malware Protection"
            value="High malware risk detected - consider additional endpoint protection measures"
          />
          <ModalRecommendation
            iconType="check"
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
