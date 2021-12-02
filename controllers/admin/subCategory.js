const { validateInputs, successResponse, uploadImage } = require("../../helpers");
const AppError = require("../../helpers/appError");
const { catchAsync } = require("../../helpers/errors");
const SubCategory = require('../../models/SubCategory')

 
exports.getSubCategories = catchAsync(async (req,res,next) => {

    let subCategories = await SubCategory.find({category: req.params.id});

    return successResponse(res,'Success!', subCategories);
  
})

exports.addSubCategory = catchAsync(async (req,res,next) => {

    let requiredFields = ["name","category"];

    req.body.category = req.params.id

    let validate = validateInputs(req.body, requiredFields);

    if (validate) {
      return next(new AppError(`${validate}`,400))
    }

    if(req.files){
        if(req.files.image){
            req.body.image = uploadImage(req.files.image, 'SubCategory')
        }
    }

    let subCategory = await SubCategory.create(req.body);

    return successResponse(res,'Success!',subCategory)

    
})


exports.updateSubCategory = catchAsync(async (req,res,next) => {

    if(req.files){
        if(req.files.image){
            req.body.image = uploadImage(req.files.image, 'Category')
        }
    }

    let subCategory = await SubCategory.findOneAndUpdate({_id: req.params.id},req.body,{new: true});

    return successResponse(res,'Success!',subCategory)
    
})

exports.deleteSubCategory = catchAsync(async (req,res,next) => {

    let success = await SubCategory.findByIdAndRemove(req.params.id);
    if(success){
        return successResponse(res,'Sub Category Deleted Successfully!')
    }
    
})