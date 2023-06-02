const {Schema, model} = require('mongoose');

const userMotorcycleSchema = new Schema(
    {
        nickname:{
            type:String,
            default:''
        },
        brand:{
            type: String,
            required: [true, "Motorcycle brand is required."]
        },
        model:{
            type:String,
            required: [true, "Motorcycle model is required."],
        },
        year:{
            type:String,
            required: [true, "Motorcycle year is required."],
        },
        type:{
            type:String, 
        },
        ownerId:{
            type: String,
           
            required: [true, "UserId is required."],
        },
        img:{
            type:String,
            default:'https://shmector.com/_ph/11/153933503.png'
        },
        metric:{
            type: String,
            enum:['Kms', 'Miles'],
            required: [true, "This field is required."],
        },
        kms:{type: String},       
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
        weight: {type: String},
        height: {type: String},
        isForSale: {
            type: Boolean,
            default:false
        },
        price:{type:String},
        cardId:{
            type: Schema.Types.ObjectId,
            ref:'Cards'
        }
        
    },
    {
        timestamp:true
    }

)

const UserMotorcycles = model('User-Motorcycles', userMotorcycleSchema);

module.exports = UserMotorcycles;