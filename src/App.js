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
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addCandlestickSeries();

    candleSeries.setData([
      { time: "2026-01-01", open: 120, high: 130, low: 115, close: 125 },
      { time: "2026-01-02", open: 125, high: 140, low: 123, close: 135 },
      { time: "2026-01-03", open: 135, high: 138, low: 120, close: 128 },
      { time: "2026-01-04", open: 128, high: 145, low: 126, close: 142 },
      { time: "2026-01-05", open: 142, high: 150, low: 140, close: 148 },
    ]);

    return () => chart.remove();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>

      <div
        ref={chartContainerRef}
        style={{
          marginTop: 20,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      />

      <div style={{ marginTop: 30 }}>
        <a
          href="https://buy.stripe.com/4gM9AM0iy5Q91PldkE2Ji01"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            style={{
              padding: "12px 20px",
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
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addCandlestickSeries();

    candleSeries.setData([
      { time: "2026-01-01", open: 120, high: 130, low: 115, close: 125 },
      { time: "2026-01-02", open: 125, high: 140, low: 123, close: 135 },
      { time: "2026-01-03", open: 135, high: 138, low: 120, close: 128 },
      { time: "2026-01-04", open: 128, high: 145, low: 126, close: 142 },
      { time: "2026-01-05", open: 142, high: 150, low: 140, close: 148 },
    ]);

    return () => chart.remove();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>

      <div
        ref={chartContainerRef}
        style={{
          marginTop: 20,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      />

      <div style={{ marginTop: 30 }}>
        <a
          href="https://buy.stripe.com/4gM9AM0iy5Q91PldkE2Ji01"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            style={{
              padding: "12px 20px",
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
s
