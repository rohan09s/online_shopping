const productModel = require("../models/productModel")
const slugify= require("slugify")
const fs= require('fs')

const createProductcontroller=async(req,res)=>{
try{
    const {name,price,quantity,description,category}=req.fields
    const {photo}=req.files
    if(!name){
        res.status(404).send({Error:"Name is required"})
    }
    if(!price){
        res.status(404).send({Error:"Price is required"})
    }
    if(!quantity){
        res.status(404).send({Error:"Quantity is required"})
    }
    if(!description){
        res.status(404).send({Error:"Description is required"})
    }
    if(!category){
        res.status(404).send({Error:"Category is required"})
    }
    if(!photo && photo.size>100000){
        res.status(404).send({Error:"Photo is required and it should be less than 1MB"})
    }
    let product= new productModel({...req.fields,slug:slugify(name)})
    if(photo){
        product.photo.data=fs.readFileSync(photo.path)
        product.photo.contentType=photo.type
    }
    await product.save()
    res.status(200).send({
        success:true,
        message:"Product created successfully",
        product
    })
}catch(error){
    res.status(500).send({
        success:false,
        message:"Error in creating the product"
    })
}
}

const getAllProductsController=async(req,res)=>{
    try{
        let products = await productModel.find({}).select("-photo").limit(50000000).sort({createdAt:-1}).populate("category")
        res.status(200).send({
            success:true,
            message:"Got all products",
            products
        })
    }catch(error){
        res.status(500).send({
        success:false,
        message:"Error in getting all the product"
    })
    }
}

const getSingleProductController=async(req,res)=>{
     try{
        let products = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category")
        res.status(200).send({
            success:true,
            message:"Got Single products",
            products
        })
    }catch(error){
        res.status(500).send({
        success:false,
        message:"Error in getting all the product"
    })
    }
}

const getProductPhotoController= async(req,res)=>{
    try{
        let prodphoto=await productModel.findById(req.params.pid).select("photo")

        if(prodphoto.photo.data){
            res.set("Content-type",prodphoto.photo.contentType)
            return res.status(200).send(prodphoto.photo.data)
        }
    }catch(error){
        res.status(500).send({
            success:false,
            message:"Error in image of product"
        })
    }
}

const updateProductController=async(req,res)=>{
    try{
const {name,price,quantity,description,category}=req.fields
    const {photo}=req.files
    if(!name){
        res.status(404).send({Error:"Name is required"})
    }
    if(!price){
        res.status(404).send({Error:"Price is required"})
    }
    if(!quantity){
        res.status(404).send({Error:"Quantity is required"})
    }
    if(!description){
        res.status(404).send({Error:"Description is required"})
    }
    if(!category){
        res.status(404).send({Error:"Category is required"})
    }
    if(!photo && photo.size>100000){
        res.status(404).send({Error:"Photo is required and it should be less than 1MB"})
    }
    let product= await  productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
    if(photo){
        product.photo.data=fs.readFileSync(photo.path)
        product.photo.contentType=photo.type
    }
    await product.save()
    res.status(200).send({
        success:true,
        message:"Product updated successfully",
        product
    })
    }catch(error){
        res.status(500).send({
            success:false,
            message:"Error in updating product"
        })
    }
}

const deleteProductController=async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.pid)
        res.status(200).send({
            success:true,
            message:"Product Deleted Successfully"
        })
    }catch(error){
       res.status(500).send({
            success:false,
            message:"Error in deleting product"
        }) 
    }
}

const searchProductController= async(req,res)=>{
    try{
        let result= await productModel.find({
           $or:[
            {name:{$regex:req.params.key}},
            {description:{$regex:req.params.key}}
           ] 
        })
        res.json(result)
    }catch(error){
        res.status(500).send({
            success:false,
            message:"Error in searching the product"
        })
    }
}

const filterProductController=async(req,res)=>{
    try{
        const {checked} =req.body
        let args={}
        if(checked.length>0)
            args.category=checked
        let products= await productModel.find(args)
        res.status(200).send({
            success:true,
            message:"Products filtered successfully",
            products
        })
    }catch(error){
       res.status(500).send({
            success:false,
            message:"Error while filtering the product"
        }) 
    }
}
module.exports={createProductcontroller,getAllProductsController,getSingleProductController,
    getProductPhotoController,updateProductController,deleteProductController,searchProductController,filterProductController}




// const productModel= require('../models/productModel')
// const slugify= require('slugify')
// const fs= require('fs')



// // To create the products

// const createProductController= async (req,res)=>{
//     try{
//         const {name, price, quantity, description, category}= req.fields
//         const {photo}= req.files

