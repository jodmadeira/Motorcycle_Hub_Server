const router = require('express').Router()
const axios = require("axios");
const User = require('../models/User.model');


router.get('/profile/:id', async (req,res)=>{
   try {
       const id = req.params.id;
    
       const getUserDetails = await User.findById(id).populate(motorcycles, cards)
       const {name, email, img, bio, motorcycles, cards} = getUserDetails;
       res.json({name, email, img, bio, motorcycles, cards})
   }
   catch(error){
        console.log('Error geting UserInformation from DB', error)
   }

})

module.exports=router