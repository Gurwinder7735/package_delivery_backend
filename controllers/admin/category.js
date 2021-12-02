const { validateInputs, successResponse, uploadImage } = require("../../helpers");
const AppError = require("../../helpers/appError");
const { catchAsync } = require("../../helpers/errors");
const Category = require('../../models/CategoryModel')

exports.getCategories = catchAsync(async (req,res,next) => {

    let categories = await Category.find();
    categories = categories.map((c,id) => {
        c = c.toJSON()
        c.sr_no = id+1
        return c
    });

    return successResponse(res,'Success!', {categories});
  
})

exports.addCategory = catchAsync(async (req,res,next) => {

    let requiredFields = ["name"];

    let validate = validateInputs(req.body, requiredFields);

    if (validate) {
      return next(new AppError(`${validate}`,400))
    }

    if(req.files){
        if(req.files.image){
            req.body.image = uploadImage(req.files.image, 'Category')
        }
    }
// return
    let category = await Category.create(req.body);

    return successResponse(res,'Category Added Successfully !',category)

    
})


exports.updateCategory = catchAsync(async (req,res,next) => {

    if(req.files){
        if(req.files.image){
            req.body.image = uploadImage(req.files.image, 'Category')
        }
    }

    let category = await Category.findOneAndUpdate({_id: req.params.id},req.body,{new: true});

    return successResponse(res,'Category Updated Successfully!',category)
    
})

exports.deleteCategory = catchAsync(async (req,res,next) => {

    let success = await Category.findByIdAndRemove(req.params.id);
    if(success){
        return successResponse(res,'Category Deleted Successfully!')
    }
    
})