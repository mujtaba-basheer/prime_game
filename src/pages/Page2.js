import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

import Loader from "./../utils/Loader";
import { navigate } from "@reach/router";

class Page2 extends React.Component {
    constructor(props) {
        super(props);

        const { primes } = props.location.state;

        this.state = {
            isLoading: true,
            primes: primes,
            inputs: [],
            isOK: false,
            rems: [],
        };
    }

    componentDidMount() {
        const { primes } = this.state;
        const inputs = new Array(primes.length);
        const rems = new Array(primes.length);
        for (let i = 0; i < primes.length; i++) {
            rems[i] = primes[i] % 4;
            inputs[i] = "";
        }
        this.setState({ inputs, rems, isLoading: false });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { rems, inputs } = this.state;
        const errs = new Array(rems.length);
        let noOfErrs = 0;
        for (let i = 0; i < rems.length; i++) {
            errs[i] = rems[i] == inputs[i];
        }
        for (let i = 0; i < errs.length; i++) {
            const el = document.getElementById(`prime${i}`);
            if (errs[i]) {
                el.classList.add(["correct"]);
                el.classList.remove(["wrong"]);
            } else {
                el.classList.add(["wrong"]);
                el.classList.remove(["correct"]);
                noOfErrs++;
            }
        }
        if (noOfErrs == 0) {
            this.setState({ isOK: true });
        }
    }

    handleOK() {
        const { primes, rems } = this.state;
        navigate("/page3", { state: { primes, rems } });
    }

    handleInput(value, index) {
        const { inputs } = this.state;
        inputs[index] = value;
        this.setState({ inputs });
    }

    render() {
        return this.state.isLoading ? (
            <Loader />
        ) : (
            <div>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    initialValues={{ size: "default" }}
                    size={"default"}
                >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        {this.state.primes.map((prime, index) => (
                            <Col key={prime}>
                                <Form.Item key={prime} className="input-num">
                                    <h4>{prime} % 4</h4>
                                    <Input
                                        id={`prime${index}`}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            this.handleInput(
                                                e.target.value,
                                                index
                                            );
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        ))}
                    </Row>
                    <Form.Item>
                        {this.state.isOK ? (
                            <Button
                                type="primary"
                                onClick={this.handleOK.bind(this)}
                                className="animate__animated animate__fadeInUp"
                            >
                                Proceed
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                onClick={this.handleSubmit.bind(this)}
                            >
                                Check
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Page2;
