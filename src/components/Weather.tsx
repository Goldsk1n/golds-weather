import { useContext } from "react";
import AppContext from "../context/appContext";
import Loader from "./Loader";
import Temperature from "./Temperature";
import {FaCloudversify, FaLocationDot} from "react-icons/fa6";

function Weather() {
    const {
        app,
        app: { weather, unit },
    } = useContext(AppContext);

    if (!weather) {
        return <Loader showText={true} height="40vh" />;
    }

    const { current } = weather;
    const date = new Date();
    const formatter = Intl.DateTimeFormat([], {
        hour12: false,
        hour: "numeric",
        minute: "2-digit",
        timeZone: weather.timezone,
    });
    const dayFormatter = Intl.DateTimeFormat([], {
        weekday: "long",
        timeZone: weather.timezone,
    });
    return (
        <>
            <div
                className="weather-icon"
                style={{
                    background: `url(/src/assets/${current.weather[0].icon}.png)`,
                }}
            ></div>
            <h2 className="temp">
                <Temperature temperature={current.temp} />
                <span>°{unit}</span>
            </h2>
            <div className="feels-like">
                Feels like <Temperature temperature={current.feels_like} />{" "}
                °{unit}
            </div>
            <div className="description">
                <FaCloudversify className="cloud-icon"/>&nbsp;
                {current.weather[0].description}
            </div>
            <div
                className="divider"
                style={app.isDark ? { background: "#3B435E" } : {}}
            ></div>
            <div className="day">
                {dayFormatter.format(date)},{" "}
                <span>{formatter.format(date)}</span>
            </div>
            <div className="city">
                <FaLocationDot/> {app.city},{" "}
                {app.country}
            </div>
        </>
    );
}

export default Weather;
