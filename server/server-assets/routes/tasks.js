var router = require('express').Router()
var Tasks = require('../models/task')

// Get task by id or get all tasks
router.get('/api/tasks/:id?', (req, res) => {
    if (req.params.id) {
        Tasks.findById(req.params.id)
            .then(task => {
                return res.status(200).send(task)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
    Tasks.find({author: req.session.uid})
        .then(tasks => {
            res.status(200).send(tasks)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

// Create task
router.post('/api/tasks', (req, res) =>{
    req.body.author=req.session.uid
    Tasks.create(req.body)
        .then(newTask =>{
            res.status(200).send(newTask)
        })
        .catch(err =>{
            res.status(400).send(err)
        })
})

// Edit task
router.put('/api/tasks/:id', (req, res) =>{
    Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(task=>{
        res.status(200).send({message: 'successfully updated', task})
    })
    .catch(err =>{
        res.status(400).send(err)
    })
})

// Delete task
router.delete('/api/tasks/:id', (req, res) =>{
    Tasks.findByIdAndRemove(req.params.id)
    .then(task=>{
        res.status(200).send({message: 'successfully deleted'})
    })
    .catch(err =>{
        res.status(400).send(err)
    })
})





module.exports = { router }