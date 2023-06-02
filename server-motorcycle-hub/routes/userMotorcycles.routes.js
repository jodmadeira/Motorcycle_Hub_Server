const router = require('express').Router();
const mongoose = require('mongoose');
const axios = require("axios");

//Require the UserMotorcycles Model to interact with the database
const UserMotorcycles = require('../models/UserMotorcycle.model');
const User = require('../models/User.model');

//Create a Motorcycle
router.post('/:ownerId/motorcycle/create', async (req,res)=>{
    const {ownerId} = req.params;
    const {nickname, brand, model, year, img, metric, kms} = req.body;
    try {
        //call to the API with the brand, model and year to receive the specifications information 
        const apiCall = await axios.get(
            `https://api.api-ninjas.com/v1/motorcycles?make=${brand}&model=${model}&year=${year}`,
            {headers: {
                'X-Api-Key': '4GMdiN6E5m8tDnTNYuftbA==U2bvFytF0DyACIl2'
            }}
        )
        console.log(apiCall.data[0])
        let bike = apiCall.data[0];

        //Create Motorcycle with the data from the API Call and the data from the form completed by the user
        const newMotorcycle = await UserMotorcycles.create({
            nickname:nickname,
            brand:brand,
            model:model,
            year:year,
            type:bike.type,
            ownerId:ownerId,
            img:img,
            metric:metric,
            kms:kms,
            engine:bike.engine,
            power:bike.power,
            boreStroke:bike.bore_stroke,
            gearbox: bike.gearbox,
            fuelCapacity: bike.fuel_capacity,
            frontSuspension: bike.front_suspension,
            rearSuspension: bike.rear_suspension,
            frontTire: bike.front_tyre,
            rearTire: bike.rear_tyre,
            frontBrakes: bike.front_brakes,
            rearBrakes: bike.rear_breaks,
            weight: bike.dry_weight,
            height: bike.seat_height,
            })
        await User.findbyIdandUpdate(ownerId, {$push:{motorcycles:newMotorcycle._id}})
        res.json(newMotorcycle)
    }
    catch(error){
        res.json(error)        
    }
})



module.exports = router