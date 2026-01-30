import { useEffect, useRef } from "react";
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
    });

    const series = chart.addLineSeries();
    series.setData([
      { time: "2024-01-01", value: 100 },
      { time: "2024-01-02", value: 110 },
      { time: "2024-01-03", value: 105 },
      { time: "2024-01-04", value: 120 },
    ]);

    return () => chart.remove();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <div>Total Trades: 3</div>
        <div>Win Rate: 67%</div>
        <div>Total P&L: $360</div>
      </div>

      <div ref={chartRef} />
    </div>
  );
}
