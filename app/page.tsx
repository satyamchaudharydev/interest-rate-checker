"use client";
import { ChartShowcase } from "@/components/ChartShowCase";
import { Panel } from "@/components/Panel";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";
import { RateOptions } from "@/interfaces/types";

const formatChartData = (data: any) => {
  const chartData = Object.entries(data)
    .map(([rate, count]) => {
      return {
        rate: Number(rate),
        count: count,
      };
    })
    .sort((a, b) => a.rate - b.rate);
  return chartData;
};

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [rateOptions, setRateOptions] = useState<RateOptions>({
    price: 200000,
    loanAmount: 180000,
    minfico: 700,
    maxfico: 740,
    state: "AL",
    rateStructure: "fixed",
    loanTerm: 30,
    loanType: "conf",
    armType: "5-1",
  });
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const response = await axios.get("/api/rate", {
        params: {
          price: rateOptions.price,
          loan_amount: rateOptions.loanAmount,
          minfico: rateOptions.minfico,
          maxfico: rateOptions.maxfico,
          state: rateOptions.state,
          rate_structure: rateOptions.rateStructure,
          loan_term: rateOptions.loanTerm,
          loan_type: rateOptions.loanType,
          arm_type: rateOptions.armType,
        },
      });
      setIsFetching(false);
      setData(formatChartData(response.data.data));
    };
    fetchData();
  }, [rateOptions]);
  const downloadChart = () => {
    if (!chartRef.current) return;
    let svgURL = new XMLSerializer().serializeToString(chartRef.current);
    let svgBlob = new Blob([svgURL], { type: "image/svg+xml;charset=utf-8" });
    saveAs(svgBlob, "chart.svg");
  };
  const handlePanelChange = (
    newValue: string | number,
    field: keyof RateOptions
  ) => {
    if (!newValue) return;
    setRateOptions({
      ...rateOptions,
      [field]: newValue,
    });
  };
  const handleOptionsChange = (input: any) => {
    setRateOptions({
      ...rateOptions,
      ...input,
    });
  };
  const renderChart = () => {
    if (data.length === 0 && !isFetching) {
      return (
        <h6
          className="text-[#0707078f]  absolute font-bold text-center
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[4vw]
      "
        >
          No data available
        </h6>
      );
    }
  
    return (
      <div ref={chartRef}>
        <ChartShowcase data={data} />
      </div>
    );
  };
  return (
    <div
      className="flex h-[100vh]
      max-md:flex-col
    "
    >
      <div className="basis-[80%] p-4 flex flex-col gap-8 mt-2 ">
        <div className="w-full justify-between flex items-center">
          <h1 className="text-[20px] text-[#070707] font-[600] text-left">
            Interest Rate Overview
          </h1>
          <Button
            variant="contained"
            color="primary"
            className="mt-4"
            onClick={downloadChart}
            style={{
              backgroundColor: "#4CA751",
              color: "#fff",
              borderRadius: "4px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "capitalize",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            Download Chart
          </Button>
        </div>
        <div
          className="border rounded-lg bg-white relative overflow-hidden"
          style={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          {renderChart()}
          <AnimatePresence>
            {isFetching && (
              <motion.div
                data-testid="loader"
                className="absolute top-0 left-0 right-0 flex justify-center  bg-[rgba(255,255,255,0.4)] p-4  h-full backdrop-blur-sm"
              >
                <motion.span
                  className="ml-2"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <svg viewBox="25 25 50 50" className="container">
                    <circle cx="50" cy="50" r="20" className="loader"></circle>
                  </svg>
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="basis-[20%]">
        <Panel
          rateOptions={rateOptions}
          handlePanelChange={handlePanelChange}
          handleOptionsChange={handleOptionsChange}
        />
      </div>
    </div>
  );
}
