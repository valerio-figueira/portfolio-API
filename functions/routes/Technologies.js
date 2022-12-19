const router = require("express").Router();
const Technologies = require("../models/Technologies");

// CREATE
router.post("/", async (req, res) => {
    const {title, content, references, images, tag} = req.body;

    const technology = {
        title,
        content,
        references,
        images,
        tag
    }

    try{
        await Technologies.create(technology);

        res.status(201).json({message: "Technology added successfully"});
    } catch(error) {
        res.status(500).json({error: error})
    }
})

// READ
router.get("/", async (req, res) => {
    try{
        const technologies = await Technologies.find().lean();

        res.status(200).json(technologies);
    } catch(error){
        res.status(500).json({error: error});
    }
})

// READ ONE
router.get("/:id", async (req, res) => {
    try{
        await Technologies.findOne({_id: req.params.id}).lean().then(technology => {
            if(technology){
                res.status(200).json(technology)
            }
        }).catch(error => {
            res.status(500).json({error: error});
        })

    } catch(error){
        res.status(500).json({error: error});
    }
})

// READ BY TAG
router.get("/tag/:tag", async (req, res) => {
    try{
        await Technologies.findOne({tag: req.params.tag}).then(technology => {
            if(technology){
                res.status(200).json(technology)
            }
        }).catch(error => {
            res.status(500).json({error: error});
        })

    } catch(error){
        res.status(500).json({error: error});
    }
})


module.exports = router;