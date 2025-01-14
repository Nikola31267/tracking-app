"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
];

const OsChart = ({ visitsData }) => {
  const [osData, setOsData] = useState([]);

  useEffect(() => {
    const osUsage = visitsData.reduce((acc, visit) => {
      acc[visit.platform] = (acc[visit.platform] || 0) + 1;
      return acc;
    }, {});
    setOsData(Object.entries(osUsage).map(([key, value]) => ({ key, value })));
  }, [visitsData]);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>OS Usage</CardTitle>
        <CardDescription>Distribution of views by OS</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={osData}
              dataKey="value"
              nameKey="key"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {osData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OsChart;
