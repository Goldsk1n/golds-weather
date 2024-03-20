import { ReactNode, useContext } from "react";
import AppContext from "../context/appContext";

function Card(props: {children: ReactNode, className: string}) {
    const {
        app: { isDark },
    } = useContext(AppContext);
    const card = {
        background: "rgb(25 32 45)",
        color: "#fff",
    };
    return (
        <div className={props.className} style={isDark ? card : {}}>
            {props.children}
        </div>
    );
}

export default Card;
