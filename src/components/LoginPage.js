import React from "react";
import Login from "./Login";
import { Container } from "react-bootstrap";

function LoginPage() {
    return (
        <div>
            {/* d-flex:  create a flexbox container and to transform direct children into flex items */}
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Login />
                </div>
            </Container>
        </div>
    );
}

export default LoginPage;
