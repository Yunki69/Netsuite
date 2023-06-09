const axios = require("axios");
const OAuth = require("oauth-1.0a");
var CryptoJS = require("crypto-js");
// OAuth parameters
const consumerKey =
  "4cfede4dd8f3867b1984eb807e7e915dce19603d72f979df181dcc1055303dfd";
const consumerSecret =
  "49b5020728ea88bc81bfa413bb473bbc66fca1f35880370b6f596f206dfb6f0f";
const token =
  "678306f3b3cd93f0035d80bce9caf26c368ff817e470a1a9463d4103fbc9af61";
const tokenSecret =
  "67bdcbf90104e4085ecbe6c3a8e70a78cc40b677e48ba3c90732359872e5633e";
const realm = "8166338_SB1";

const url =
  "https://8166338-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=3032&deploy=1";

//SQL Query//
const dataRequestBody = {
  query:
    "Select * FROM transaction INNER JOIN transactionline on transactionline.transaction = transaction.id INNER JOIN inventoryassignment on inventoryassignment.transactionline = transactionline.id and inventoryassignment.transaction = transactionline.transaction",
};

// Create an OAuth instance
const oauth = OAuth({
  consumer: {
    key: consumerKey,
    secret: consumerSecret,
  },
  signature_method: "HMAC-SHA256",
  hash_function: (baseString, key) =>
    CryptoJS.HmacSHA256(baseString, key).toString(CryptoJS.enc.Base64),
});

// Request data
const requestData = {
  url: url,
  method: "POST",
  data: {},
};

// Generate the OAuth signature
const headers = oauth.toHeader(
  oauth.authorize(requestData, {
    key: token,
    secret: tokenSecret,
  })
);
headers.Authorization += ', realm="' + realm + '"';

// Send the POST request
axios
  .post(requestData.url, dataRequestBody, {
    headers: {
      Authorization: headers.Authorization,
      "User-Agent": "PostmanRuntime/7.32.2",
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    console.log("Response:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
