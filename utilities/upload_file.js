var admin = require("firebase-admin");
var util = require("util");

// Service Account was created in Firebase Admin Console
var serviceAccount = require("./conf/admin_key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "photosearch-dev.appspot.com",
});

// --------------------------------------------------------------------------------------------
async function uploadToFirebaseStorage(filePath) {
    // Docs: https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload
    const options = {
        destination: filePath,
        //     gzip: false,
        //     contentType: "image/jpg",
        //     metadata: { contentType: "image/jpg" },
    };

    // let uploadPromise = admin.storage().bucket().upload("./images/mountains01.jpg", options);
    const storage = admin.storage();
    let filesMetaData = await storage.bucket().upload(filePath, options);

    // Get signed download URL
    const file = storage.bucket().file(filePath);
    let download_url_desired_lifetime_mins = 10;
    let signed_urls = await file.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 1000 * 60 * download_url_desired_lifetime_mins, // 10 minutes
    });

    // Return first (and only ?) signed download URL
    return signed_urls[0];
}

// --------------------------------------------------------------------------------------------
async function uploadFile(filePath) {
    const fileDownloadURL = await uploadToFirebaseStorage(filePath);
    await createDocument({ signed_url: fileDownloadURL, filepath: filePath }, filePath);
}

// --------------------------------------------------------------------------------------------

async function createNewFireStoreDocument(newDocument) {
    // Create reference to Firestore Collection
    let collectionRef = admin.firestore().collection("images");

    // Get timestamp from server, and append to desired newDocument
    const createTimestamp = admin.firestore.FieldValue.serverTimestamp;
    newDocument.createdAt = createTimestamp();

    // Add the new document to Firestore
    collectionRef.add(newDocument).then((documentReference) => {
        let firestore = documentReference.firestore;
        console.log(`Root location for document is ${firestore.formattedName}`);
    });

    // // Create firestore document with specified (rather than random) document ID
    // let firestoreDocReference = collectionRef.doc("document_id_unique_number_12345");
    // firestoreDocReference.set(newDocument).then((response) => {
    //     console.log(`Document written at ${response.updateTime}`);
    // });
}

// --------------------------------------------------------------------------------------------

async function UpsertFireStoreDocument(newDocument, filePath) {
    // Create reference to Firestore Collection
    let collectionRef = admin.firestore().collection("images");

    // Get timestamp from server, and append to desired newDocument
    const createTimestamp = admin.firestore.FieldValue.serverTimestamp;
    newDocument.createdAt = createTimestamp();

    let query = collectionRef.where("filepath", "==", filePath);
    let querySnapshot = await query.get();
    console.log("Number of matching docs:", querySnapshot.size);
    // querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    // });

    if (querySnapshot.size === 0) {
        console.log("Creating new document");
        // Add the new document to Firestore
        collectionRef.add(newDocument).then((documentReference) => {
            let firestore = documentReference.firestore;
            console.log(`Root location for document is ${firestore.formattedName}`);
        });
    } else if (querySnapshot.size === 1) {
        console.log("Updating existing document");
        let docData = querySnapshot.docs[0].data();
        let docRef = querySnapshot.docs[0].ref;
        console.log("update_count:", docData.write_count ?? 0);
        newDocument.write_count = (docData.write_count ?? 0) + 1;
        docRef.update(newDocument).then((response) => {
            console.log(`Document written at:`, response);
        });

        // Update a document
    } else {
        let red = "\x1b[31m";
        let reset = "\x1b[0m";
        // Hey now, there should only be 0 or 1 documents matching the specified path
        console.log(`${red}%s${reset}`, `Error!  You have ${querySnapshot.size} documents matching your query.`); //cyan
    }

    // // Create firestore document with specified (rather than random) document ID
    // let firestoreDocReference = collectionRef.doc("document_id_unique_number_12345");
    // firestoreDocReference.set(newDocument).then((response) => {
    //     console.log(`Document written at ${response.updateTime}`);
    // });
}

// --------------------------------------------------------------------------------------------

async function createDocument(newDocument, filePath) {
    await UpsertFireStoreDocument(newDocument, filePath);
}

// --------------------------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------------------------

uploadFile("images/mountains01.jpg");

// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
