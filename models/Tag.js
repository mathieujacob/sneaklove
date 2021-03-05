const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagsSchema = new Schema( {
    label: String,
    });

const tagsModel = mongoose.model("tags", tagsSchema);

module.exports = tagsModel;