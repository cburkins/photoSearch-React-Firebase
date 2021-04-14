import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase";

// This is a React Custom Hook (as it's name starts with "use")

const useUserRoleList = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        // onSnapShot() fires once initially, then again whenever the Firestore Collection changes
        const unsub = projectFirestore
            .collection(collection)
            .orderBy("roles")
            .onSnapshot(
                (snap) => {
                    let documents = [];
                    snap.forEach((doc) => {
                        // spread open all attributes from .data(), along with the doc.id itself
                        documents.push({ ...doc.data(), id: doc.id });
                    });
                    setDocs(documents);
                },
                (error) => {
                    console.warn("Got error from Firestore call in useUserRoleList:", error.name, error.code);

                    // update our own local state within this React Custom Hook
                    setDocs([]);
                }
            );

        // return a cleanup function which gets called automatically when needed
        return () => unsub;
    }, [collection]);

    // Return a useState variable to caller
    return docs;
};

export default useUserRoleList;
