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

            for(let motorcycle of motorcycleData){

                await Motorcycles.create({
                    make: motorcycle.make,
                    model: motorcycle.model,
                    year: motorcycle.year,
                    type: motorcycle.type,
                    engine: motorcycle.engine,
                    power: motorcycle.power,
                    boreStroke: motorcycle.boreStroke,
                    gearbox: motorcycle.gearbox,
                    fuelCapacity:motorcycle.fuelCapacity,
                    frontSuspension: motorcycle.frontSuspension,
                    rearSuspension: motorcycle.rearSuspension,
                    frontTire: motorcycle.frontTire,
                    rearTire: motorcycle.rearTire,
                    frontBrakes: motorcycle.frontBrakes,
                    rearBrakes: motorcycle.rearBrakes,
                    Weight: motorcycle.dryWeight,
                    Height: motorcycle.seatHeight
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
router.get('/')





module.exports=router