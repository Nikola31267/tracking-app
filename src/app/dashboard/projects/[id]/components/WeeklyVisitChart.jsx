"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const WeeklyVisitChart = ({ visits, visitsData }) => {
  const [dailyVisits, setDailyVisits] = useState({});

  useEffect(() => {
    const visitsByDay = visitsData.reduce((acc, visit) => {
      const date = new Date(visit.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    setDailyVisits(visitsByDay);
  }, [visitsData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>All Visits: {visits.length}</CardTitle>
        <CardDescription>
          Number of visits per day for the last week
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer
          config={{
            visits: {
              label: "Visits",
              color: "#6b21a8",
            },
          }}
          className="h-80"
        >
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={Object.entries(dailyVisits || {}).map(([date, count]) => ({
                date,
                count,
              }))}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="count"
                fill="var(--color-visits)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyVisitChart;
