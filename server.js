const express = require("express");

const db = require("./accounts/accounts-router");

const server = express();

server.use(express.json());
server.use("/api/accounts", db);

server.get("/", (req, res) => {
  res.send("** Server running on port 4000 **");
});

module.exports = server;
