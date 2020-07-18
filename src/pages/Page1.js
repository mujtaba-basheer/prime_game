import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

import Loader from "./../utils/Loader";
import { navigate } from "@reach/router";

class Page1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            number: props.location.state.number,
            isLoading: true,
            primes: [],
            inputs: [],
            isOK: false,
            primeSets: new Set(),
        };
    }

    componentDidMount() {
        const { number, primeSets } = this.state;
        const primes = [];
        const inputs = [];
        for (let i = 1; i <= number; i++) {
            if (this.isPrime(i)) {
                primes.push(i);
                primeSets.add(i);
                inputs.push("");
            }
        }
        this.setState({
            primes,
            inputs,
            isLoading: false,
            primeSets,
        });
    }

    isPrime(num) {
        let flag = true;
        if (num == 1) {
            flag = false;
        } else {
            for (let i = 2; i < num; i++) {
                if (num % i == 0) {
                    flag = false;
                    break;
                }
            }
        }
        return flag;
    }

    handleSubmit(event) {
        event.preventDefault();
        const { inputs, primeSets, primes } = this.state;
        const errs = new Array(inputs.length);
        let noOfErrs = 0;
        for (let i = 0; i < inputs.length; i++) {
            if (primeSets.has(+inputs[i])) {
                primeSets.delete(+inputs[i]);
                errs[i] = true;
            } else {
                errs[i] = false;
            }
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
        } else {
            const newSet = new Set();
            for (let i = 0; i < primes.length; i++) {
                newSet.add(primes[i]);
            }
            this.setState({ primeSets: newSet });
        }
    }

    handleOK() {
        const { primes } = this.state;
        navigate("/page2", { state: { primes } });
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
                                <Form.Item>
                                    <h4>Prime {index + 1}</h4>
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
                        <h3 className="animate__animated animate__lightSpeedInLeft">
                            PS: You can enter the numbers in any order.
                        </h3>
                    </Form.Item>

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

export default Page1;
