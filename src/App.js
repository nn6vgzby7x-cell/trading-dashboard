export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>

      <div style={{ marginTop: 20 }}>
        <p><strong>Total Trades:</strong> 3</p>
        <p><strong>Win Rate:</strong> 67%</p>
        <p><strong>Total P&L:</strong> $360</p>
      </div>

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
