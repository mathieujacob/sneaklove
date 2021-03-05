const mongoose = require("mongoose");
const Schema = mongoose.Schema

const sneakerSchema = new Schema( 
    {
    name: String,
    ref: String,
    size: Number,
    description: String,
    price: Number,
    category:  {type: String , 
       enum: ["men, women, kids"]},
    id_tags: [{type: Schema.Types.ObjectId, ref:"sneaker"}]
    }  
);

const SneakerModel = mongoose.model("sneaker", sneakerSchema);

module.exports = SneakerModel;