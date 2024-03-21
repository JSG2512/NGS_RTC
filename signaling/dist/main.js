import express from "express";
import { ExpressPeerServer } from "peer";
import { Util } from "./module/util.js";
const app = express();
app.get("/test", (_req, res, _next) => {
    res.send("Hello world!");
});
const server = app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
const peerServer = ExpressPeerServer(server, {
    host: "0.0.0.0",
    port: 3000,
    path: "/",
    allow_discovery: true,
    proxied: true,
    key: "peer",
});
app.use("/peer", peerServer, (_req, _res, _next) => {
    console.log("use");
});
peerServer.on("message", (_client, _data) => {
    console.log("message");
    console.log(_data);
});
peerServer.on("error", (err) => {
    console.log(err);
});
peerServer.on("connection", (_client) => {
    console.log("connection");
    console.log(Util.unixTimestampToISO8601(_client.getLastPing()));
    console.log(_client.getId());
    console.log(_client.getToken());
    console.log(_client.getSocket());
});
peerServer.on("disconnect", (_client) => {
    console.log("disconnect");
});
