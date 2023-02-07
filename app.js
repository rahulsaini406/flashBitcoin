"use strict";
const https = require("https");
const fs = require("fs");
const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const cors = require('cors');
const trasnfer = require("./transfer")

const app = express();

const PORT = 8443

// log requests
app.use(morgan('tiny'));


app.use(cors());

// support parsing of application/json type post data
app.use(bodyparser.json());
// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

// load routers
app.get("/trasnfer", trasnfer.transfer);

// const options = {
//   key: fs.readFileSync("./ssl/d997b_7783f_30697d556614779d35d7e7f601dc2986.key"),
//   cert: fs.readFileSync("./ssl/techyroots_com_d997b_7783f_1677455999_62994908f4be848eb4027069437f70ac.crt")
// };

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });
// https.createServer(options, app).listen(PORT, ()=> { console.log(`Server is running on ${Date.now()}`)});