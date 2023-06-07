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

// Update the User Profile;
router.put('/profile/edit/:userId', async(req,res)=>{
    const {userId}=req.params;
    console.log('USERID SERVER', userId)
    const {name, img, bio} = req.body
   
    try {
        let updateUser = await User.findByIdAndUpdate(userId,{name, img, bio})
        res.json(updateUser)
    } 
    catch(error){
        console.log('Error updating User Info on DB', error)
        res.json(error)        
    }
});

module.exports=router