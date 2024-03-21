import express, { Request, Response } from "express";
import { ExpressPeerServer } from "peer";
import { Util } from "./module/util.js";
import { getInstance, objectToBuffer } from "./module/kafka.js";
import { EachBatchPayload } from "kafkajs";

const app = express();

app.get("/ishealthy", (_req: Request, res: Response, _next) => {
  console.log("health check");
  res.send("ok");
});

const server = app.listen(3000);
const kafkaProducer = await getInstance("producer");

const peerServer = ExpressPeerServer(server, {
  host: "0.0.0.0",
  path: "/",
  allow_discovery: true,
  proxied: true,
  key: "ngs",
  corsOptions: "*",
});

app.use("/peer", peerServer);

peerServer.on("message", (_client, _data) => {
  console.log("message");
  console.log(_data);
});
peerServer.on("error", (err) => {
  console.log(err);
});

peerServer.on("connection", (_client) => {
  const token = _client.getToken();
  const socket = _client.getSocket();
  const id = _client.getId();
  const lastPing = _client.getLastPing();

  kafkaProducer.send({
    topic: process.env.TOPIC_NGS ?? "ngs",
    messages: [
      {
        key: id,
        value: objectToBuffer({
          token,
          socket,
          id,
          lastPing,
        }),
      },
    ],
  });
  console.log(Util.unixTimestampToISO8601(_client.getLastPing()));
});

peerServer.on("disconnect", (_client) => {
  console.log("disconnect");
});

const kafkaConsumer = await getInstance("consumer");

kafkaConsumer.run({
  autoCommit: true,
  eachBatchAutoResolve: true,
  eachBatch: async (payload: EachBatchPayload) => {
    const messages = payload.batch.messages;
    const topic = payload.batch.topic;
    const partition = payload.batch.partition;

    for (const message of messages) {
      const key = message.key?.toString();
      const value = JSON.parse(message.value?.toString());

      // if(true) {
      //   const realm = new realm
      // }
    }
  },
});
