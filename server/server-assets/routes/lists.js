var router = require('express').Router()
var Lists = require('../models/list')

// Get list by id or get all lists
router.get('/api/lists/:id?', (req, res) => {
    if (req.params.id) {
        Lists.findById(req.params.id)
            .then(list => {
                return res.status(200).send(list)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
    Lists.find({author: req.session.uid})
        .then(lists => {
            res.status(200).send(lists)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

// Create list
router.post('/api/lists', (req, res) =>{
    req.body.author=req.session.uid
    Lists.create(req.body)
        .then(newList =>{
            res.status(200).send(newList)
        })
        .catch(err =>{
            res.status(400).send(err)
        })
})

// Edit list
router.put('/api/lists/:id', (req, res) =>{
    Lists.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(list=>{
        res.status(200).send({message: 'successfully updated', list})
    })
    .catch(err =>{
        res.status(400).send(err)
    })
})

// Delete list
router.delete('/api/lists/:id', (req, res, next) =>{
    if(req.body.author != req.session.id) {
        return next()
    }
    Lists.findByIdAndRemove(req.params.id)
    .then(list=>{
        res.status(200).send({message: 'successfully deleted'})
    })
    .catch(err =>{
        res.status(400).send(err)
    })
})





module.exports = { router }