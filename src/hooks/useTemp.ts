import { useContext } from "react";
import AppContext from "../context/appContext";

function useTemp(temp, toFixed = 0) {
    const {
        app: { unit },
    } = useContext(AppContext);

    return parseFloat(temp).toFixed(toFixed);
}

export default useTemp;
