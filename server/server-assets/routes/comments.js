var router = require('express').Router()
var Comments = require('../models/comment')

// Get comment by id or get all comments
router.get('/api/comments/:id?', (req, res) => {
    if (req.params.id) {
        Comments.findById(req.params.id)
            .then(comment => {
                return res.status(200).send(comment)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
    Comments.find({author: req.session.uid})
        .then(comments => {
            res.status(200).send(comments)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

// Create comment
router.post('/api/comments', (req, res) =>{
    req.body.author=req.session.uid
    Comments.create(req.body)
        .then(newComment =>{
            res.status(200).send(newComment)
        })
        .catch(err =>{
            res.status(400).send(err)
        })
})

// Edit comment
router.put('/api/comments/:id', (req, res) =>{
    Comments.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(comment=>{
        res.status(200).send({message: 'successfully updated', comment})
    })
    .catch(err =>{
        res.status(400).send(err)
    })
})

// Delete comment
router.delete('/api/comments/:id', (req, res) =>{
    Comments.findByIdAndRemove(req.params.id)
    .then(comment=>{
        res.status(200).send({message: 'successfully deleted'})
    })
    .catch(err =>{
        res.status(400).send(err)
    })
})





module.exports = { router }