"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { CardContent } from "@mui/material";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";

const chartConfig = {
  rate: {
    label: "Rate",
    color: "red",
  },
  count: {
    label: "Count",
    color: "green",
  },
  tooltip: {
    label: "Count",
  },
} satisfies ChartConfig;

export function ChartShowcase({ data }: { data: any }) {
  return (
    <>
      <CardContent style={{
        overflow: "auto",
      }}>
        <ChartContainer config={chartConfig} className="min-h-[200px] min-w-[200px]">
          <BarChart
           
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={true} horizontal={true} opacity={0.2} />
            <XAxis
              dataKey="rate"
              tickLine={false}
              // tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value + "%"}
            />
            <YAxis dataKey={"count"} tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              labelFormatter={(value, payload) => {
                console.log(value, payload, "value", "payload");
                const rate = payload[0].payload.rate;
                const count = payload[0].payload.count;

                return (
                  <div className="flex max-w-max items-center">
                    <div className="text-[40px] relative mr-2">{count}</div>
                    <div className="">
                      lenders are offering <br /> at {rate}%
                    </div>
                  </div>
                );
              }}
              content={
                <ChartTooltipContent
                  className="backdrop-blur-sm bg-[rgba(255,255,255)] border text-[#111] p-3"
                  style={{
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                  }}
                />
              }
            />
            <Bar dataKey="count" fill="#AEDC91" radius={4} activeBar />
            
          </BarChart>
        </ChartContainer>
      </CardContent>
    </>
  );
}
