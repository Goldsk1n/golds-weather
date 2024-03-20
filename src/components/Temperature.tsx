import useTemp from "../hooks/useTemp";

function Temperature(props: {temperature: number}) {
    const temp = useTemp(props.temperature);
    return temp;
}

export default Temperature;
