
import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      width: 700,
      height: 400,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#333",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
    });

    const lineSeries = chart.addLineSeries({
      color: "#0070f3",
      lineWidth: 2,
    });

    lineSeries.setData([
      { time: "2024-01-01", value: 100 },
      { time: "2024-01-02", value: 105 },
      { time: "2024-01-03", value: 102 },
      { time: "2024-01-04", value: 110
