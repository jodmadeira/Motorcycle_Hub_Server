const router = require('express').Router()
const axios = require("axios");
const Motorcycles = require("../models/Motorcycle.model")

// CREATE THE MOTORCYCLE DATABASE
router.get("/createdatabase", async (req, res) => {

const motorcycleMakers =["Honda","Kawasaki","Harley-Davidson","Indian","KTM","Husqvarna"];

    try{
        for(const brand of motorcycleMakers){
           
            const apiCall = await axios.get(
                `https://api.api-ninjas.com/v1/motorcycles?make=${brand}`,
                {headers: {
                'X-Api-Key': '4GMdiN6E5m8tDnTNYuftbA==U2bvFytF0DyACIl2'
            }}
            )
            const motorcycleData = apiCall.data
            console.log(motorcycleData[0])
            for(let motorcycle of motorcycleData){
                    console.log('here',brand)
                await Motorcycles.create({
                    brand: brand,
                    model: motorcycle.model,
                    year: motorcycle.year,
                    type: motorcycle.type,
                    engine: motorcycle.engine,
                    power: motorcycle.power,
                    boreStroke: motorcycle.bore_stroke,
                    gearbox: motorcycle.gearbox,
                    fuelCapacity:motorcycle.fuel_capacity,
                    frontSuspension: motorcycle.front_suspension,
                    rearSuspension: motorcycle.rear_suspension,
                    frontTire: motorcycle.front_tire,
                    rearTire: motorcycle.rear_tire,
                    frontBrakes: motorcycle.front_brakes,
                    rearBrakes: motorcycle.rear_brakes,
                    weight: motorcycle.dry_weight,
                    height: motorcycle.seat_height
                })
            }
    }
        let allMotorcycles = await Motorcycles.find();
        res.json(allMotorcycles)
    }
    catch(error) {
        res.json(error)
    }

})

//Get all motorcycles
router.get('/motorcycles', async (req,res)=>{
    try {
        let allMotorcycles = await Motorcycles.find()
    res.json(allMotorcycles)
    } 
    catch (error) {
        res.json(error)
    }
    
})

//Get a specific motorcycle
router.get('/motorcycles/:brand', async (req,res)=>{
    const{brand}=req.params
    try {
        console.log(brand)
        let allBrandMotorcycles = await Motorcycles.find({brand:brand})
    res.json(allBrandMotorcycles)
    }
    catch (error) {
        res.json(error)
    }
})





module.exports=router