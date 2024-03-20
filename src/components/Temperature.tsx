function Temperature(props: {temperature: string}) {
    const temp = parseFloat(props.temperature).toFixed(0);
    return temp;
}

export default Temperature;
