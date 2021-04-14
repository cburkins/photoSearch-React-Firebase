import React, { useContext, useState, useEffect } from "react";
import { auth as firebase_auth } from "../firebase";

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthContextConsumer = AuthContext.Consumer;

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return firebase_auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return firebase_auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return firebase_auth.signOut();
    }

    function resetPassword(email) {
        return firebase_auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        // Adds an observer for changes to the user's sign-in state (only sign-in or sign-out)
        // i.e. Firebase client keeps an open socket connection to its backend server for updates
        const unsubscribe = firebase_auth.onAuthStateChanged((user) => {
            // if "user" exists, then user is signed in
            setCurrentUser(user);
            setLoading(false);
        });

        // react cleanup function (which unsubscribes from backend socket connection)
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
