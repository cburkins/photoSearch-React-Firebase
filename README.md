# Description

Started with the code from this tutorial: https://www.youtube.com/watch?v=PKwu15ldZ7k&t=62s

Added the following:

-   Create/read a document from Firebase (i.e. to store roles about user)
-   User Info page shows JSON tree structure of user record
-   PrivateRoute can pass through props to the underlying component
-   Login button on banner
-   Status (next to login button) on banner

# Screenshot

![image](https://user-images.githubusercontent.com/9342308/114705267-8c517000-9cf5-11eb-87ee-944490cb5d0a.png)

# Deployment (Local Hosting & Remote Firestore)

1. Create Firebase Project
1. Create Firebase Web App
1. Create .env.local that looks something like this:

    **NOTE:** These credentials simply tell your client where to find your backend. Given that the backend is further protected by authentication, it's not critical that these client-side keys be protected. They can be saved directly into your javascript code

    ```
    REACT_APP_FIREBASE_API_KEY=AIzaSyBGKhTyBHcHlyhBGW3KJSsAnho2ttW5Kn0
    REACT_APP_FIREBASE_AUTH_DOMAIN=webdevsimp-firebase-auth-dev.firebaseapp.com
    REACT_APP_FIREBASE_PROJECT_ID=webdevsimp-firebase-auth-dev
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=967811120603
    REACT_APP_FIREBASE_APP_ID=1:967811120603:web:3826b9e61b42ce09383bfe
    ```

1. Within Firebase Project Authentication, enable username/password method
1. npm start

# Deployment (New)

1. Enable Firebase Hosting: Within FireBase UI, click on "Hosting" and "Get Started"
1. Should look like this:

    ![image](https://user-images.githubusercontent.com/9342308/114708684-ab520100-9cf9-11eb-8946-31e525611475.png)

1. Install firebase tools: `npm install -g firebase-tools`
1. Sign-in (will open browser): `firebase login`
1. Initiate your project: `firebase init`
    - Runs in CLI
    - Select "Hosting"
    - Existing Project
    - Public directory: "build"
    - Single Page App ? "yes"
    - Automatic Builds ? "no"
    - Verify two new files: ".firebaserc" and "firebase.json"
1. React static site build: `npm run build`
1. Deploy: `firebase deploy`

    ![image](https://user-images.githubusercontent.com/9342308/114709767-fb7d9300-9cfa-11eb-82f8-ff3f2853e594.png)

1. Navigate browswer to the advertised URL
