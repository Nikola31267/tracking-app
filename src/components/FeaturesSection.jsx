"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/light";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BarChart2, Clock, Plug, Target } from "lucide-react";

const features = [
  {
    name: "Real-time Data Streams",
    description:
      "Watch your data flow in as it happens with our lightning-fast streaming API.",
    icon: <Clock className="text-white" />,
    chart: (
      <LineChart
        width={200}
        height={100}
        data={[
          { name: "A", value: 300 },
          { name: "B", value: 600 },
          { name: "C", value: 400 },
          { name: "D", value: 700 },
          { name: "E", value: 500 },
        ]}
      >
        <Line
          type="monotone"
          dataKey="value"
          stroke="#ab57ff"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    ),
  },
  {
    name: "Goals",
    description:
      "Set goals and get notified everytime something big happens to your website.",
    icon: <Target className="text-white" />,
    chart: (
      <AreaChart
        width={200}
        height={100}
        data={[
          { name: "A", actual: 400, predicted: 300 },
          { name: "B", actual: 300, predicted: 400 },
          { name: "C", actual: 500, predicted: 600 },
          { name: "D", actual: 600, predicted: 800 },
          { name: "E", actual: 700, predicted: 1000 },
        ]}
      >
        <Area
          type="monotone"
          dataKey="actual"
          stroke="#9c27b0"
          fill="#9c27b0"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="predicted"
          stroke="#ff4081"
          fill="#ff4081"
          fillOpacity={0.3}
        />
      </AreaChart>
    ),
  },
  {
    name: "Multi-dimensional Analysis",
    description:
      "Explore your data from every angle with our advanced multi-dimensional analysis tools.",
    icon: <BarChart2 className="text-white" />,
    chart: (
      <BarChart
        width={200}
        height={100}
        data={[
          { name: "A", dim1: 300, dim2: 400, dim3: 500 },
          { name: "B", dim1: 400, dim2: 500, dim3: 600 },
          { name: "C", dim1: 500, dim2: 600, dim3: 700 },
          { name: "D", dim1: 600, dim2: 700, dim3: 800 },
        ]}
      >
        <Bar dataKey="dim1" stackId="a" fill="#6c5ce7" />
        <Bar dataKey="dim2" stackId="a" fill="#7a6ee9" />
        <Bar dataKey="dim3" stackId="a" fill="#8b7cef" />
      </BarChart>
    ),
  },
  {
    name: "Easy Integration",
    description:
      "Start using the ultimate tracking API with just one line of code",
    icon: <Plug className="text-white" />,
    chart: (
      <div className="relative">
        <div className="relative min-h-[9rem] w-full grow">
          <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden rounded-tl-xl bg-gray-900 rounded-xl">
            <div className="absolute top-4 right-4 flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>

            <div className="flex bg-gray-800/40 ring-1 ring-white/5">
              <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                  layout.js
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="max-h-[30rem]">
                <SyntaxHighlighter
                  language="typescript"
                  style={{
                    ...oneDark,
                    'pre[class*="language-"]': {
                      ...oneDark['pre[class*="language-"]'],
                      background: "transparent",
                      overflow: "hidden",
                    },
                    'code[class*="language-"]': {
                      ...oneDark['code[class*="language-"]'],
                      background: "transparent",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      letterSpacing: "inherit",
                      whiteSpace: "inherit",
                    },
                  }}
                >
                  {`
<script src="https:/pixeltrack.startgrid.xyz/js/tracker.js" \n` +
                    `        data-website-url="WEBSITE_URL" async></script>
                    `}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
      </div>
    ),
  },
];

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div id="features" className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Revolutionize Your Data Insights
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Unlock the full potential of your data with our cutting-edge
              tracking API.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className="relative overflow-hidden rounded-2xl bg-white p-10"
                >
                  <dt className="text-base font-semibold leading-7 text-black">
                    <div className="absolute left-0 top-0 h-full w-2" />
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500">
                      {feature.icon}
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                  <div className="mt-6 flex justify-center">
                    <ChartContainer config={{}} className="w-full h-[100px]">
                      <ResponsiveContainer>{feature.chart}</ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  {hoveredIndex === index && (
                    <div
                      className="absolute inset-0 bg-gradient-to-r"
                      style={{
                        backgroundImage: `linear-gradient(45deg, ${feature.color}22, ${feature.color}00)`,
                      }}
                    />
                  )}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
