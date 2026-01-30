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
      { time: "2024-01-01", open: 100, high: 110, low: 95, close: 105 },
      { time: "2024-01-02", open: 105, high: 115, low: 100, close: 110 },
      { time: "2024-01-03", open: 110, high: 120, low: 108, close: 118 },
      { time: "2024-01-04", open: 118, high: 125, low: 115, close: 122 },
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

      {/* Stats */}
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Total Trades" value="3" />
        <Card title="Win Rate" value="67%" />
        <Card title="Total P&L" value="$360" positive />
      </div>

      {/* Chart */}
      <h2 style={{ marginTop: 40 }}>Price Chart</h2>
      <div
        ref={chartContainerRef}
        style={{
          marginTop: 10,
          background: "#fff",
          padding: 10,
          borderRadius: 10,
        }}
      />
    </div>
  );
}

function Card({ title, value, positive }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: 20,
        borderRadius: 10,
        minWidth: 160,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 10,
          color: positive ? "green" : "#000",
        }}
      >
        {value}
      </div>
    </div>
  );
}
