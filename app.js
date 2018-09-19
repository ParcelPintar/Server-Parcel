require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = "development";
}

let DBurl = {};
