const { validateInputs, successResponse, uploadImage } = require("../../helpers");
const AppError = require("../../helpers/appError");
const { catchAsync } = require("../../helpers/errors");
const Product = require('../../models/ProductModel')

exports.getProduct = catchAsync(async (req,res,next) => {

    let product = await Product.findOne({ _id : req.params.id}).populate('category');
    return successResponse(res,'Success!', {product});
  
})


exports.getProducts = catchAsync(async (req,res,next) => {

    console.log("PARAMS", req.query);

    if (req.query.search) {
      var products = await Product.paginate( 
        { name: { $regex: ".*" + req.query.search + ".*" } },
        {
          offset:
            req.query.page == 1
              ? 0
              : req.query.page * req.query.perPage - req.query.perPage,
          limit: req.query.perPage,
        }
      );
  
    } else {
      var products = await Product.paginate(
        {},
        {
          offset:
            req.query.page == 1
              ? 0
              : req.query.page * req.query.perPage - req.query.perPage,
          limit: req.query.perPage,
          sort: {
            createdAt: -1
          },
          populate: 'category',
        //   populate: 'subCategories'
        }
      )
    }
  
    // if(!users){
    //     return next(new AppError('No Users Found With that Id', 404))
    // }
  
    console.log('PAGINATION COUNTER', products.pagingCounter)
  
    products.docs = products.docs.map(product =>{
        product = product.toJSON()
        product.sr_no = products.pagingCounter++
        return product
    })
  
    console.log(products)
    return successResponse(res,'Success!', { products})
  
})

exports.addProduct = catchAsync(async (req,res,next) => {

    let requiredFields = ["name","description","price","category","stock"];

    if(!req.files){
        requiredFields.push('images')
    }
    if(req.files && !req.files.images){
        requiredFields.push('images')        
    }
    let validate = validateInputs(req.body, requiredFields);

    if (validate) {
      return next(new AppError(`${validate}`,400))
    }

    // console.log(req.body)
    console.log(req.files);
    req.body.images = uploadImage(req.files.images,'Products')
    // req.body.subCategories = req.body.subCategories.split(',')
  
    let product = await Product.create(req.body);

    if(product){
        return successResponse(res,'Product Created Successfully!',{product})
    }
    
})


exports.updateProduct = catchAsync(async (req,res,next) => {

    if(req.files){
        if(req.files.images){
            req.body.images = uploadImage(req.files.images,'Products')
        }
    }

    if(req.body.subCategories){
        req.body.subCategories = req.body.subCategories.split(',')
    }
    console.log(req.body)
  
    let product = await Product.findOneAndUpdate({_id: req.params.id},req.body,{new: true});

    if(product){
        return successResponse(res,'Product Updated Successfully!',{product})
    }
    
})

exports.deleteProduct = catchAsync(async (req,res,next) => {

    let success = await Product.findByIdAndRemove(req.params.id);
    return successResponse(res,'Product Deleted Successfully!')
    
})