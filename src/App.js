import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: 600,
      height: 300,
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
      { time: "2024-01-01", value: 150 },
      { time: "2024-01-02", value: 153 },
      { time: "2024-01-03", value: 149 },
      { time: "2024-01-04", value: 158 },
      { time: "2024-01-05", value: 162 },
    ]);

    return () => chart.remove();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Trading Dashboard</h1>

      {/* Stats */}
      <div style={{ marginTop: 20 }}>
        <p><strong>Total Trades:</strong> 3</p>
        <p><strong>Win Rate:</strong> 67%</p>
        <p><strong>Total P&L:</strong> $360</p>
      </div>

      {/* Chart */}
      <h2 style={{ marginTop: 40 }}>Price Chart</h2>
      <div
        ref={chartRef}
        style={{ width: 600, height: 300 }}
      />

      {/* Trades */}
      <h2 style={{ marginTop: 40 }}>Recent Trades</h2>
      <ul>
        <li>AAPL +120</li>
        <li>TSLA -40</li>
        <li>BTC +280</li>
      </ul>
    </div>
  );
}
