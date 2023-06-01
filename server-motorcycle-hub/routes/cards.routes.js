const router = require('express').Router()
const mongoose = require('mongoose');

// Require the Cards model in order to interact with the database
const Cards = require('../models/Cards.model');

router.get('/marketplace', async (req, res)=>{
    try {
        let getAllCards = await Cards.find();
        res.json(getAllCards)
    } 
    catch (error) {
        res.json(error)
    }
});



router.post('/marketplace', async (req,res)=>{
    const {cardType, contentType, title, description, img, link, price} = req.body
    try {
        let createCard = await Cards.create({cardType, contentType, title, description, img, link, price});
        res.json(createCard)
    }
    catch(error) {
        res.json(error)
    }
})

module.exports = router