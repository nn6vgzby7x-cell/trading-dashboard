import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

/* ------------------ DATA ------------------ */

const ASSETS = {
  BTC: "bitcoin",
  ETH: "ethereum",
};

const TRADES = {
  BTC: [
    { asset: "BTC", type: "Long", entry: 42000, exit: 43200 },
    { asset: "BTC", type: "Short", entry: 45000, exit: 44000 },
  ],
  ETH: [
    { asset: "ETH", type: "Long", entry: 2200, exit: 2350 },
  ],
};

/* ------------------ APP ------------------ */

export default function App() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  const [asset, setAsset] = useState("BTC");
  const [price, setPrice] = useState(null);

  /* Chart init */
  useEffect(() => {
    chartRef.current = createChart(chartContainerRef.current, {
      width: 720,
      height: 420,
      layout: { background: { color: "#fff" }, textColor: "#000" },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
    });

    seriesRef.current = chartRef.current.addLineSeries({
      color: "#2563eb",
      lineWidth: 2,
    });

    return () => chartRef.current.remove();
  }, []);

  /* Price feed */
  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.setData([]);

    async function fetchPrice() {
      const id = ASSETS[asset];
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
      );
      const data = await res.json();
      const value = data[id].usd;

      setPrice(value);

      seriesRef.current.update({
        time: Math.floor(Date.now() / 1000),
        value,
      });
    }

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000);
    return () => clearInterval(interval);
  }, [asset]);

  /* P&L */
  const trades = TRADES[asset];
  const totalPnL = trades.reduce((sum, t) => {
    const pnl =
      t.type === "Long"
        ? t.exit - t.entry
        : t.entry - t.exit;
    return sum + pnl;
  }, 0);

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Trading Dashboard</h1>

      {/* STATS */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <Stat title="Asset" value={asset} />
        <Stat title="Price" value={price ? `$${price}` : "Loading…"} />
        <Stat
          title="Total P&L"
          value={`$${totalPnL}`}
          positive={totalPnL >= 0}
        />
      </div>

      {/* ASSET SWITCH */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setAsset("BTC")} style={btn(asset === "BTC")}>
          BTC
        </button>
        <button onClick={() => setAsset("ETH")} style={btn(asset === "ETH")}>
          ETH
        </button>
      </div>

      {/* CHART */}
      <div ref={chartContainerRef} />

      {/* TRADES */}
      <h2 style={{ marginTop: 40 }}>Trade History</h2>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Asset</th>
            <th style={th}>Type</th>
            <th style={th}>Entry</th>
            <th style={th}>Exit</th>
            <th style={th}>P&L</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t, i) => {
            const pnl =
              t.type === "Long"
                ? t.exit - t.entry
                : t.entry - t.exit;

            return (
              <tr key={i}>
                <td style={td}>{t.asset}</td>
                <td style={td}>{t.type}</td>
                <td style={td}>${t.entry}</td>
                <td style={td}>${t.exit}</td>
                <td
                  style={{
                    ...td,
                    color: pnl >= 0 ? "green" : "red",
                  }}
                >
                  ${pnl}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------ UI ------------------ */

function Stat({ title, value, positive }) {
  return (
    <div style={card}>
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div
        style={{
          marginTop: 10,
          fontSize: 24,
          fontWeight: "bold",
          color: positive ? "green" : "#000",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const btn = (active) => ({
  marginRight: 10,
  padding: "10px 16px",
  fontSize: 14,
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  background: active ? "#2563eb" : "#e5e7eb",
  color: active ? "#fff" : "#000",
});

const card = {
  background: "#fff",
  padding: 20,
  minWidth: 180,
  borderRadius: 8,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
};

const th = {
  padding: 12,
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const td = {
  padding: 12,
  borderBottom: "1px solid #eee",
};
