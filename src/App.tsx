
import { useState } from "react";
import "./App.css";

function App() {
  const [tripType, setTripType] = useState("round-trip");
  const [origin, setOrigin] = useState("Toronto (YYZ)");
  const [destination, setDestination] = useState("Vancouver (YVR)");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [message, setMessage] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!origin || !destination) {
      setMessage("Please select your departure and arrival cities.");
      return;
    }

    if (origin === destination) {
      setMessage("Origin and destination must be different.");
      return;
    }

    if (!departureDate) {
      setMessage("Please select a departure date.");
      return;
    }

    if (tripType === "round-trip" && !returnDate) {
      setMessage("Please select a return date.");
      return;
    }

    setMessage(
      `Searching flights from ${origin} to ${destination} for ${passengers} passenger(s).`
    );
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">FlyEase ✈</div>

        <div className="nav-links">
          <a href="#search">Book Flights</a>
          <a href="#why-us">Why FlyEase?</a>
        </div>

        <button className="login-btn">Sign In</button>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">YOUR JOURNEY STARTS HERE</p>
            <h1>Explore the world, one flight at a time.</h1>
            <p className="hero-description">
              Discover destinations, compare flights, and make
              your next journey effortless.
            </p>
          </div>
        </section>

        <section className="search-section" id="search">
          <div className="search-card">
            <h2>Book your flight</h2>

            <div className="trip-options">
              <label>
                <input
                  type="radio"
                  value="round-trip"
                  checked={tripType === "round-trip"}
                  onChange={(e) => {
                    setTripType(e.target.value);
                    setMessage("");
                  }}
                />
                Round trip
              </label>

              <label>
                <input
                  type="radio"
                  value="one-way"
                  checked={tripType === "one-way"}
                  onChange={(e) => {
                    setTripType(e.target.value);
                    setMessage("");
                  }}
                />
                One way
              </label>
            </div>

            <form onSubmit={handleSearch}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="origin">From</label>
                  <input
                    id="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Departure city"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="destination">To</label>
                  <input
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Arrival city"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="departure">Departure</label>
                  <input
                    id="departure"
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                {tripType === "round-trip" && (
                  <div className="form-group">
                    <label htmlFor="return">Return</label>
                    <input
                      id="return"
                      type="date"
                      value={returnDate}
                      min={departureDate || new Date().toISOString().split("T")[0]}
                      onChange={(e) => setReturnDate(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="passengers">Passengers</label>
                  <select
                    id="passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                      <option key={number} value={number}>
                        {number} Passenger{number > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="search-btn">
                Search Flights →
              </button>

              {message && (
                <p className="search-message" role="status">
                  {message}
                </p>
              )}
            </form>
          </div>
        </section>

        <section className="why-us" id="why-us">
          <h2>Travel made easier</h2>
          <p>Simple booking. Flexible journeys. Better experiences.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
