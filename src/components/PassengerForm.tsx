
import { useState, type FormEvent } from "react";

interface PassengerFormProps {
    passengerCount: number;
    onSubmit: (passengers: Passenger[]) => void;
}

export interface Passenger {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

function PassengerForm({
    passengerCount,
    onSubmit,
}: PassengerFormProps) {
    const [passengers, setPassengers] = useState<Passenger[]>(
        Array.from({ length: passengerCount }, () => ({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        }))
    );

    const handleChange = (
        index: number,
        field: keyof Passenger,
        value: string
    ) => {
        setPassengers((previous) =>
            previous.map((passenger, i) =>
                i === index ? { ...passenger, [field]: value } : passenger
            )
        );
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(passengers);
    };

    return (
        <form onSubmit={handleSubmit} className="passenger-form">
            <h2>Passenger Information</h2>

            {passengers.map((passenger, index) => (
                <div className="passenger-card" key={index}>
                    <h3>Passenger {index + 1}</h3>

                    <label htmlFor={`firstName-${index}`}>First Name</label>
                    <input
                        id={`firstName-${index}`}
                        value={passenger.firstName}
                        onChange={(e) =>
                            handleChange(index, "firstName", e.target.value)
                        }
                        required
                    />

                    <label htmlFor={`lastName-${index}`}>Last Name</label>
                    <input
                        id={`lastName-${index}`}
                        value={passenger.lastName}
                        onChange={(e) =>
                            handleChange(index, "lastName", e.target.value)
                        }
                        required
                    />

                    <label htmlFor={`email-${index}`}>Email</label>
                    <input
                        id={`email-${index}`}
                        type="email"
                        value={passenger.email}
                        onChange={(e) =>
                            handleChange(index, "email", e.target.value)
                        }
                        required
                    />

                    <label htmlFor={`phone-${index}`}>Phone</label>
                    <input
                        id={`phone-${index}`}
                        type="tel"
                        value={passenger.phone}
                        onChange={(e) =>
                            handleChange(index, "phone", e.target.value)
                        }
                        required
                    />
                </div>
            ))}

            <button type="submit" className="search-btn">
                Continue to Confirmation
            </button>
        </form>
    );
}

export default PassengerForm;
