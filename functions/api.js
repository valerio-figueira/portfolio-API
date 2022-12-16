const express = require("express");
const app = express();
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();


            // MIDDLEWARE TO ENABLE CORS (CROSS ORIGIN RESOURCE SHARING)
            app.use(cors({
                origin: "*",
                methods: ["GET"]
            }));

            // MIDDLEWARE FOR STATIC FILES
            app.use(express.static(path.join(__dirname, 'public')));

            // JSON CONFIG IN MIDDLEWARES
            app.use(
                express.urlencoded({
                    extended: true
                })
            );
            app.use(express.json());

            // MIDDLEWARE TO REDIRECT ALL ENTRIES POINTS TO THEIR RESPECTIVELY ROUTES
            /* ALL ROUTES GOES INSIDE HERE */


            const router = express.Router();


// MAIN ROUTES
router.get("/", cors(), (req, res) => {
    res.json({
        "Hello": "This is my own API, made to fulfill my Portfolio with projects"
    })
})



app.use("/", router);

module.exports.handler = serverless(app);