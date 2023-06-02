const router = require('express').Router()
const axios = require("axios");
const Motorcycles = require("../models/Motorcycle.model")

// CREATE THE MOTORCYCLE DATABASE
router.get("/createdatabase", async (req, res) => {

const motorcycleMakers =["Honda","Kawasaki","Harley-Davidson","Indian","KTM","Husqvarna"];

    try{
        for(const brand of motorcycleMakers){
           
            const apiCall = await axios.get(
                `https://api.api-ninjas.com/v1/motorcycles?make=${brand}&year=2022`,
                {headers: {
                'X-Api-Key': '4GMdiN6E5m8tDnTNYuftbA==U2bvFytF0DyACIl2'
            }}
            )
            const motorcycleData = apiCall.data
            
            for(let motorcycle of motorcycleData){
                    
                let logo = "./public/images/brand/Default_Icon.png";
                switch (brand){
                    case "Kawasaki":
                        logo="./public/images/brand/Kawasaki.png"
                        break;                        
                    case "Honda":
                        logo="./public/images/brand/Honda.png"
                        break;
                    case "Harley-Davidson":
                        logo="./public/images/brand/Harley_Davidson.png"
                        break;
                    case "Indian":
                        logo="./public/images/brand/Indian_Motorcycle.png"
                        break;
                    case "KTM":
                        logo="./public/images/brand/KTM.png"
                        break;
                    case "Husqvarna":
                        logo="./public/images/brand/Husqvarna.png"
                        break;
                    
                    default:logo="./public/images/brand/Default_Icon.png" ;
                };
                
                let modelImage='./public/images/brand/Default_Icon.png';
                switch (motorcycle.model){

                    //HARLEY_DAVIDSON
                    case "Pan America 1250":
                        modelImage="./public/images/models/HD_PAN_AMERICA.jpg"
                        break;                        
                    case "Sportster S":
                        modelImage="./public/images/models/HD_SPORTSTER.jpg"
                        break; 

                    //HONDA
                    case "Africa Twin":
                        modelImage="./public/images/models/HONDA_AFRICA_TWIN.jpg"
                        break; 
                        
                    case "CB650R":
                        modelImage="./public/images/models/HONDA_CBR650R.jpg"
                        break;

                    //HUSQVARNA
                    case "701 Enduro":
                        modelImage="./public/images/models/HQV_701_ENDURO.jpg"
                        break;
                    case "FE 450":
                        modelImage="./public/images/models/HQV_FE_450.jpg"
                        break;

                    //INDIAN
                    case "Chieftain Dark Horse":
                        modelImage="./public/images/models/INDIAN_CHIEFTAIN_DH.jpg"
                        break;
                     case "Scout Bobber":
                        modelImage="./public/images/models/INDIAN_SCOUT_BOBBER.jpg"
                        break; 

                    //KAWASAKI
                    case "Ninja ZX-10R":
                        modelImage="./public/images/models/KAWASAKI_NINJA_ZX10R.png"
                        break; 
                     case "Versys 650 Grand Tourer":
                        modelImage="./public/images/models/KAWASAKI_VERSYS_650_GT.png"
                        break; 

                    //KTM
                    case "450 Rally Replica":
                        modelImage="./public/images/models/KTM_450_RALLY.png"
                        break;
                    case "1290 Super Duke GT":
                        modelImage="./public/images/models/KTM_1290_SUPERDUKE_GT.jpg"
                        break;
                    
                    //IF NOT FOUND
                    default:modelImage="./public/images/brand/Default_Icon.png" ;
                } 
 

                await Motorcycles.create({
                    brand: brand,
                    brandImg: logo,                    
                    model: motorcycle.model,
                    modelImg: modelImage,
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
        
        let allBrandMotorcycles = await Motorcycles.find({brand:brand})
    res.json(allBrandMotorcycles)
    }
    catch (error) {
        res.json(error)
    }
})





module.exports=router