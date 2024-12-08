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

const PagesChart = ({ visitsData }) => {
  const [pageViewsData, setPageViewsData] = useState([]);

  useEffect(() => {
    const pageViews = visitsData.reduce((acc, visit) => {
      acc[visit.page] = (acc[visit.page] || 0) + 1;
      return acc;
    }, {});
    setPageViewsData(
      Object.entries(pageViews).map(([page, views]) => ({ page, views }))
    );
  }, [visitsData]);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Page Views</CardTitle>
        <CardDescription>Number of views per page</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={pageViewsData}
            layout="vertical"
            margin={{ top: 10, right: 50, left: 10, bottom: 10 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="page"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 14,
              }}
              width={100}
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

export default PagesChart;
