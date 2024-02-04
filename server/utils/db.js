const mongoose = require("mongoose")

// const URI =process.env.MONGODB_URI
// const URI ="mongodb://127.0.0.1:27017/mern_admin"
const URI ="mongodb+srv://vasu:vasudankhara@cluster0.xryo5me.mongodb.net/mern_admin?retryWrites=true&w=majority"

const connectDb = async()=>{
    try {
        await mongoose.connect(URI); 
        console.log("Connection successfully");       
    } catch (error) {
        console.error("database connection faiied" , error);
        process.exit(0);
    }
}
module.exports = connectDb;