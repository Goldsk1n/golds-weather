function Loader({ showText = false, height = "40vh", style = {} }) {
    return (
        <div
            className={showText ? "loader center" : "loader"}
            style={{ ...style, height }}
        >
            <div className="spinner"></div>
            {showText && <span className="loader-text">Loading...</span>}
        </div>
    );
}

export default Loader;
