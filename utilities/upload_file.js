async function upload2() {
    var admin = require("firebase-admin");

    var serviceAccount = require("./conf/admin_key.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "photosearch-dev.appspot.com",
    });

    // Cloud storage
    // const bucket = admin.storage().bucket();

    // Docs: https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload
    const options = {
        destination: `mountains01.jpg`,
        gzip: false,
        contentType: "image/jpg",
        metadata: { contentType: "image/jpg" },
    };
    await admin
        .storage()
        .bucket()
        .upload("./mountains01.jpg", {}, function (err, file, apiResponse) {
            console.log("file:", file.metadata.selfLink);
        });
}

upload2();
