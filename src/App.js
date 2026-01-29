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

    const lineSeries = chart.addLineSeries({
      color: "#0070f3",
      lineWidth: 2,
    });

    lineSeries.setData([
      { time: "2024-01-01", value: 100 },
      { time: "2024-01-02", value: 120 },
      { time: "2024-01-03", value: 110 },
      { time: "2024-01-04", value: 140 },
      { time: "2024-01-05", value: 160 },
    ]);

    return () => chart.remove();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Trading Dashboard</h1>

      {/* Stats */}
      <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
        <Card title="Total Trades" value="3" />
        <Card title="Win Rate" value="67%" />
        <Card title="Total P&L" value="$360" positive />
      </div>

      {/* Chart */}
      <div ref={chartContainerRef} />
    </div>
  );
}

function Card({ title, value, positive }) {
  return (
    <div
      style={{
        padding: 20,
        minWidth: 160,
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div
        style={{
          marginTop: 10,
          fontSize: 28,
          fontWeight: "bold",
          color: positive ? "green" : "#000",
        }}
      >
        {value}
      </div>
    </div>
  );
}
