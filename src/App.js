import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const chartRef = useRef(null);

  useEffect(() => {
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

    const series = chart.addLineSeries();
    series.setData([
      { time: "2024-01-01", value: 100 },
      { time: "2024-01-02", value: 105 },
      { time: "2024-01-03", value: 102 },
      { time: "2024-01-04", value: 110 },
      { time: "2024-01-05", value: 115 },
    ]);

    return () => chart.remove();
  }, []);

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "Arial, sans-serif",
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1>Trading Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Total Trades" value="3" />
        <Card title="Win Rate" value="67%" />
        <Card title="Total P&L" value="$360" />
      </div>

      <h2 style={{ marginTop: 40 }}>Price Chart</h2>
      <div ref={chartRef} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        minWidth: 160,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: "bold", marginTop: 10 }}>
        {value}
      </div>
    </div>
  );
}
