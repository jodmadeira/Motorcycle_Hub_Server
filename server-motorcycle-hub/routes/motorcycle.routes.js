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
                    
                let logo = "";
                switch (brand){
                    case "Kawasaki":
                        logo="http://motorcycle-brands.com/wp-content/uploads/2016/08/Kawasaki-logo.png"
                        break;                        
                    case "Honda":
                        logo="http://motorcycle-brands.com/wp-content/uploads/2017/07/symbol-of-Honda.jpg"
                        break;
                    case "Harley-Davidson":
                        logo="http://motorcycle-brands.com/wp-content/uploads/2016/07/logo-harley-davidson.png"
                        break;
                    case "Indian":
                        logo="http://motorcycle-brands.com/wp-content/uploads/2017/10/indian-logo.png"
                        break;
                    case "KTM":
                        logo="http://motorcycle-brands.com/wp-content/uploads/2016/08/KTM-logo.png"
                        break;
                    case "Husqvarna":
                        logo="http://motorcycle-brands.com/wp-content/uploads/2016/08/Husqvarna-logo.png"
                        break;
                    
                    default:logo="https://cdn-icons-png.flaticon.com/512/5229/5229534.png" ;
                };
                
                let modelImage='';
                switch (motorcycle.model){

                    //HARLEY_DAVIDSON
                    case "Pan America 1250":
                        modelImage="https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2023/2023-pan-america-1250/2023-pan-america-1250-010/360/2023-pan-america-1250-010-motorcycle-01.jpg?impolicy=myresize&rw=1600"
                        break;                        
                    case "Sportster S":
                        modelImage="https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2023/2023-sportster-s/2023-sportster-s-f89/360/2023-sportster-s-f89-motorcycle-01.jpg?impolicy=myresize&rw=1600"
                        break; 

                    //HONDA
                    case "Africa Twin":
                        modelImage="https://as.sobrenet.pt/s/image/tsr/brandm/product/1920x1280/af1tu1nb2cgqla3q5zzb4ccbbm3.png"
                        break; 
                        
                    case "CBR650R":
                        modelImage="https://as.sobrenet.pt/s/image/tsr/brandm/product/1920x1280/szlakb00zolwuwa3z4ydonoyoq3.png"
                        break;

                    //HUSQVARNA
                    case "701 Enduro":
                        modelImage="https://as.sobrenet.pt/s/image/tsr/brandm/product/1536x1152/dd52whr1ji1xcdbjs1vljj5ykm3.png"
                        break;
                    case "FE 450":
                        modelImage="https://as.sobrenet.pt/s/image/tsr/brandm/product/1536x1152/5tjmkcqod5t1ypavpw0na4ruki3.png"
                        break;

                    //INDIAN
                    case "Chieftain Dark Horse":
                        modelImage="https://www.indianmotorcycle.pt/fileadmin/templates/model_23/swap/intl/chieftain-dark-horse/chieftain-dh-black-smoke.jpg"
                        break;
                     case "Scout Bobber":
                        modelImage="https://www.indianmotorcycle.pt/fileadmin/templates/model_23/swap/intl/scout-bobber/scout-bobber-blacksmoke.jpg"
                        break; 

                    //KAWASAKI
                    case "Ninja ZX-10R":
                        modelImage="https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/23MY_Ninja%20ZX-10R_GN1_STU%20(1).002.png"
                        break; 
                     case "Versys 650 Grand Tourer":
                        modelImage="https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/23MY_Versys%20650%20Grand%20Tourer_GN1_Front.002.png"
                        break; 

                    //KTM
                    case "450 Rally Replica":
                        modelImage="https://www.racespec.pt/wp-content/uploads/2021/07/KTM-450-RALLY-FACTORY-REPLICA-2022.png"
                        break;
                    case "1290 Super Duke GT":
                        modelImage="https://as.sobrenet.pt/s/image/tsr/brandm/product/1536x1152/qxaulhbzelrgk24kjwatekywam3.png"
                        break;
                    
                    //IF NOT FOUND
                    default:modelImage="https://freesvg.org/img/motorcycleicon.png" ;
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

//Get all motorcycle models from a specific brand
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