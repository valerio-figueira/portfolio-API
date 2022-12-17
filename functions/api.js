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
                methods: ["GET", "POST"]
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
            app.use("/projects", require("./routes/Projects"));


            // THIS IS NECESSARY TO APPLY SERVERLESS
            const router = express.Router();


// MAIN ROUTES
router.get("/", cors(), (req, res) => {
    res.json({
        "Hello": "This is my own API, made to fulfill my Portfolio with projects"
    })
})

// SERVE IMAGES
router.get('/imgs/:name', cors(), (req, res) => {
    res.sendFile(req.params.name)
})



app.use("/", router);


    // MONGODB CONNECT
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = process.env.DB_PASSWORD;

    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.vimpoeg.mongodb.net/portfolium?retryWrites=true&w=majority`).then(() => {
        console.log('Connected with MongoDB!')
    }).catch((error) => {
        console.log("Fail to connect with MongoDB: " + error);
    });



module.exports.handler = serverless(app);