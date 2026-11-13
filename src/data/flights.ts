
import type { Flight } from "../types/flight";

export const flights: Flight[] = [
    // Toronto to Vancouver
    {
        id: 1,
        airline: "FlyEase Airways",
        flightNumber: "FE101",
        origin: "Toronto (YYZ)",
        destination: "Vancouver (YVR)",
        departureTime: "08:30 AM",
        arrivalTime: "11:45 AM",
        duration: "5h 15m",
        price: 320,
        stops: 0,
    },
    {
        id: 2,
        airline: "FlyEase Airways",
        flightNumber: "FE102",
        origin: "Toronto (YYZ)",
        destination: "Vancouver (YVR)",
        departureTime: "01:00 PM",
        arrivalTime: "06:45 PM",
        duration: "5h 45m",
        price: 275,
        stops: 1,
    },

    // Toronto to Montreal
    {
        id: 3,
        airline: "FlyEase Airways",
        flightNumber: "FE201",
        origin: "Toronto (YYZ)",
        destination: "Montreal (YUL)",
        departureTime: "09:00 AM",
        arrivalTime: "10:20 AM",
        duration: "1h 20m",
        price: 180,
        stops: 0,
    },
    {
        id: 4,
        airline: "FlyEase Airways",
        flightNumber: "FE202",
        origin: "Toronto (YYZ)",
        destination: "Montreal (YUL)",
        departureTime: "03:30 PM",
        arrivalTime: "05:00 PM",
        duration: "1h 30m",
        price: 150,
        stops: 0,
    },

    // Calgary to Ottawa
    {
        id: 5,
        airline: "FlyEase Airways",
        flightNumber: "FE301",
        origin: "Calgary (YYC)",
        destination: "Ottawa (YOW)",
        departureTime: "07:30 AM",
        arrivalTime: "01:45 PM",
        duration: "4h 15m",
        price: 350,
        stops: 0,
    },
    {
        id: 6,
        airline: "FlyEase Airways",
        flightNumber: "FE302",
        origin: "Calgary (YYC)",
        destination: "Ottawa (YOW)",
        departureTime: "02:00 PM",
        arrivalTime: "08:00 PM",
        duration: "5h 00m",
        price: 290,
        stops: 1,
    },

    // Montreal to Toronto
    {
        id: 7,
        airline: "FlyEase Airways",
        flightNumber: "FE401",
        origin: "Montreal (YUL)",
        destination: "Toronto (YYZ)",
        departureTime: "10:00 AM",
        arrivalTime: "11:25 AM",
        duration: "1h 25m",
        price: 165,
        stops: 0,
    },

    // Ottawa to Halifax
    {
        id: 8,
        airline: "FlyEase Airways",
        flightNumber: "FE501",
        origin: "Ottawa (YOW)",
        destination: "Halifax (YHZ)",
        departureTime: "11:30 AM",
        arrivalTime: "02:00 PM",
        duration: "2h 30m",
        price: 220,
        stops: 0,
    },

    // Vancouver to Calgary
    {
        id: 9,
        airline: "FlyEase Airways",
        flightNumber: "FE601",
        origin: "Vancouver (YVR)",
        destination: "Calgary (YYC)",
        departureTime: "08:00 AM",
        arrivalTime: "10:00 AM",
        duration: "2h 00m",
        price: 195,
        stops: 0,
    },
];
