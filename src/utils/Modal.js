import React, { useState } from "react";
import { Modal, Button, InputNumber, Typography } from "antd";
import { navigate } from "@reach/router";

const ModalView = () => {
    const [visible, setVisibility] = useState(false);
    const [num, setNum] = useState("");
    const { Title } = Typography;

    const showModal = () => {
        setVisibility(true);
    };

    const handleOk = (e) => {
        console.log(e);
        setVisibility(false);
        navigate("/page1", { state: { number: num } });
    };

    const handleCancel = (e) => {
        console.log(e);
        setVisibility(false);
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={showModal}
                className="animate__animated animate__pulse"
                // style={{ fontSize: "25px", width: "100px" }}
                size="large"
            >
                START
            </Button>
            <Modal
                title="Let's Begin"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ fontWeight: "bold" }}
            >
                <InputNumber
                    style={{ width: "30%", display: "block", margin: "10%" }}
                    placeholder="Enter here..."
                    value={num}
                    onChange={setNum}
                />
                <Title level={4}>Please enter a number to get started</Title>
            </Modal>
        </div>
    );
};

export default ModalView;
