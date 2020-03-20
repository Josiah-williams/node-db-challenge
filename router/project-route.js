const express = require("express");
const router = express.Router();
const db = require("./project-route-helper");



//get Request
router.getprojects("/projects", (req, res) => {
    db.getprojects()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(500).json({ message: "could not retrieve projects; go drink a root beer float!!! "+ error.message})
        })
})

router.getprojects("/projects/:id", (req, res) => {
    db.getprojects(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({message: "Something went wrong:-" + error.message })
        })
})



//post request
router.post("/projects", (req, res) => {
    if(!req.body.name){
        res.status(400).json({message: "Please provide needed column for the post 'name' "})
    }else{
        db.addProject(req.body)
            .then(projects => {
                    res.status(200).json({message: `New project with ID ${projects} got created`})
            })
            .catch(error => {
                res.status(500).json({ message: "something went wrong:-. " + error.message})
            })
    }

//put request
router.put("/projects/:id", (req, res) => {
    db.getProjectById(req.params.id)
    .then(found =>{
        if(found){
            db.updateProject(req.body, req.params.id)
                .then(project => {
                    res.status(200).json({message: `${project} Project with ID ${req.params.id} got Edited`})
                })
        }else{
            res.status(404).json({ message: 'Could not find project with given id' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "something went wrong:-. " + error.message})
    })

})

//delete request
router.delete('/projects/:id', (req, res) => {

    db.removeProject(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.json({ Message: `A project with ID ${req.params.id} got deleted` });
      } else {
        res.status(404).json({ message: 'Could not find a project with given id' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to delete project ' + error.message});
    });
  });


router.get('/', (req, res) =>{
    res.json('This is the defauls zone, specify what you need to get')
})
})
module.exports = router;