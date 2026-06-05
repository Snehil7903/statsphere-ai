"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", surveys: 1200 },
  { month: "Feb", surveys: 1900 },
  { month: "Mar", surveys: 2500 },
  { month: "Apr", surveys: 3100 },
  { month: "May", surveys: 4200 },
  { month: "Jun", surveys: 5200 },
];

export default function SurveyTrendChart() {
    return (
        <div className="border rounded-2xl p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-4">Survey Collection Trend</h2>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="month"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="surveys" stroke="#60a5fa" strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}