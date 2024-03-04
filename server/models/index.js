const mongoose = require("mongoose");

const express = require("express");
const app = express();

const FileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { timestamps: true }
);

const schemaData = mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  date: String,
}, {
  timestamps: true
})


const fileModel = mongoose.model("media", FileSchema);

const contactModel = mongoose.model("contact", schemaData)



module.exports = { fileModel, contactModel }
