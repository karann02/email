const express = require("express");
const sendEmailController = require("../controllers/email.controllers");

const route = express.Router();

route.post("http://localhost:5000/api/sendNewsletter", sendEmailController);

module.exports = route;
