import { useState } from "react";

export default function App() {
  const [isProUser, setIsProUser] = useState(
    localStorage.getItem("isProUser") === "true"
  );

  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>

      {!isProUser ? (
        <>
          <p>This dashboard is locked.</p>
          <p>Upgrade to Pro to see your stats.</p>

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

          <div style={{ marginTop: 15 }}>
            <button
              style={{ fontSize: 12 }}
              onClick={() => {
                localStorage.setItem("isProUser", "true");
                setIsProUser(true);
              }}
            >
              (Dev) Mark as Paid
            </button>
          </div>
        </>
      ) : (
        <>
          <p>Total Trades: 3</p>
          <p>Win Rate: 67%</p>
          <p>Total P&amp;L: $360</p>

          <button
            style={{ marginTop: 20, fontSize: 12 }}
            onClick={() => {
              localStorage.removeItem("isProUser");
              window.location.reload();
            }}
          >
            Reset Pro (Dev)
          </button>
        </>
      )}
    </div>
  );
}
