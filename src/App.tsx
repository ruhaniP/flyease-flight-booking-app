
import { useState, type FormEvent } from "react";
import "./App.css";

import { flights } from "./data/flights";
import { airports } from "./data/airports";
import type { Flight } from "./types/flight";

import FlightCard from "./components/FlightCard";
import PassengerForm, {
  type Passenger,
} from "./components/PassengerForm";

type SortOrder = "price" | "duration" | "departure";

const getDurationInMinutes = (duration: string): number => {
  const hours = Number(duration.match(/(\d+)h/)?.[1] ?? 0);
  const minutes = Number(duration.match(/(\d+)m/)?.[1] ?? 0);
  return hours * 60 + minutes;
};

const getTimeInMinutes = (time: string): number => {
  const [clock, period] = time.split(" ");
  const [hours, minutes] = clock.split(":").map(Number);

  const normalizedHours =
    period === "PM" ? (hours % 12) + 12 : hours % 12;

  return normalizedHours * 60 + minutes;
};

const getTodayDate = (): string => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function App() {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">(
    "round-trip"
  );

  const [origin, setOrigin] = useState("Toronto (YYZ)");
  const [destination, setDestination] = useState("Vancouver (YVR)");

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const [hasSearched, setHasSearched] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("price");

  const [selectedFlight, setSelectedFlight] =
    useState<Flight | null>(null);

  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [confirmedPassengers, setConfirmedPassengers] =
    useState<Passenger[]>([]);

  const [bookingReference, setBookingReference] = useState("");
  const [message, setMessage] = useState("");

  // Search validation
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setSelectedFlight(null);
    setShowPassengerForm(false);
    setConfirmedPassengers([]);
    setBookingReference("");

    if (!origin || !destination) {
      setMessage("Please select both airports.");
      return;
    }

    if (origin === destination) {
      setMessage("Origin and destination cannot be the same.");
      return;
    }

    if (!departureDate) {
      setMessage("Please select a departure date.");
      return;
    }

    if (departureDate < getTodayDate()) {
      setMessage("Departure date cannot be in the past.");
      return;
    }

    if (tripType === "round-trip" && !returnDate) {
      setMessage("Please select a return date.");
      return;
    }

    if (tripType === "round-trip" && returnDate < departureDate) {
      setMessage("Return date cannot be before departure date.");
      return;
    }

    setHasSearched(true);
  };

  // Filter flights by selected route
  const filteredFlights = flights.filter(
    (flight) =>
      flight.origin.toLowerCase() === origin.trim().toLowerCase() &&
      flight.destination.toLowerCase() ===
      destination.trim().toLowerCase()
  );

  // Sort flights
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (sortOrder) {
      case "price":
        return a.price - b.price;

      case "duration":
        return (
          getDurationInMinutes(a.duration) -
          getDurationInMinutes(b.duration)
        );

      case "departure":
        return (
          getTimeInMinutes(a.departureTime) -
          getTimeInMinutes(b.departureTime)
        );

      default:
        return 0;
    }
  });

  // Select flight
  const handleFlightSelection = (flight: Flight) => {
    setSelectedFlight(flight);
    setShowPassengerForm(true);
    setConfirmedPassengers([]);
    setBookingReference("");
    setMessage("");
  };

  // Submit passenger details
  const handlePassengerSubmit = (passengerDetails: Passenger[]) => {
    setConfirmedPassengers(passengerDetails);

    const reference = `FE${Date.now().toString().slice(-6)}`;

    setBookingReference(reference);
    setShowPassengerForm(false);
  };

  // Reset search
  const handleNewSearch = () => {
    setHasSearched(false);
    setSelectedFlight(null);
    setShowPassengerForm(false);
    setConfirmedPassengers([]);
    setBookingReference("");
    setMessage("");
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <span>✈</span> FlyEase
        </div>

        <div className="nav-links">
          <a href="#search">Book Flights</a>
          <a href="#why-us">Why FlyEase?</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tagline">YOUR JOURNEY STARTS HERE</p>

          <h1>
            Explore the world.
            <br />
            Travel with ease.
          </h1>

          <p>
            Find your next flight and make every journey memorable.
          </p>

          <a href="#search" className="hero-btn">
            Book Your Flight
          </a>
        </div>
      </section>

      {/* Flight Search */}
      <section className="search-section" id="search">
        <div className="search-card">
          <h2>Where would you like to go?</h2>

          <form onSubmit={handleSearch}>
            <div className="trip-options">
              <label>
                <input
                  type="radio"
                  name="tripType"
                  value="round-trip"
                  checked={tripType === "round-trip"}
                  onChange={() => setTripType("round-trip")}
                />
                Round Trip
              </label>

              <label>
                <input
                  type="radio"
                  name="tripType"
                  value="one-way"
                  checked={tripType === "one-way"}
                  onChange={() => setTripType("one-way")}
                />
                One Way
              </label>
            </div>

            <div className="form-grid">
              {/* Origin Airport */}
              <div className="form-group">
                <label htmlFor="origin">From</label>

                <select
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                >
                  <option value="">Select departure airport</option>

                  {airports.map((airport) => (
                    <option
                      key={airport.code}
                      value={`${airport.city} (${airport.code})`}
                    >
                      {airport.city} - {airport.code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination Airport */}
              <div className="form-group">
                <label htmlFor="destination">To</label>

                <select
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                >
                  <option value="">Select destination airport</option>

                  {airports.map((airport) => (
                    <option
                      key={airport.code}
                      value={`${airport.city} (${airport.code})`}
                    >
                      {airport.city} - {airport.code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Departure Date */}
              <div className="form-group">
                <label htmlFor="departureDate">Departure Date</label>

                <input
                  id="departureDate"
                  type="date"
                  min={getTodayDate()}
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  required
                />
              </div>

              {/* Return Date */}
              {tripType === "round-trip" && (
                <div className="form-group">
                  <label htmlFor="returnDate">Return Date</label>

                  <input
                    id="returnDate"
                    type="date"
                    min={departureDate || getTodayDate()}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Passengers */}
              <div className="form-group">
                <label htmlFor="passengers">Passengers</label>

                <select
                  id="passengers"
                  value={passengers}
                  onChange={(e) =>
                    setPassengers(Number(e.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5, 6].map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "Passenger" : "Passengers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="search-btn">
              Search Flights
            </button>
          </form>

          {message && (
            <p className="error-message" role="alert">
              {message}
            </p>
          )}
        </div>
      </section>

      {/* Flight Results */}
      {hasSearched && (
        <section className="results-section">
          <div className="results-header">
            <div>
              <h2>Available Flights</h2>
              <p>{origin} → {destination}</p>
            </div>

            <div className="sort-container">
              <label htmlFor="sortFlights">Sort by:</label>

              <select
                id="sortFlights"
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as SortOrder)
                }
              >
                <option value="price">Lowest Price</option>
                <option value="duration">Shortest Duration</option>
                <option value="departure">Departure Time</option>
              </select>
            </div>
          </div>

          {sortedFlights.length > 0 ? (
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
          ) : (
            <div className="no-flights">
              <h3>No flights found</h3>
              <p>
                We couldn't find flights for this route. Try another
                origin or destination.
              </p>
            </div>
          )}

          <button
            type="button"
            className="modify-search-btn"
            onClick={handleNewSearch}
          >
            Modify Search
          </button>
        </section>
      )}

      {/* Passenger Information */}
      {selectedFlight && showPassengerForm && (
        <section className="passenger-section">
          <div className="selected-flight">
            <h3>Your Selected Flight</h3>

            <p>
              {selectedFlight.airline} - {selectedFlight.flightNumber}
            </p>

            <p>{origin} → {destination}</p>
            <p>Departure: {selectedFlight.departureTime}</p>
            <p>Price per passenger: ${selectedFlight.price}</p>
          </div>

          <PassengerForm
            passengerCount={passengers}
            onSubmit={handlePassengerSubmit}
          />
        </section>
      )}

      {/* Booking Confirmation */}
      {selectedFlight && bookingReference && (
        <section className="booking-summary">
          <div className="confirmation-card">
            <div className="success-icon">✓</div>

            <h2>Booking Confirmed!</h2>

            <p>
              Your FlyEase demo booking has been completed successfully.
            </p>

            <div className="booking-reference">
              <span>Booking Reference</span>
              <h2>{bookingReference}</h2>
            </div>

            <div className="booking-details">
              <h3>Flight Details</h3>

              <p><strong>Airline:</strong> {selectedFlight.airline}</p>
              <p><strong>Flight Number:</strong> {selectedFlight.flightNumber}</p>
              <p><strong>From:</strong> {origin}</p>
              <p><strong>To:</strong> {destination}</p>
              <p><strong>Departure:</strong> {selectedFlight.departureTime}</p>
              <p><strong>Arrival:</strong> {selectedFlight.arrivalTime}</p>
              <p><strong>Departure Date:</strong> {departureDate}</p>

              {tripType === "round-trip" && (
                <p><strong>Return Date:</strong> {returnDate}</p>
              )}

              <p><strong>Passengers:</strong> {passengers}</p>

              <p>
                <strong>Passenger Names:</strong>{" "}
                {confirmedPassengers
                  .map(
                    (passenger) =>
                      `${passenger.firstName} ${passenger.lastName}`
                  )
                  .join(", ")}
              </p>

              <p>
                <strong>Total:</strong> $
                {selectedFlight.price * passengers}
              </p>
            </div>

            <p className="demo-notice">
              This is a portfolio demonstration. No real flight has
              been booked and no payment has been processed.
            </p>

            <button
              type="button"
              className="search-btn"
              onClick={handleNewSearch}
            >
              Book Another Flight
            </button>
          </div>
        </section>
      )}

      {/* Why FlyEase */}
      <section className="why-us-section" id="why-us">
        <h2>Why Choose FlyEase?</h2>

        <div className="features">
          <div className="feature-card">
            <span>✈️</span>
            <h3>Easy Booking</h3>
            <p>Search and select flights through a simple experience.</p>
          </div>

          <div className="feature-card">
            <span>💰</span>
            <h3>Great Prices</h3>
            <p>Compare flight prices and find an option that suits you.</p>
          </div>

          <div className="feature-card">
            <span>🌎</span>
            <h3>Travel Anywhere</h3>
            <p>Discover destinations and plan your next adventure.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 FlyEase. Portfolio Demo Project.</p>
      </footer>
    </div>
  );
}

export default App;
