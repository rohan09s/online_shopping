const mongoose= require('mongoose')
const colors= require('colors')

const connectDB= async ()=>{
    try{
        let conn= await mongoose.connect(process.env.MONGO_URL)
        console.log(`Successfully connected to MONGODB server ${conn.connection.host}`.bgGreen)     // This is to display the success or failure of MongoDb server connection and the host id. 
    } catch(error)
    {
        console.log(`Error while connecting to the database${error}`.bgBlue)
    }
}
module.exports=connectDB
