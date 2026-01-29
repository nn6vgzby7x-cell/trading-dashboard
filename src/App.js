export default function App() {
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
        <StatCard title="Total Trades" value="3" />
        <StatCard title="Win Rate" value="67%" />
        <StatCard title="Total P&L" value="$360" positive />
      </div>

      {/* Table */}
      <h2 style={{ marginTop: 40 }}>Recent Trades</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#eee", textAlign: "left" }}>
            <th style={th}>Asset</th>
            <th style={th}>Type</th>
            <th style={th}>P&amp;L</th>
          </tr>
        </thead>
        <tbody>
          <TradeRow asset="AAPL" type="Long" pnl="+120" />
          <TradeRow asset="TSLA" type="Short" pnl="-40" />
          <TradeRow asset="BTC" type="Long" pnl="+280" />
        </tbody>
      </table>

      {/* Stripe Button */}
      <div style={{ marginTop: 40 }}>
        <a
          href="https://buy.stripe.com/4gM9AM0iy5Q91PldkE2Ji01"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button style={buttonStyle}>Upgrade to Pro</button>
        </a>
      </div>
    </div>
  );
}

/* Components */

function StatCard({ title, value, positive }) {
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

function TradeRow({ asset, type, pnl }) {
  const isPositive = pnl.startsWith("+");

  return (
    <tr>
      <td style={td}>{asset}</td>
      <td style={td}>{type}</td>
      <td style={{ ...td, color: isPositive ? "green" : "red" }}>{pnl}</td>
    </tr>
  );
}

/* Styles */

const th = {
  padding: 12,
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: 12,
  borderBottom: "1px solid #eee",
};

const buttonStyle = {
  padding: "14px 24px",
  fontSize: 16,
  background: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
