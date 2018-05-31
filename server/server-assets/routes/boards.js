var router = require('express').Router()
var Boards = require('../models/board')

// Get board by id or get all boards
router.get('/api/boards/:id?', (req, res) => {
    if (req.params.id) {
        Boards.findById(req.params.id)
            .then(board => {
                return res.status(200).send(board)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
    Boards.find({author: req.session.uid})
        .then(boards => {
            res.status(200).send(boards)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

// Create board
router.post('/api/boards', (req, res) =>{
    req.body.author=req.session.uid
    Boards.create(req.body)
    .then(newBoard =>{
            res.status(200).send(newBoard)
        })
        .catch(err =>{
            res.status(400).send(err)
        })
})

// Edit board
router.put('/api/boards/:id', (req, res) =>{
    Boards.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(board=>{
        res.status(200).send({message: 'successfully updated', board})
    })
    .catch(err =>{
        res.status(400).send(err)
    })
})

// Delete board
router.delete('/api/boards/:id', (req, res) =>{
    Boards.findByIdAndRemove(req.params.id)
    .then(board=>{
        res.status(200).send({message: 'successfully deleted'})
    })
    .catch(err =>{
        res.status(400).send(err)
    })
})

module.exports = { router }