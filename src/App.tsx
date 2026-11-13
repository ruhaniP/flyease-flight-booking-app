
import { useState, type FormEvent } from "react";
import "./App.css";

import { flights } from "./data/flights";
import type { Flight } from "./types/flight";
import FlightCard from "./components/FlightCard";

function App() {
  const [tripType, setTripType] = useState("round-trip");
  const [origin, setOrigin] = useState("Toronto (YYZ)");
  const [destination, setDestination] = useState("Vancouver (YVR)");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const [hasSearched, setHasSearched] = useState(false);
  const [sortOrder, setSortOrder] = useState("price");
  const [selectedFlight, setSelectedFlight] =
    useState<Flight | null>(null);

  const [message, setMessage] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setSelectedFlight(null);

    if (origin.trim().toLowerCase() === destination.trim().toLowerCase()) {
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

    if (returnDate && returnDate < departureDate) {
      setMessage("Return date cannot be before departure date.");
      return;
    }

    setHasSearched(true);
  };

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortOrder === "price") {
      return a.price - b.price;
    }

    if (sortOrder === "duration") {
      return a.duration.localeCompare(b.duration);
    }

    return a.departureTime.localeCompare(b.departureTime);
  });

  const handleFlightSelection = (flight: Flight) => {
    setSelectedFlight(flight);
    setMessage("");
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
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="destination">To</label>
                  <input
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="departure">Departure</label>
                  <input
                    id="departure"
                    type="date"
                    value={departureDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDepartureDate(e.target.value)}
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
                    onChange={(e) =>
                      setPassengers(Number(e.target.value))
                    }
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
                <p className="search-message" role="alert">
                  {message}
                </p>
              )}
            </form>
          </div>
        </section>

        {hasSearched && (
          <section className="results-section">
            <div className="results-heading">
              <div>
                <h2>Available Flights</h2>
                <p>
                  {origin} → {destination}
                </p>
                <p>
                  {departureDate} · {passengers} passenger(s)
                </p>
              </div>

              <div className="sort-control">
                <label htmlFor="sort">Sort by:</label>

                <select
                  id="sort"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="price">Lowest price</option>
                  <option value="duration">Duration</option>
                  <option value="departure">Departure time</option>
                </select>
              </div>
            </div>

            <div className="flight-list">
              {sortedFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  origin={origin}
                  destination={destination}
                  onSelect={handleFlightSelection}
                />
              ))}
            </div>

            {selectedFlight && (
              <div className="selection-message" role="status">
                <h3>Flight selected successfully!</h3>
                <p>
                  {selectedFlight.flightNumber} · $
                  {selectedFlight.price}
                </p>
                <p>
                  Your next step will be entering passenger details.
                </p>
              </div>
            )}
          </section>
        )}

        <section className="why-us" id="why-us">
          <h2>Travel made easier</h2>
          <p>Simple booking. Flexible journeys. Better experiences.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
