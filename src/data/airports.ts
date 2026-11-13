
export interface Airport {
    code: string;
    city: string;
    name: string;
}

export const airports: Airport[] = [
    {
        code: "YYZ",
        city: "Toronto",
        name: "Toronto Pearson International Airport",
    },
    {
        code: "YVR",
        city: "Vancouver",
        name: "Vancouver International Airport",
    },
    {
        code: "YUL",
        city: "Montreal",
        name: "Montréal–Trudeau International Airport",
    },
    {
        code: "YYC",
        city: "Calgary",
        name: "Calgary International Airport",
    },
    {
        code: "YOW",
        city: "Ottawa",
        name: "Ottawa International Airport",
    },
    {
        code: "YHZ",
        city: "Halifax",
        name: "Halifax Stanfield International Airport",
    },
];
