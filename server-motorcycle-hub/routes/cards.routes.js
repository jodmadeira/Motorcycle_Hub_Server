const router = require('express').Router();
const mongoose = require('mongoose');

// Require the Cards model to interact with the database
const Cards = require('../models/Cards.model');


// Get All the marketplace cards (offer and request);
router.get('/marketplace', async (req, res)=>{
    try {
        let getAllCards = await Cards.find();
        res.json(getAllCards)
    } 
    catch (error) {
        res.json(error)
    }
});

//Get a specific Card
router.get('/marketplace/:cardId', async(req,res)=>{
    const {cardId} = req.params;
    try {
        let getCard = await Cards.findById(cardId);
        res.json(getCard);
    }
    catch (error) {
        res.json(error)
    }
})


// Create new Card (offer or request);
router.post('/marketplace/create', async (req,res)=>{
    const {cardType, contentType, title, description, img, link, price} = req.body
    try {
        let createCard = await Cards.create({cardType, contentType, title, description, img, link, price});
        res.json(createCard)
    }
    catch(error) {
        res.json(error)
    }
});


// Update a User Card (offer or request);
router.put('/marketplace/edit/:cardId', async(req,res)=>{
    const {cardId}=req.params;
    const {cardType, contentType, title, description, img, link, price} = req.body
   
    try {
        let updateCard = await Cards.findByIdAndUpdate(cardId,{cardType, contentType, title, description, img, link, price})
        res.json(updateCard)
    } 
    catch(error){
        res.json(error)        
    }
});


// Delete a Card (offer or request);
router.delete('/marketplace/delete/:cardId', async (req,res)=>{
    const {cardId}=req.params;

    try {
        let deleteCard = await Cards.findByIdAndRemove(cardId);
        res.json(deleteCard)
    } 
    catch(error){
        res.json(error)        
    }
});


module.exports = router