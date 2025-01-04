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
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const WeeklyVisitChart = ({ visits, visitsData, project }) => {
  const [dailyVisits, setDailyVisits] = useState({});
  const [dailyRevenue, setDailyRevenue] = useState({});
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [revenue, setRevenue] = useState(0);

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

    const revenueByDay = project?.payments.reduce((acc, payment) => {
      const paymentDate = new Date(payment.timestamp);
      if (paymentDate >= startOfWeek) {
        const date = paymentDate.toLocaleDateString();
        acc[date] = (acc[date] || 0) + payment.value;
      }
      return acc;
    }, {});

    const totalRevenue = project?.payments.reduce(
      (sum, payment) => sum + payment.value,
      0
    );
    setRevenue(totalRevenue);

    setDailyVisits(visitsByDay);
    setDailyRevenue(revenueByDay);
  }, [visitsData, selectedWeek, project]);

  const chartData = Object.keys(dailyVisits).map((date) => ({
    date,
    visits: dailyVisits[date] || 0,
    revenue: dailyRevenue[date] || 0,
  }));

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="flex items-center gap-8">
          <div>All Visits: {visits.length}</div>
          <div>Revenue: ${revenue}</div>
        </CardTitle>
        <CardDescription></CardDescription>
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
      <CardContent>
        <ChartContainer
          config={{
            visits: {
              label: "Visits",
              color: "#6b21a8",
            },
            revenue: {
              label: "Revenue",
              color: "#9b4bcd",
            },
          }}
          className="h-[400px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />

              {/* Y Axis for visits */}
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#6b21a8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />

              {/* Y Axis for revenue */}
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#9b4bcd"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />

              <Tooltip content={<ChartTooltipContent />} />
              <Legend />

              <Bar
                yAxisId="right"
                dataKey="revenue"
                fill="#d1a1e3"
                radius={[4, 4, 0, 0]}
              />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="visits"
                stroke="#b76dd1"
                strokeWidth={3}
                dot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyVisitChart;
