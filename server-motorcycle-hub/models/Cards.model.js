const { Schema, model } = require("mongoose");

const cardsSchema = new Schema(
    {
        cardType: {
            type: String,
            enum:['request', 'offer'],
            required: [true, "This field is required."],
        },
        contentType: {
            type: String,
            enum:['product', 'service'],
            required: [true, "This field is required."],
        },
        title: {
            type: String,
            required: [true, "Title is required."],
        },
        description: {
            type: String,
            required: [true, "Description is required."],
        },
        img: {
            type: String,
        },
        link: {
            type: String,
        },
        price: {
            type: String,
            required:[true, 'Price is required']
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const Cards = model("Cards", cardsSchema);

module.exports = Cards;