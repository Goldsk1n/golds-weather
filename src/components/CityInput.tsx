import { useContext, useRef } from "react";
import AppContext from "../context/appContext";
import { getCityName } from "../services/weatherService";
import geoCoords from "../utils/geoCoords";
import { FaLocationCrosshairs, FaMagnifyingGlass } from "react-icons/fa6";

function CityInput() {
    const input = useRef<HTMLInputElement>(null);
    const {
        app: { isDark },
        dispatchApp,
    } = useContext(AppContext);
    let time: number;

    return (
        <div className="input-group">
            <span
                onClick={async () => {
                    const coords = await geoCoords();
                    dispatchApp({
                        type: "GEO_COORDS",
                        payload: {
                            lon: coords.longitude,
                            lat: coords.latitude,
                        },
                    });
                    const { country, name } = await getCityName(
                        coords.longitude,
                        coords.latitude
                    );
                    dispatchApp({ type: "COUNTRY", payload: country });
                    dispatchApp({ type: "CITY", payload: name });
                    input!.current!.value = "";
                }}
                style={isDark ? { background: "#37435a" } : {}}
            >
                <FaLocationCrosshairs
                    className="location-icon"
                    style={isDark ? { color: "#fff" } : {}}
                />
            </span>
            <FaMagnifyingGlass
                className="search-icon"
                style={isDark ? { color: "#909090" } : {}}
            />
            <input
                type="text"
                ref={input}
                style={isDark ? { background: "#232b39", color: "#fff" } : {}}
                placeholder="Search for city ..."
                onInput={(e) => {
                    const value = (e.target as HTMLInputElement).value;

                    clearTimeout(time);
                    time = setTimeout(() => {
                        console.log(value);
                        dispatchApp({ type: "CITY", payload: value });
                    }, 500);
                }}
            />
        </div>
    );
}

export default CityInput;
