const admin = require('firebase-admin');
const functions = require('firebase-functions');
const creatUser = require('./createuser');
const serviceAccount = require('./serviceaccount.json');
const requestOneTimePassword = require('./requestonetimepassword');
const verifyOTP = require('./verifyotp');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-b8e21.firebaseio.com"
});

exports.creatUser = functions.https.onRequest(creatUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
exports.verifyOTP = functions.https.onRequest(verifyOTP);
