const {Schema, model} = require('mongoose');

const userMotorcycleSchema = new Schema(
    {
        nickname:{
            type:String
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
        ownerId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "UserId is required."],
        },
        img:{
            type:String,
            default:'https://shmector.com/_ph/11/153933503.png'
        },
        details:{
            type: []
        },
    },
    {
        timestamp:true
    }

)

const UserMotorcycles = model('User-Motorcycles', userMotorcycleSchema);

module.exports = UserMotorcycles;