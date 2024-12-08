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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const WeeklyVisitChart = ({ visits, visitsData }) => {
  const [dailyVisits, setDailyVisits] = useState({});
  const [selectedWeek, setSelectedWeek] = useState("current");

  useEffect(() => {
    const calculateStartOfWeek = (weeksAgo) => {
      const date = new Date();
      date.setDate(date.getDate() - date.getDay() - weeksAgo * 7);
      date.setHours(0, 0, 0, 0);
      return date;
    };

    const startOfWeek = calculateStartOfWeek(
      selectedWeek === "current" ? 0 : 1
    );

    const visitsByDay = visitsData.reduce((acc, visit) => {
      const visitDate = new Date(visit.timestamp);
      if (visitDate >= startOfWeek) {
        const date = visitDate.toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
      }
      return acc;
    }, {});
    setDailyVisits(visitsByDay);
  }, [visitsData, selectedWeek]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>All Visits: {visits.length}</CardTitle>
        <CardDescription>Number of visits per day</CardDescription>
        <div className="w-56 mt-1">
          <Select
            value={selectedWeek}
            onValueChange={setSelectedWeek}
            className="w-full"
          >
            <SelectTrigger id="week-select">
              <SelectValue placeholder="Select a week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Week</SelectItem>
              <SelectItem value="previous">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
          <BarChart
            width={569}
            height={320}
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyVisitChart;
