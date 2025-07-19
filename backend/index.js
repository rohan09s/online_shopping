const express= require("express")
const dotenv= require('dotenv')
const app= express()
const cors=require('cors')
const connectDB= require('./config/db')
const colors= require('colors')
const authRoutes=require('./routes/authRoutes')
const categoryRoutes= require('./routes/categoryRoutes')
const productRoutes= require("./routes/productRoutes")
app.use(express.json())
app.use(cors())
dotenv.config()
connectDB()
app.use("/auth",authRoutes)
app.use("/category",categoryRoutes)
app.use("/product",productRoutes)
let port = process.env.PORT
console.log(port)

// app.get('/', (req,res)=> {
//     res.send('Hello World!')
// })

app.listen(port,()=>{
    console.log(`Server is running on the port: ${port}`.bgMagenta)
})








// const express= require('express')
// const dotenv= require('dotenv')
// const app= express()
// const cors= require('cors')
// const connectDB= require('./config/db')
// const colors= require('colors')
// const authRoutes= require('./routes/authRoutes')
// const categoryRoutes= require('./routes/categoryRoutes')
// const productRoutes= require('./routes/productRoutes')

// app.use(cors())
// app.use(express.json())


// dotenv.config()
// connectDB()

// app.use("/auth",authRoutes)
// app.use("/category",categoryRoutes)
// app.use("/product",productRoutes)

// let port= process.env.PORT
// console.log(port)

// // console.log(port)
// app.listen(port,()=>{
//     console.log(`Server is runnig on the port ${port}`.bgMagenta)
// })    //This is to display the Port number.