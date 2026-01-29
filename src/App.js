import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
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

    const series = chart.addLineSeries({ color: "#0070f3" });

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
      <div ref={chartContainerRef} />

      {/* Recent Trades */}
      <h2 style={{ marginTop: 40 }}>Recent Trades</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>Asset</th>
            <th style={th}>Position</th>
            <th style={th}>P&L</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>AAPL</td>
            <td style={td}>Long</td>
            <td style={{ ...td, color: "green" }}>+120</td>
          </tr>
          <tr>
            <td style={td}>TSLA</td>
            <td style={td}>Short</td>
            <td style={{ ...td, color: "red" }}>-40</td>
          </tr>
          <tr>
            <td style={td}>BTC</td>
            <td style={td}>Long</td>
            <td style={{ ...td, color: "green" }}>+280</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ddd",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};
