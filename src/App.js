export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <div>
          <strong>Total Trades</strong>
          <div>3</div>
        </div>

        <div>
          <strong>Win Rate</strong>
          <div>67%</div>
        </div>

        <div>
          <strong>Total P&L</strong>
          <div>$360</div>
        </div>
      </div>
    </div>
  );
}
