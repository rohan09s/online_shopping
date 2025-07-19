const express= require('express')
const {createProductcontroller,getAllProductsController,getSingleProductController,filterProductController, getProductPhotoController,updateProductController,deleteProductController,searchProductController} = require("../controllers/productControllers")
const formidable = require('express-formidable')
const { requireSignIn, isAdmin } = require('../middlewares/auhMiddlewares')

const router= express()



router.post("/create-product", requireSignIn, isAdmin, formidable(),createProductcontroller)
router.get("/all-products",getAllProductsController)
router.get("/single-product/:slug",getSingleProductController)
router.get("/product-photo/:pid",getProductPhotoController)
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)
router.delete("/delete-product/:pid",requireSignIn,isAdmin,deleteProductController)
router.get("/search-product/:key",searchProductController)
router.post("/filter-product",filterProductController)
module.exports=router




// const express= require('express')
// const formidable= require('express-formidable')
// const { createProductController, getAllProductsController, getSingleProductController, getProductPhotoController, updateProductController, deleteProductController, searchProductController, filterProductController } = require('../controllers/productControllers')
// const { requireSignIn, isAdmin } = require('../middlewares/authMiddlewares')
// const router= express.Router()

// router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)
// router.get("/all-products",getAllProductsController)
// router.get("/single-product/:slug",getSingleProductController)
// router.get("/product-photo/:pid",getProductPhotoController)
// router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)
// router.delete("/delete-product/:pid",requireSignIn,isAdmin,deleteProductController)
// router.get("/search-product/:key",searchProductController)
// router.get("/filter-product",filterProductController)


// module.exports= router







// // Use post method to create, put method to update, get method to get/display the data and search the data and to filter the data, delete method to delete the data.