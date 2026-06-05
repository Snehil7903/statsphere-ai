"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type AutoChartProps = {
  data: Record<string, any>[];
  column: string;
};

export default function AutoChart({
  data,
  column,
}: AutoChartProps) {

  const chartData = data.map((row) => ({
    value: Number(row[column]),
  }));

  return (
    <div className="mt-8 border rounded-xl p-6">

      <h3 className="text-xl font-semibold mb-4">
        {column} Distribution
      </h3>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={chartData}>

            <XAxis dataKey="value" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#3b82f6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}