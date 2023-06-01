const { Schema, model } = require("mongoose");

const motorcycleSchema = new Schema(
    {   
        make: {type: String},
        makeImg:{type: String},
        model:{type: String},
        modelImg:{type: String},
        year:{type: String},
        type:{type: String},
        engine:{type: String},
        power:{type: String},
        boreStroke: {type: String},
        gearbox: {type: String},
        fuelCapacity: {type: String},
        frontSuspension: {type: String},
        rearSuspension: {type: String},
        frontTire: {type: String},
        rearTire: {type: String},
        frontBrakes: {type: String},
        rearBrakes: {type: String},
        Weight: {type: String},
        Height: {type: String},
    },
  
    )
    const Motorcycles = model("Motorcycles",motorcycleSchema);

    module.exports=Motorcycles;