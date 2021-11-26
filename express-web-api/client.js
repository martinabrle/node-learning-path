const http = require("http");

http.get({
    port: 3000,
    hostname: "localhost",
    path: "/users",
    headers: {
        authorization: "supersecret"
    }
}, (res) => {
    console.log("connected");
    res.on("data", (chunk) => {
        console.log("chunk", "" + chunk);
    });
    res.on("end", () => {
        console.log("No more data");
    });
    res.on("close", () => {
        console.log("Closing connection");
    });
});