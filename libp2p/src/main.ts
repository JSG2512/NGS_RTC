import express from "express";
import { createLibp2p } from "libp2p";
import { webSockets } from "@libp2p/websockets";

const app = express();
const server = app.listen(3000);
console.log("실행");

const node = await createLibp2p({
  transports: [webSockets()],
});
