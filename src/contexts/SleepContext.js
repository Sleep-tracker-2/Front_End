import { createContext } from "react";
export const SleepContext = createContext({
    data: [
        { day: "Feb 23rd", hours: 7.5, mood: 2 },
        { day: "Feb 24th", hours: 6, mood: 1 },
        { day: "Feb 25th", hours: 9, mood: 4 },
        { day: "Feb 26th", hours: 7.5, mood: 3 }
    ],
    moods: ["😡", "😔", "😐", "😄"]
});
