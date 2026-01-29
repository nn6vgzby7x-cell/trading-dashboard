import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
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

    const series = chart.addLineSeries({ color: "#0070f3" });

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
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Trading Dashboard</h1>

      <div
        ref={chartRef}
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "400px",
          marginTop: 20,
        }}
      />

      <div style={{ marginTop: 40 }}>
        <a
          href="https://buy.stripe.com/4gM9AM0iy5Q91PldkE2Ji01"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            style={{
              padding: "14px 24px",
              fontSize: 16,
              background: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Upgrade to Pro
          </button>
        </a>
      </div>
    </div>
  );
}
