import React from "react";
import { Container } from "react-bootstrap";
import Signup from "./Signup";

function SignupPage() {
    return (
        <div>
            {/* d-flex:  create a flexbox container and to transform direct children into flex items */}
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Signup />
                </div>
            </Container>
        </div>
    );
}

export default SignupPage;
