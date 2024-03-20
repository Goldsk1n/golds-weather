import { Context, createContext } from "react";

interface appState {
    app: {
        weather: any;
        unit: string;
        city: string;
        country: string;
        isDark: boolean;
        geoCoords: {
            lon: number;
            lat: number;
        };
    },
    dispatchApp: any
}

const initialAppState = {
    weather: null,
    unit: "C",
    city: "Kyiv",
    country: "UA",
    isDark: false,
    geoCoords: {
        lon: 50.45466,
        lat: 30.5238,
    },
};

function appReducer(state: any, action: { type: string; payload: any }) {
    const { type, payload } = action;

    switch (type) {
        case "WEATHER":
            return { ...state, weather: payload };
        case "CITY":
            return { ...state, city: payload };
        case "COUNTRY":
            return { ...state, country: payload };
        case "UNIT":
            return { ...state, unit: payload };
        case "GEO_COORDS":
            return { ...state, geoCoords: payload };
        case "DARK":
            return { ...state, isDark: payload };
        default:
            return state;
    }
}

const AppContext: Context<appState> = createContext({} as appState);

export { appReducer, initialAppState };
export default AppContext;
