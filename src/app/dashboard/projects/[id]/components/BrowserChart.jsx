"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Image from "next/image";
import { useState, useEffect } from "react";

const COLORS = {
  Chrome: "#4285F4",
  Firefox: "#FF7139",
  Safari: "#87CEEB",
  Edge: "#32a852",
};

const BROWSER_LOGOS = {
  Chrome:
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png",
  Firefox:
    "https://upload.wikimedia.org/wikipedia/commons/e/e7/Firefox_logo%2C_2019.png",
  Safari: "https://pngimg.com/d/safari_PNG6.png",
  Edge: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Microsoft_Edge_logo_%282019%29.png",
};

const BrowserChart = ({ visitsData }) => {
  const [browserData, setBrowserData] = useState([]);

  useEffect(() => {
    const browserUsage = visitsData.reduce((acc, visit) => {
      acc[visit.browser] = (acc[visit.browser] || 0) + 1;
      return acc;
    }, {});
    setBrowserData(
      Object.entries(browserUsage).map(([key, value]) => ({ key, value }))
    );
  }, [visitsData]);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Browser Usage</CardTitle>
        <CardDescription>Distribution of views by browser</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={browserData}
              dataKey="value"
              nameKey="key"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {browserData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.key] || "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-6 mt-4">
          {Object.entries(COLORS).map(([browser, color]) => (
            <div key={browser} className="flex items-center mb-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
              <div className="flex items-center ml-2">
                <Image
                  src={BROWSER_LOGOS[browser]}
                  alt={browser}
                  width={20}
                  height={20}
                />
                <span className="ml-2">{browser}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrowserChart;
