require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const config = require("./config");
const mediaFileRoute = require("./routes/file.routes");
const newsletterRoute = require("./routes/email.routes");
const mongodbConnect = require("./db");
const contactModel = require("./models");
const { port, appUrl, allowedDomains } = config;

const corsConfig = (req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  return next();
};

const app = express();
//for cross origin resource sharing
app.use(cors({ origin: allowedDomains, credentials: true }));
app.use(corsConfig);
// compresses all the responses
app.use(compression());
// security
app.use(helmet());
// express config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// mongo db connection
mongodbConnect();
// server static files
app.use("/static", express.static(path.join(__dirname, "public")));
// require all routes
app.use("/api", newsletterRoute);
// media files upload
app.use("/api", mediaFileRoute);


app.get("/", async (req, res) => {
  // const data = await contactModel.find({})
  const data = [{
    "name": "karan",
    "email": "test"
  }]
  res.json({ success: true, data: data })
})

app.post("/contact", async (req, res) => {
  console.log(req.body)
  const data = new contactModel(req.body)
  await data.save()
  res.send({ success: true, message: "data save", data: data })
})

app.put("/update", async (req, res) => {
  console.log(req.body)
  const { _id, ...rest } = req.body

  const data = await contactModel.updateOne({ _id: _id }, rest)
  res.send({ success: true, message: "data Updated Successfully", data: data })
})

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  console.log(id)
  const data = await contactModel.deleteOne({ _id: id })
  res.send({ success: true, message: "data Deleted Successfully", data: data })
})

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
