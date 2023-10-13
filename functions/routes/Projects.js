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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    try{
        const skip = (page - 1) * limit;

        const totalProjects = await Project.countDocuments();

        const projects = await Project.find()
            .lean()
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalProjects / limit);

        res.status(200).json({
            projects,
            currentPage: page,
            totalPages,
            totalProjects,
        });
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