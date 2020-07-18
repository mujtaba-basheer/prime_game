import React from "react";
import "./../style.css";

class Loader extends React.Component {
    render() {
        return (
            <div className="loader-container">
                <div className="loading"></div>
            </div>
        );
    }
}

export default Loader;
