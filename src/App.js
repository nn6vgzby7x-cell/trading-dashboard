export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>

      <p>Total Trades: 3</p>
      <p>Win Rate: 67%</p>
      <p>Total P&amp;L: $360</p>

      <hr style={{ margin: "30px 0" }} />

      <a
        href="https://buy.stripe.com/4gM9AM0iy5Q91PldkE2Ji01"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          style={{
            padding: "14px 24px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Upgrade to Pro
        </button>
      </a>
    </div>
  );
}
