import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase";

// This is a React Custom Hook (as it's name starts with "use")

const useUserRoleByUID = (UID, email) => {
    const [userRole, setUserRole] = useState([]);
    console.log(`Running hook useUserRoleByUID: (UID=${UID}, email=${email}`);

    useEffect(() => {
        console.log("   Running useEffect() hook within useUserRoleByUID");
        if ((UID, email)) {
            // Get firestore reference to document named by users UID
            var firebaseDocRef = projectFirestore.collection("users").doc(UID);

            firebaseDocRef
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        console.log("   User already has role doc:", doc.data());
                        setUserRole(doc.data());
                    } else {
                        // doc.data() will be undefined in this case
                        console.log(`   No such document for UID=${UID}`);
                        if (UID.length > 10) {
                            // Write a doc
                            console.log(`Creating a userrole doc for UID=${UID}`);
                            firebaseDocRef.set({
                                approved: false,
                                email: email,
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.log("   Error getting role document:", error);
                });
        }
        // return a cleanup function which gets called automatically when needed
        // return () => unsub;
    }, [UID, email]);

    // Return a useState variable to caller
    return userRole;
};

export default useUserRoleByUID;
