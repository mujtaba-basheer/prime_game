import React, { Fragment } from "react";
import { Form, Input, Button, Typography, Divider, List, Modal } from "antd";

import Loader from "./../utils/Loader";
import { navigate } from "@reach/router";

const { Title } = Typography;
const { TextArea } = Input;

class Page2 extends React.Component {
    constructor(props) {
        super(props);

        const { primes, rems } = props.location.state;

        this.state = {
            isLoading: true,
            primes: primes,
            isOK: false,
            rems: rems,
            visible: false,
            isRecorded: false,
            obs: "",
            showObs: false,
        };
    }

    componentDidMount() {
        const { primes, rems } = this.state;
        this.setState({ isLoading: false });
    }

    handleOk() {
        this.setState({ visible: false, isRecorded: true, showObs: true });
    }

    render() {
        return this.state.isLoading ? (
            <Loader />
        ) : (
            <div>
                <Title level={3}>Observation</Title>
                <Divider />
                <List
                    className="list-item"
                    size="large"
                    style={{ width: "50%" }}
                    bordered
                    dataSource={this.state.primes}
                    renderItem={(prime) => (
                        <List.Item>
                            {prime} % 4 = {prime % 4}
                        </List.Item>
                    )}
                />
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    initialValues={{ size: "default" }}
                    size={"default"}
                >
                    <Form.Item>
                        <Button
                            type="default"
                            onClick={() => this.setState({ visible: true })}
                        >
                            Record your Observation
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ width: "50px" }}>
                        {this.state.obs && this.state.showObs ? (
                            <Fragment>
                                <h2>Your Observation:</h2>
                                <p>{this.state.obs}</p>
                            </Fragment>
                        ) : null}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className="animate__animated animate__lightSpeedInRight"
                            type="primary"
                            onClick={() => navigate("/")}
                        >
                            FINISH
                        </Button>
                    </Form.Item>
                </Form>
                <Modal
                    title="Enter your observation here..."
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={() =>
                        this.setState({ visible: false, showObs: false })
                    }
                    style={{ fontWeight: "bold" }}
                >
                    <TextArea
                        value={this.state.obs}
                        rows={4}
                        onChange={(e) => this.setState({ obs: e.target.value })}
                    />
                </Modal>
            </div>
        );
    }
}

export default Page2;
