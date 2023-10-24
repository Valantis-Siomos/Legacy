const mongoose = require("mongoose");
require("dotenv").config();

URI = process.env.MONGODB_URI;

main()
.then(() => console.log("connected succesfully"))
.catch((err ) => console.log(err));


async function main(){
    await mongoose.connect(URI);
}

module.exports = main;