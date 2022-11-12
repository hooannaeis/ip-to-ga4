const https = require("https");

let GA4_URL_BASE =
  "https://region1.google-analytics.com/g/collect?v=2&tid=G-BQPSWX37K0&cid=882906923.1666704587&ul=en&sr=1680x1050dl=https%3A%2F%2Ficanhazip.com%2F&dt=i-can-haz-ip&en=page_view";

const IP_URL = "https://icanhazip.com";

makeHttpGet(IP_URL, sendIPTOGA4, console.error);

function sendIPTOGA4(ip) {
  GA4_URL_BASE += "&ep.ip_address=" + ip.trim();
  console.log(GA4_URL_BASE);
  makeHttpGet(GA4_URL_BASE, console.log, console.error);
}

function makeHttpGet(url, successCallback, errorCallback) {
  https
    .get(url, (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        successCallback(data);
      });
    })
    .on("error", (err) => {
      errorCallback("Error: " + err.message);
    });
}
