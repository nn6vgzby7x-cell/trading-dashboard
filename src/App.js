export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Stat title="Total Trades" value="3" />
        <Stat title="Win Rate" value="67%" />
        <Stat title="Total P&L" value="$360" />
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div
      style={{
        padding: 20,
        background: "#f4f4f4",
        borderRadius: 8,
        minWidth: 150,
      }}
    >
      <div style={{ fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}
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
      <th style={{ padding: 12 }}>Asset</th>
      <th style={{ padding: 12 }}>Type</th>
      <th style={{ padding: 12 }}>P&L</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{ padding: 12 }}>AAPL</td>
      <td style={{ padding: 12 }}>Long</td>
      <td style={{ padding: 12, color: "green" }}>+120</td>
    </tr>
    <tr>
      <td style={{ padding: 12 }}>TSLA</td>
      <td style={{ padding: 12 }}>Short</td>
      <td style={{ padding: 12, color: "red" }}>-40</td>
    </tr>
    <tr>
      <td style={{ padding: 12 }}>BTC</td>
      <td style={{ padding: 12 }}>Long</td>
      <td style={{ padding: 12, color: "green" }}>+280</td>
    </tr>
  </tbody>
</table>
