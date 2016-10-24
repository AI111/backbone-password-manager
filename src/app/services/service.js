import firebase from 'firebase';
class Service {
    constructor() {

    }
    toggleSignIn(email, password) {
        return new Promise((resolve, reject) => {



            if (firebase.auth().currentUser) {
                firebase.auth().signOut();
            } else {
                if (email.length < 4) {
                    reject('Please enter an email address.');

                }
                if (password.length < 4) {
                    reject('Please enter a password.');
                }

                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(user => {
                        resolve(user);
                    })
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(error);
                        if (errorCode === 'auth/wrong-password') {
                            reject('Wrong password.');
                        } else {
                            reject(errorMessage);
                        }

                    });
            }
        });
    }
    signOut(){
        firebase.auth().signOut();
    }
    /**
     * Handles the sign up button press.
     */
    handleSignUp(email, password) {
        return new Promise((resolve, reject) => {
            if (email.length < 4) {
                reject('Please enter an email address.');
            }
            if (password.length < 4) {
                reject('Please enter a password.');
            }

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                    reject('The password is too weak.');
                } else {
                    reject(errorMessage);
                }

            });
        });
    }
    /**
     * Sends an email verification to the user.
     */
    sendEmailVerification() {
        // [START sendemailverification]
        firebase.auth().currentUser.sendEmailVerification().then(function () {
            // Email Verification sent!
            // [START_EXCLUDE]
            alert('Email Verification Sent!');
            // [END_EXCLUDE]
        });
        // [END sendemailverification]
    }
    sendPasswordReset(email) {
        // [START sendpasswordemail]
        firebase.auth().sendPasswordResetEmail(email).then(function () {
            // Password Reset Email Sent!
            // [START_EXCLUDE]
            alert('Password Reset Email Sent!');
            // [END_EXCLUDE]
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/invalid-email') {
                alert(errorMessage);
            } else if (errorCode == 'auth/user-not-found') {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
        // [END sendpasswordemail];
    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    initService() {
        let config = {
            apiKey: "AIzaSyBaaei_bTd7YXZr6Wfl5mpFrC6w-r1sdjs",
            authDomain: "backbone-90bb1.firebaseapp.com",
            databaseURL: "https://backbone-90bb1.firebaseio.com",
            storageBucket: "backbone-90bb1.appspot.com",
            messagingSenderId: "1065412164368"
        };
        firebase.initializeApp(config);
        return new Promise((resolve, reject) => {

            firebase.auth().onAuthStateChanged((user) => {
                // User is signed in.
                // var displayName = user.displayName;
                // var email = user.email;
                // var emailVerified = user.emailVerified;
                // var photoURL = user.photoURL;
                // var isAnonymous = user.isAnonymous;
                // var uid = user.uid;
                // var providerData = user.providerData;
                this.user = user;
                resolve(user);
            });
        });
    }
    getUser() {
        return firebase.auth().currentUser;
    }
    addItem(model) {
        let userId = this.user.uid || getUser().uid;
        let ref = firebase.database().ref("users/" + userId + "/items").push(model);
        let id = ref.key;
        model.id = id;
    }

    getItems() {
        return new Promise((resolve, reject) => {
            let userId = this.user.uid || getUser().uid;
            console.log('uid', userId);
            firebase.database().ref("users/" + userId + "/items").once("value")
                .then(data => {
                    console.log("data", data);
                    resolve(data);
                });
        });

    }

}

export let service = new Service();