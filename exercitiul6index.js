"use strict";

const express = require("express");
const departmentsRouter = require("./routes3/departments");
const statusRouter = require("./routes3/status");
require("dotenv").config();

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);

app.use("/api", departmentsRouter);
app.use("/status", statusRouter);

app.use((err, req, res, next) => {
    console.log("=== Error stack ===");
    console.log(err.stack);  
    next(err);              
});

app.use((err, req, res, next) => {
    res.status(500).json({ Error: "Something broke!" });
});

app.get("/", (req, res) => {
    res.status(200).send("Serverul functioneaza!");
});

app.set("port", process.env.PORT || 7000);
app.listen(app.get("port"), () => {
    console.log(`Server started on http://localhost:${app.get("port")}`);
});