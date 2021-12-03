const formidable = require("formidable");
const { uploadImage, validateInputs, sendResponse } = require("../../helpers");
const AppError = require("../../helpers/appError");
const { catchAsync } = require("../../helpers/errors");
const { findByIdAndRemove } = require("../../models/UserModel");
const User = require("../../models/UserModel");

exports.getUser = catchAsync(async(req,res,next)=>{

    let user = await User.findById(req.params.id);
    console.log(user)
    return sendResponse(res,1,200,"Get User SuccessFully!",user)

});

exports.getUsers = catchAsync(async (req, res, next) => {

  console.log("PARAMS", req.query);

  if (req.query.search) {
    var users = await User.paginate(
        
      { firstName: { $regex: ".*" + req.query.search + ".*" }, userType: req.query.role },
      {
        offset:
          req.query.page == 1
            ? 0
            : req.query.page * req.query.perPage - req.query.perPage,
        limit: req.query.perPage,
      }
    );

  } else {
    var users = await User.paginate (
      { userType: req.query.role },
      {
        offset:
          req.query.page == 1
            ? 0
            : req.query.page * req.query.perPage - req.query.perPage,
        limit: req.query.perPage,
        sort: {
          createdAt: -1
        }
      }
    )
  }

  // if(!users){
  //     return next(new AppError('No Users Found With that Id', 404))
  // }

  console.log('PAGINATION COUNTER', users.pagingCounter)

  users.docs = users.docs.map(user =>{
    user = user.toJSON()
     user.sr_no = users.pagingCounter++
     return user
  })

  // return res.json({users})
  console.log(users)
  return sendResponse(res, 1, 200, "Success!", users );

});

exports.addUser = catchAsync(async (req, res, next) => {

    // let requiredFields = ["name", "email", "gender", "age"];
    let requiredFields = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      age: req.body.age,
    }

    let nonRequired = {
      salary: req.body.salary
    }

    let validate = validateInputs(next,requiredFields,nonRequired);
    console.log('validate',validate)
  //  return

    if(req.files){
      if (req.files && req.files.image && req.files.image.name) {
        req.body.image = uploadImage(req.files.image, "Users");
      }
    }
    
  

    console.log("FIELDS", req.body);
    let user = await User.create(req.body);

    if (user) {
      return sendResponse(res, 1, 200, "User Created Successfully!", { user });
    } else {
       return next(new AppError('Failed to Create User!', 400))
    }

});

exports.updateUser = catchAsync(async (req, res) => {


  if(req.files){
    if (req.files && req.files.image && req.files.image.name) {
      req.body.image = uploadImage(req.files.image, "Users");
    }
  }

  let user = await User.findByIdAndUpdate(req.params.id, req.body);

  if (user) {
    return sendResponse(res, 1, 200, "User Updated Successfully!", {
      user,
    });
  } else {
    return next(new AppError('Failed to Create User!', 400))
  }

})

exports.deleteUser = catchAsync(async (req, res) => {

  let success = await User.findByIdAndRemove(req.params.id);

  if (success) {
    return sendResponse(res, 1, 200, "User Deleted Successfully!");
  } else {
    return sendResponse(res, 0, 500, "Something went wrong!");
  }

});
