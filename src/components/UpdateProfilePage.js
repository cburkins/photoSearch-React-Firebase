import React from "react";
import { Container } from "react-bootstrap";
import UpdateProfile from "./UpdateProfile";

function SignupPage() {
    return (
        <div>
            {/* d-flex:  create a flexbox container and to transform direct children into flex items */}
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <UpdateProfile />
                </div>
            </Container>
        </div>
    );
}

export default SignupPage;
