
import type { Flight } from "../types/flight";

interface FlightCardProps {
    flight: Flight;
    origin: string;
    destination: string;
    onSelect: (flight: Flight) => void;
}

function FlightCard({
    flight,
    origin,
    destination,
    onSelect,
}: FlightCardProps) {
    return (
        <div className="flight-card">
            <div>
                <h3>{flight.airline}</h3>
                <p>{flight.flightNumber}</p>
            </div>

            <div>
                <h3>{flight.departureTime}</h3>
                <p>{origin}</p>
            </div>

            <div>
                <p>{flight.duration}</p>
                <p>{flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}</p>
            </div>

            <div>
                <h3>{flight.arrivalTime}</h3>
                <p>{destination}</p>
            </div>

            <div>
                <h2>${flight.price}</h2>
                <button onClick={() => onSelect(flight)}>
                    Select Flight
                </button>
            </div>
        </div>
    );
}

export default FlightCard;
