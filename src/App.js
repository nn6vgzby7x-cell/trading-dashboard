import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const [isProUser, setIsProUser] = useState(false);
  const [asset, setAsset] = useState("AAPL");
  const [data, setData] = useState([]);

  const chartRef = useRef(null);

  // 🔹 Fetch REAL data
  useEffect(() => {
    if (!isProUser) return;

    async function fetchData() {
      if (asset === "BTC") {
        // CoinGecko (crypto)
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
        );
        const json = await res.json();

        const formatted = json.prices.map(p => ({
          time: Math.floor(p[0] / 1000),
          value: p[1],
        }));

        setData(formatted);
      } else {
        // Yahoo Finance via proxy (stocks)
        const symbol = asset;
        const res = await fetch(
          `https://corsproxy.io/?https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=7d&interval=1d`
        );
        const json = await res.json();

        const timestamps = json.chart.result[0].timestamp;
        const prices = json.chart.result[0].indicators.quote[0].close;

        const formatted = timestamps.map((t, i) => ({
          time: t,
          value: prices[i],
        }));

        setData(formatted);
      }
    }

    fetchData();
  }, [asset, isProUser]);

  // 🔹 Render chart
  useEffect(() => {
    if (!isProUser || data.length === 0) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 300,
      layout: { background: { color: "#fff" }, textColor: "#000" },
      grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
    });

    const series =
      asset === "BTC"
        ? chart.addLineSeries({ color: "#f7931a" })
        : chart.addLineSeries({ color: "#0070f3" });

    series.setData(data);

    return () => chart.remove();
  }, [data, isProUser]);

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Trading Dashboard</h1>

      {!isProUser ? (
        <div style={lockBox}>
          <h2>🔒 Pro Feature</h2>
          <p>Unlock real market data.</p>

          <a
            href="https://buy.stripe.com/4gM9AM0iy5Q91PldkE2Ji01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={button}>Upgrade to Pro</button>
          </a>

          <div style={{ marginTop: 10 }}>
            <button onClick={() => setIsProUser(true)} style={{ fontSize: 12 }}>
              (Dev) Unlock Pro
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Asset Selector */}
          <div style={{ marginBottom: 20 }}>
            <label>
              Asset:&nbsp;
              <select value={asset} onChange={e => setAsset(e.target.value)}>
                <option value="AAPL">AAPL</option>
                <option value="TSLA">TSLA</option>
                <option value="BTC">BTC</option>
              </select>
            </label>
          </div>

          {/* Chart */}
          <div
            ref={chartRef}
            style={{ border: "1px solid #ddd", marginBottom: 30 }}
          />
        </>
      )}
    </div>
  );
}

/* Styles */
const lockBox = {
  padding: 30,
  background: "#f8f9fb",
  border: "1px solid #ddd",
  borderRadius: 8,
};

const button = {
  padding: "14px 24px",
  fontSize: 16,
  background: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
