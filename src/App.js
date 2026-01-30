import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 700,
      height: 400,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#000",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
    });

    const series = chart.addLineSeries({
      color: "#0070f3",
      lineWidth: 2,
    });

    series.setData([
      { time: "2024-01-01", value: 100 },
      { time: "2024-01-02", value: 120 },
      { time: "2024-01-03", value: 110 },
      { time: "2024-01-04", value: 140 },
      { time: "2024-01-05", value: 160 },
    ]);

    return () => chart.remove();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>
      <div ref={chartContainerRef} />
    </div>
  );
}
