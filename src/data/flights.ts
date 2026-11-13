
import type { Flight } from "../types/flight";

export const flights: Flight[] = [
    {
        id: 1,
        airline: "FlyEase Airways",
        flightNumber: "FE101",
        departureTime: "08:30 AM",
        arrivalTime: "11:45 AM",
        duration: "3h 15m",
        price: 320,
        stops: 0,
    },
    {
        id: 2,
        airline: "FlyEase Airways",
        flightNumber: "FE205",
        departureTime: "10:15 AM",
        arrivalTime: "02:00 PM",
        duration: "3h 45m",
        price: 275,
        stops: 1,
    },
    {
        id: 3,
        airline: "FlyEase Airways",
        flightNumber: "FE309",
        departureTime: "01:00 PM",
        arrivalTime: "04:10 PM",
        duration: "3h 10m",
        price: 390,
        stops: 0,
    },
    {
        id: 4,
        airline: "FlyEase Airways",
        flightNumber: "FE410",
        departureTime: "05:30 PM",
        arrivalTime: "09:15 PM",
        duration: "3h 45m",
        price: 295,
        stops: 1,
    },
];