//         if(!name)
//         {
//             res.status(404).send({Error: "Product Name is required"})
//         }
//         if(!price)
//         {
//             res.status(404).send({Error: "Product Price is required"})
//         }
//         if(!quantity)
//         {
//             res.status(404).send({Error: "Product Quantity is required"})
//         }
//         if(!description)
//         {
//             res.status(404).send({Error: "Product Description is required"})
//         }
//         if(!category)
//         {
//             res.status(404).send({Error: "Product Category is required"})
//         }
//         if(!photo && photo.size>100000)
//         {
//             res.status(404).send({Error: "Photo is required and the photo size should be greater than 1MB"})
//         }

//         let product= new productModel({...req.fields, slug: slugify(name)})

//         if(photo)
//         {
//             product.photo.data= fs.readFileSync(photo.path)
//             product.photo.contentType= photo.type
//         }

//         await product.save()

//         res.status(200).send({
//             success: true,
//             message: "Product created successfully",
//             product
//         })
//     } catch(error)
//     {
//         res.status(500).send({
//             success:false,
//             message: "Error in creating the product"
//         })
//     }
// }



// // To get all the products and display them
// const getAllProductsController= async (req,res)=> {
//     try{
//         let products= await productModel.find({}).select("-photo").limit(10).sort({createdAt:-1}).populate("category")
        
//         res.status(200).send({
//             success: true,
//             message: "Got all products",
//             products
//         })
//     } catch(error)
//     {
//         res.status(500).send({
//             success:false,
//             message: "Error in getting all products"
//         })
//     }
// }



// //  To get a single product and display it
// const getSingleProductController= async (req, res)=> {
//     try{
//         let product= await productModel.findOne({slug: req.params.slug}).select("-photo").populate("category")
        
//         res.status(200).send({
//             success: true,
//             message: "Got single product",
//             product
//         })
//     } catch(error)
//     {
//         res.status(500).send({
//             success:false,
//             message: "Error in getting single product"
//         })
//     }
// }




// // For getting the photo of product

// const getProductPhotoController= async (req,res)=> {
//     try
//     {
//         let prodphoto= await productModel.findById(req.params.pid).select("photo")

//         if(prodphoto.photo.data)
//         {
//             res.set("Content-type",prodphoto.photo.contentType)
            
//             return res.status(200).send(prodphoto.photo.data)
//         }
//     } catch(error)
//     {
//         res.status(500).send({
//             success:false,
//             message: "Error in getting the product photo"
//         })
//     }
// }



// // To update the product

// const updateProductController= async (req,res)=> {
//     try{
//         const {name, price, quantity, description, category}= req.fields
//         const {photo}= req.files

//         if(!name)
//         {
//             res.status(404).send({Error: "Product Name is required"})
//         }
//         if(!price)
//         {
//             res.status(404).send({Error: "Product Price is required"})
//         }
//         if(!quantity)
//         {
//             res.status(404).send({Error: "Product Quantity is required"})
//         }
//         if(!description)
//         {
//             res.status(404).send({Error: "Product Description is required"})
//         }
//         if(!category)
//         {
//             res.status(404).send({Error: "Product Category is required"})
//         }
//         if(!photo && photo.size>100000)
//         {
//             res.status(404).send({Error: "Phtoo is required and the photo size should not exceed 1MB"})
//         }

//         let product= await productModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug: slugify(name)},
//         {new:true})

//         if(photo)
//         {
//             product.photo.data= fs.readFileSync(photo.path)
//             product.photo.contentType= photo.type
//         }

//         await product.save()
//         res.status(200).send({
//             success: true,
//             message: "Product updated successfully",
//             product
//         })


//     } catch(error)
//     {
//         res.status(500).send({
//             success:false,
//             message: "Error in updating the category"
//         })
//     }
// }



// // To delete the product

// const deleteProductController= async (req,res)=>{
//     try{
//         await productModel.findByIdAndDelete(req.params.pid)

//         res.status(200).send({
//             success: true,
//             message: "Product deleted successfully"
//         })
//     } catch(error)
//     {
//         res.status(500).send({
//             success:false,
//             message: "Error in deleting the category"
//         })
//     }
// }



// // To search the product

// const searchProductController= async (req,res)=> {
//     try{
//         let result= await productModel.find({
//             $or:[
//                 {name:{$regex:req.params.key}},
//                 {description:{$regex:req.params.key}}
//             ]
//         })
//         res.json(result)
//     } catch(error)
//     {
//         res.status(500).send({
//             success:false,
//             message: "Error in searching the category"
//         })
//     }
// }



// // For filtering the products (Filter)

// const filterProductController= async (req,res)=> {
//     try{
//         const {checked}= req.body

//         let args= {}

//         if(checked.length>0)
        
//             args.category= checked

//             let products= await productModel.find(args)

//             res.status(200).send({
//                 success: true,
//                 message: "Products filtered successfully",
//                 products
//             })
//     } catch(error)
//     {
//         res.status(500).send({
//             success:false,
//             message: "Error in filtering the category"
//         })
//     }
// }



// module.exports={createProductController, getAllProductsController, getSingleProductController, getProductPhotoController, updateProductController, deleteProductController, searchProductController, filterProductController}
