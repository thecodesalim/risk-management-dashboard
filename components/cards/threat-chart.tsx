"use client";

import { ActivityIcon } from "lucide-react";
import Card from "../card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { time: "Monday", threats: 45, blocked: 42 },
  { time: "Tuesday", threats: 52, blocked: 48 },
  { time: "Wednesday", threats: 38, blocked: 35 },
  { time: "Thursday", threats: 21, blocked: 19 },
  { time: "Friday", threats: 33, blocked: 30 },
  { time: "Saturday", threats: 28, blocked: 26 },
  { time: "Sunday", threats: 21, blocked: 21 },
];

export default function ThreatChart() {
  return (
    <Card
      title="Interactions Over Time"
      icon={<ActivityIcon className="h-4 w-4 text-muted-foreground" />}
      className="h-full w-full"
    >
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Area
              type="monotone"
              dataKey="threats"
              stroke="hsl(var(--chart-3))"
              fillOpacity={1}
              fill="url(#colorThreats)"
              strokeWidth={3}
            />
            <Area
              type="monotone"
              dataKey="blocked"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#colorBlocked)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
