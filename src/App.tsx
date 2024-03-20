import { useEffect, useReducer } from "react";
import CityInput from "./components/CityInput";
import Weather from "./components/Weather";
import AppContext, { appReducer, initialAppState } from "./context/appContext";
import geoCoords from "./utils/geoCoords";
import getWeather, {
    getCityCoords,
    getCityName,
} from "./services/weatherService";
import Forecast from "./components/Forecast";
import Highlights from "./components/Highlights";
import Hourly from "./components/Hourly";

import "./App.scss";
import "@fontsource/poppins";
import "@fontsource/poppins/500.css"

function App() {
    const [app, dispatchApp] = useReducer(appReducer, initialAppState);
    useEffect(() => {
        const date = new Date();
        const hour = date.getHours();
        if (hour > 18 || hour < 7) {
            dispatchApp({ type: "DARK", payload: true });
        }
    }, []);
    useEffect(() => {
        (async () => {
            const { longitude: lon, latitude: lat } = await geoCoords();
            if (lon && lat) {
                const { name, country } = await getCityName(lon, lat);
                dispatchApp({ type: "GEO_COORDS", payload: { lon, lat } });
                dispatchApp({ type: "CITY", payload: name });
                dispatchApp({ type: "COUNTRY", payload: country });
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { lon, lat, country } = await getCityCoords(app.city);
            dispatchApp({ type: "GEO_COORDS", payload: { lon, lat } });
            dispatchApp({ type: "COUNTRY", payload: country });
        })();
    }, [app.city]);

    useEffect(() => {
        (async () => {
            const data = await getWeather(app.geoCoords.lon, app.geoCoords.lat);
            dispatchApp({ type: "WEATHER", payload: data });
            console.log(data);
            const formatter = Intl.DateTimeFormat([], {
                hour12: false,
                hour: "numeric",
                timeZone: data.timezone,
            });
            const localTime = parseInt(
                formatter
                    .format(new Date(data.current.dt * 1000))
                    .replace(/[A-Za-z]/gi, "")
            );
            const sunset = parseInt(
                formatter
                    .format(new Date(data.current.sunset * 1000))
                    .replace(/[A-Za-z]/gi, "")
            );
            const sunrise = parseInt(
                formatter
                    .format(new Date(data.current.sunrise * 1000))
                    .replace(/[A-Za-z]/gi, "")
            );
            if (localTime > sunset || localTime < sunrise) {
                dispatchApp({ type: "DARK", payload: true });
            } else {
                dispatchApp({ type: "DARK", payload: false });
            }
        })();
    }, [app.geoCoords.lat, app.geoCoords.lon]);

    const colLeftStyle = {
        background: "#19202d",
        color: "#fff",
    };
    const colRightStyle = {
        background: "#232b39",
        color: "#fff",
    };
    return (
        <AppContext.Provider value={{ app, dispatchApp }}>
            <section className="container">
                <div
                    className="col-left"
                    style={app.isDark ? colLeftStyle : {}}
                >
                    <CityInput />
                    <Weather />
                </div>
                <div
                    className="col-right"
                    style={app.isDark ? colRightStyle : {}}
                >
                    <div className="top-header">
                        <h2 className="heading">Today</h2>
                    </div>
                    <Hourly />
                    <h2 className="heading">Highlights</h2>
                    <Highlights />
                    <h2 className="heading">This Week</h2>
                    <Forecast />
                </div>
            </section>
        </AppContext.Provider>
    );
}

export default App;
