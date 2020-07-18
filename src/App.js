import React from "react";
import { Router } from "@reach/router";
import "antd/dist/antd.css";
import "animate.css";

import ModalView from "./utils/Modal";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";

const App = () => {
    return (
        <div>
            <Router>
                <ModalView path="/" />
                <Page1 path="/page1" />
                <Page2 path="/page2" />
                <Page3 path="/page3" />
            </Router>
        </div>
    );
};

export default App;
