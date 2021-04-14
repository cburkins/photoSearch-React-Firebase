import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ render: orig_render, component: orig_component, ...rest }) {
    // Equivalent to useContext(AuthContext)
    const { currentUser } = useAuth();
    return (
        <Route
            // Pass through rest of props originally used (imporant to avoid render and component)
            {...rest}
            // And the render function
            render={(props) => {
                // If user is authenticated show desired component, otherwise redirect to login route
                return !!currentUser && !!orig_render ? orig_render(props) : <Redirect to="/login" />;
            }}
        />
    );
}
