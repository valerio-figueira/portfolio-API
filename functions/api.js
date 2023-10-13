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
            app.use("/projects", require("./routes/Projects"));
            app.use("/technologies", require("./routes/Technologies"));


            // THIS IS NECESSARY TO APPLY SERVERLESS
            const router = express.Router();


// MAIN ROUTES
router.get("/", cors(), (req, res) => {
    res.json({
        "Hello": "This is my own API, constructed with NodeJS and Express to fit in my portfolio webpage.",
        "Message": "Be welcome to this API! - 18-12-2022. I'm writing this almost in Christmas, and almost in my birthday: 23/12. In this time, I'm dedicating all my efforts to learning web development and its technologies.",
        "Routes": [
            "https://portfolium-api.netlify.app/projects",
            "https://portfolium-api.netlify.app/technologies",
        ],
        "Portfolium": "https://valerio-figueira.github.io/portfolio/",
        "Andrew Lang": ["\"Yes,\" said the North Wind, \"I know where it is. I once blew an aspen leaf there, but I was so tired that for many days afterward I was not able to blow at all. However, if you really are anxious to go there, and are not afraid to go with me, I will take you on my back, and try if I can blow you there.\"", "\"Get there I must,\" said she; \"and if there is any way of going I will; and I have no fear, no matter how fast you go.\" - East of the Sun and West of the Moon"]
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