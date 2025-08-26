"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  AlertTriangle,
  CircleCheckBigIcon,
  FileText,
  Shield,
} from "lucide-react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { RiskScoreCard } from "./cards/risk-score-card";
import ThreatsCard from "./cards/threats-card";
import { SecurityReportDocument } from "./pdf";

export default function ReportModal() {
  return (
    <Dialog open={true} onClose={() => {}} className="relative z-50 text-black">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg max-h-[80vh] overflow-y-auto space-y-4 border border-[#EBEBEB] rounded bg-white p-6 w-full">
          <div className=" flex justify-between pb-6 border-b border-[#EBEBEB]">
            <DialogTitle className="font-medium">
              <div className="flex flex-row gap-4 mb-2 items-center">
                <FileText />
                Executive Summary Report
              </div>
            </DialogTitle>
          </div>
          <div>
            <div>
              <p className=" mb-2 font-medium">Executive Summary</p>
              <div className="w-full bg-neutral-50 text-sm p-8 rounded">
                <p className=" mb-2">
                  <span className=" font-medium">
                    Overall Security Posture:
                  </span>{" "}
                  Medium Risk (61.1/100) - Your organization maintains a
                  reasonable security stance with active threat monitoring and
                  incident response capabilities.
                </p>
                <p>
                  <span className=" font-medium">Key Highlights:</span> 21
                  active threats detected with an 11-threat reduction from
                  yesterday, demonstrating effective threat mitigation. 247
                  devices monitored with 98% uptime.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className=" mb-2 font-medium">Risk Assessment</p>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              <RiskScoreCard />
              <ThreatsCard />
            </div>
          </div>
          <div>
            <div>
              <p className=" mb-2 font-medium">Operational Performance</p>
              <div className="w-full bg-neutral-50 text-sm p-8 rounded">
                <ModalItem title="Incidents Resolved" value="12" />
                <ModalItem title="Avg. Resolution Time" value="2.4h" />
                <ModalItem title="Total Assets" value="247" />
                <ModalItem title="System Uptime" value="98%" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className=" mb-2 font-medium">Key Recommendations</p>
              <div className="w-full bg-neutral-50 text-sm p-8 rounded">
                <ModalRecommendation
                  icon={<AlertTriangle className=" w-4 h-4" />}
                  title="Address SSL Certificate Issues"
                  value="2 systems have SSL certificate vulnerabilities that require immediate attention"
                />

                <ModalRecommendation
                  icon={<Shield className=" w-4 h-4" />}
                  title="Enhance Malware Protection"
                  value="High malware risk detected - consider additional endpoint protection measures"
                />
                <ModalRecommendation
                  icon={<CircleCheckBigIcon className=" w-4 h-4" />}
                  title="Maintain Current Response Times"
                  value="2.4h average response time is excellent - continue current procedures"
                />
              </div>
            </div>
          </div>
          <div className=" border border-b w-full  border-[#EBEBEB]"></div>
          <div className=" flex flex-row justify-between items-center">
            <p className=" text-xs text-gray-500">
              Report generated on {new Date().toLocaleDateString()}
            </p>
            <PDFDownloadLink
              document={<SecurityReportDocument />}
              fileName={`risk-management-report.pdf`}
              className="w-fit inline-flex items-center justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm/6 font-medium text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-blue-600 data-open:bg-blue-700"
            >
              {({ loading }) =>
                loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating PDF...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Export PDF
                  </span>
                )
              }
            </PDFDownloadLink>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function ModalItem({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-row justify-between">
      <p className=" text-sm text-gray-500">{title}</p>
      <p className=" font-medium">{value}</p>
    </div>
  );
}

function ModalRecommendation({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
