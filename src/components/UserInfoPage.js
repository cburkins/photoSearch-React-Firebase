import React, { useContext, useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { AuthContext } from "../contexts/AuthContext";
import useUserRoleByUID from "../hooks/useUserRoleByUID";

const UserInfoPage = (props) => {
    let authContext = useContext(AuthContext);

    let [userInfo, setUserInfo] = useState(null);
    // React Custom Hook will attempt to get/create user role record each time userInfo udpates
    let userRole = useUserRoleByUID(userInfo?.uid, userInfo?.email);

    // Get the current user and record into our state
    useEffect(() => {
        let currentUser = authContext.currentUser;
        console.log("Setting userInfo to:", currentUser);
        setUserInfo(currentUser);
    }, [authContext]);

    return (
        <div style={{ margin: "40px" }}>
            <div>User Info Page</div>
            <div>Custom message = {props.custom_message}</div>
            <br />
            <h2>Selected Properties</h2>
            <div>Current User Email: {userInfo?.email}</div>
            <div>Current User UID: {userInfo?.uid}</div>
            <br />
            <h2>UserMeta (Roles)</h2>
            <div>
                <ReactJson src={userRole} collapsed="2" />
            </div>
            <br />
            <h2>Entire User Info Object</h2>
            {userInfo ? <ReactJson src={userInfo} collapsed="1" /> : <span>No User Defined</span>}
        </div>
    );
};

UserInfoPage.defaultProps = {
    custom_message: "No custom message provided via props",
};

export default UserInfoPage;
