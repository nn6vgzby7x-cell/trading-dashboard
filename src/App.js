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

    const series = chart.addCandlestickSeries();

    series.setData([
      { time: "2025-01-01", open: 100, high: 120, low: 95, close: 115 },
      { time: "2025-01-02", open: 115, high: 130, low: 110, close: 125 },
      { time: "2025-01-03", open: 125, high: 140, low: 120, close: 135 },
    ]);

    return () => chart.remove();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>
      <p>Live price chart</p>
      <div ref={chartContainerRef} />
    </div>
  );
}
