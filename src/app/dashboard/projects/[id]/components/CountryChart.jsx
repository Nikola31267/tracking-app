"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { codeToCountryName } from "@/utils/reverseCountryCodes";
import { useEffect, useState } from "react";

const CountryChart = ({ visitsData }) => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const countryUsage = visitsData.reduce((acc, visit) => {
      acc[visit.country] = (acc[visit.country] || 0) + 1;
      return acc;
    }, {});
    setCountryData(
      Object.entries(countryUsage).map(([country, count]) => ({
        country,
        count,
      }))
    );
  }, [visitsData]);

  const maxCount = Math.max(...countryData.map((d) => d.count));
  const getColor = (count) => {
    const ratio = count / maxCount;
    const startColor = [224, 247, 250];
    const endColor = [0, 96, 100];
    const color = startColor.map((start, index) =>
      Math.round(start + ratio * (endColor[index] - start))
    );
    return `rgb(${color.join(",")})`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Country Views</CardTitle>
        <CardDescription>Distribution of views by country</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={countryData}
              dataKey="count"
              nameKey="country"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, value }) => {
                const fullName = codeToCountryName[name] || name || "Unknown";
                return `${fullName}: ${value}`;
              }}
            >
              {countryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.count)} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CountryChart;
