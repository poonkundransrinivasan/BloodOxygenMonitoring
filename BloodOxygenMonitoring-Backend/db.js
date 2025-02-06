// to use mongoDB
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://ec2-3-16-38-85.us-east-2.compute.amazonaws.com/eceFinalProject", { useNewUrlParser: true, useUnifiedTopology:true });

module.exports = mongoose;

