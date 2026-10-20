import { useState } from "react";
import "./App.css";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <main className="landing-page">
      <div className="landing-content">
        <p>WELCOME TO</p>

        <h1 className="landing-title">
          Paradise Nursery
        </h1>

        <p className="landing-description">
          Bring nature home with beautiful houseplants.
          Discover the perfect plants for your home and office.
        </p>

        <button
          className="get-started-button"
          onClick={() => setStarted(true)}
        >
          Get Started
        </button>

        {started && (
          <p role="status">
            Welcome to Paradise Nursery! Your plant-shopping
            journey starts here.
          </p>
        )}
      </div>
    </main>
  );
}
