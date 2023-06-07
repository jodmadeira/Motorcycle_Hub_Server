const router = require('express').Router()
const axios = require("axios");
const User = require('../models/User.model');


router.get('/profile/:id', async (req,res)=>{
   try {
       const id = req.params.id;
    
       const getUserDetails = await User.findById(id)
       res.json(getUserDetails)
   }
   catch(error){
        console.log('Error geting UserInformation from DB', error)
   }

})

module.exports=router