const formidable = require("formidable");
const { uploadImage, validateInputs, sendResponse } = require("../../helpers");
const AppError = require("../../helpers/appError");
const { catchAsync } = require("../../helpers/errors");
const PostBids = require("../../models/PostBids");

exports.getBid = catchAsync(async(req,res,next)=>{

    let bids = await PostBids.findById(req.params.id).populate(['post','user']);
    console.log(bids)
    return sendResponse(res,1,200,"Get Bids SuccessFully!",bids)

});

exports.getBids = catchAsync(async (req, res, next) => {

  console.log("PARAMS", req.query);

  if (req.query.search) {
    var bids = await PostBids.paginate(  
      { title: { $regex: ".*" + req.query.search + ".*" }},
      {
        offset:
          req.query.page == 1
            ? 0
            : req.query.page * req.query.perPage - req.query.perPage,
        limit: req.query.perPage,
        populate :[ 'user','post'],
      },
    
    );

  } else {
    var bids = await PostBids.paginate(
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
        populate :[ 'user','post'],
      }
    )
  }

  // return res.json

  // if(!users){
  //     return next(new AppError('No Users Found With that Id', 404))
  // }

  console.log('PAGINATION COUNTER', bids.pagingCounter)

  bids.docs = bids.docs.map(bid =>{
    bid = bid.toJSON()
    bid.sr_no = bids.pagingCounter++
     return bid
  })

  // return res.json({users})
  console.log(bids)
  return sendResponse(res, 1, 200, "Success!", bids );

});

// exports.addPost = catchAsync(async (req, res, next) => {

//     // let requiredFields = ["name", "email", "gender", "age"];
//     let requiredFields = {
//       name: req.body.name,
//       email: req.body.email,
//       gender: req.body.gender,
//       age: req.body.age,
//     }

//     let nonRequired = {
//       salary: req.body.salary
//     }

//     let validate = validateInputs(next,requiredFields,nonRequired);
//     console.log('validate',validate)
//   //  return

//     if(req.files){
//       if (req.files && req.files.image && req.files.image.name) {
//         req.body.image = uploadImage(req.files.image, "Users");
//       }
//     }
    
  

//     console.log("FIELDS", req.body);
//     let user = await User.create(req.body);

//     if (user) {
//       return sendResponse(res, 1, 200, "User Created Successfully!", { user });
//     } else {
//        return next(new AppError('Failed to Create User!', 400))
//     }

// });

// exports.updatePost = catchAsync(async (req, res) => {


//   // if(req.files){
//   //   if (req.files && req.files.image && req.files.image.name) {
//   //     req.body.image = uploadImage(req.files.image, "Users");
//   //   }
//   // }

//   let post = await Post.findByIdAndUpdate(req.params.id, req.body);

//   if (post) {
//     return sendResponse(res, 1, 200, "Post Updated Successfully!", {
//       post,
//     });
//   } else {
//     return next(new AppError('Failed to Update Post!', 400))
//   }

// })

exports.deleteBid = catchAsync(async (req, res) => {

  let success = await PostBids.findByIdAndRemove(req.params.id);

  if (success) {
    return sendResponse(res, 1, 200, "Bid Deleted Successfully!");
  } else {
    return sendResponse(res, 0, 500, "Something went wrong!");
  }

});
