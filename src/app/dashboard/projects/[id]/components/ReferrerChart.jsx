"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const ReferrerChart = ({ visitsData }) => {
  const [referrerData, setReferrerData] = useState([]);

  useEffect(() => {
    const referrer = visitsData.reduce((acc, visit) => {
      acc[visit.referrer] = (acc[visit.referrer] || 0) + 1;
      return acc;
    }, {});
    setReferrerData(
      Object.entries(referrer).map(([referrer, views]) => ({ referrer, views }))
    );
  }, [visitsData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Referrer</CardTitle>
        <CardDescription>Number of views per referrer</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={referrerData}
            layout="vertical"
            margin={{ top: 10, right: 50, left: 10, bottom: 10 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="referrer"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 14,
              }}
              width={200}
            />
            <Bar
              dataKey="views"
              fill="hsl(var(--primary))"
              radius={[0, 4, 4, 0]}
              barSize={20}
            >
              <LabelList
                dataKey="views"
                position="right"
                fill="hsl(var(--muted-foreground))"
                fontSize={14}
                formatter={(value) => value.toLocaleString()}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ReferrerChart;
