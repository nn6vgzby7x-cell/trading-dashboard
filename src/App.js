import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
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
      { time: 1, value: 100 },
      { time: 2, value: 102 },
      { time: 3, value: 101 },
      { time: 4, value: 105 },
    ]);

    seriesRef.current = series;

    let time = 4;
    let price = 105;

    const interval = setInterval(() => {
      time += 1;
      price += (Math.random() - 0.5) * 2;

      series.update({
        time,
        value: Number(price.toFixed(2)),
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      chart.remove();
    };
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
        <Stat title="Asset" value="AAPL (Live)" />
        <Stat title="Update" value="Every 1s" />
        <Stat title="Status" value="Streaming" positive />
      </div>

      <h2 style={{ marginTop: 40 }}>Live Price Chart</h2>
      <div
        ref={chartRef}
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

function Stat({ title, value, positive }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 10,
        minWidth: 160,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div
        style={{
          fontSize: 22,
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
