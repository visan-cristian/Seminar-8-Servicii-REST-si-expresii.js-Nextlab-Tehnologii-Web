"use strict";

const express = require("express");
const departmentsRouter = require("./routes2/departments");
const statusRouter = require("./routes2/status");
require("dotenv").config();

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);

app.use(express.json());

app.use("/api", departmentsRouter);
app.use("/status", statusRouter);

app.get("/", (req, res) => {
    res.status(200).send("Serverul functioneaza!");
});

app.set("port", process.env.PORT || 7000);
app.listen(app.get("port"), () => {
    console.log(`Server started on http://localhost:${app.get("port")}`);
});