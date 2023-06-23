const router = require("express").Router();
const Project = require("../models/Projects");


// CREATE
router.post("/", async (req, res) => {
    const {title, description, images, url} = req.body;

    const project = {
        title,
        description,
        images,
        url
    }

    try{
        await Project.create(project);

        res.status(201).json({message: "Project registered successfully"})
    } catch(error){
        res.status(500).json({error: error})
    }
})

// READ
router.get("/", async (req, res) => {
    try{
        const projects = await Project.find().lean().sort({ date: -1 });

        res.status(200).json(projects);
    } catch(error){
        res.status(500).json({error: error});
    };
})

// READ ONE
router.get("/:id", async (req, res) => {
    try{
        await Project.findOne({_id: req.params.id}).lean().then(project => {
            if(project){
                res.status(200).json(project)
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