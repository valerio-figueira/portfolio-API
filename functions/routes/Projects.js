const router = require("express").Router();
const Projects = require("../models/Projects");


// CREATE
router.post("/", async (req, res) => {
    const {title, description, content, image} = req.body;

    const project = {
        title,
        description,
        content,
        image
    }

    try{
        await Projects.create(project);

        res.status(201).json({message: "Project registered successfully"})
    } catch(error){
        res.status(500).json({error: error})
    }
})

// READ
router.get("/", async (req, res) => {
    try{
        const projects = await Projects.find();

        res.status(200).json(projects);
    } catch(error){
        res.status(500).json({error: error});
    };
})

// READ ONE
router.get("/:id", async (req, res) => {
    try{
        await Projects.findOne({_id: req.params.id}).lean().then(project => {
            if(project){
                res.status(200).json(post)
            }
        }).catch(error => {
            res.status(500).json({error: error});
        })

    } catch(error){
        res.status(500).json({error: error});
    }
})

// UPDATE


// DELETE



module.exports = router;