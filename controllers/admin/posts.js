const formidable = require("formidable");
const { uploadImage, validateInputs, sendResponse } = require("../../helpers");
const AppError = require("../../helpers/appError");
const { catchAsync } = require("../../helpers/errors");
const Post = require("../../models/PostModel");

exports.getPost = catchAsync(async(req,res,next)=>{

    let post = await Post.findById(req.params.id).populate('user');
    console.log(post)
    return sendResponse(res,1,200,"Get Post SuccessFully!",post)

});

exports.getPosts = catchAsync(async (req, res, next) => {

  console.log("PARAMS", req.query);

  if (req.query.search) {
    var posts = await Post.paginate(  
      { title: { $regex: ".*" + req.query.search + ".*" }},
      {
        offset:
          req.query.page == 1
            ? 0
            : req.query.page * req.query.perPage - req.query.perPage,
        limit: req.query.perPage,
      }
    );

  } else {
    var posts = await Post.paginate(
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
        populate : 'user',
      }
    )
  }

  // return res.json

  // if(!users){
  //     return next(new AppError('No Users Found With that Id', 404))
  // }

  console.log('PAGINATION COUNTER', posts.pagingCounter)

  posts.docs = posts.docs.map(post =>{
    post = post.toJSON()
    post.sr_no = posts.pagingCounter++
     return post
  })

  // return res.json({users})
  console.log(posts)
  return sendResponse(res, 1, 200, "Success!", posts );

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

exports.updatePost = catchAsync(async (req, res) => {


  // if(req.files){
  //   if (req.files && req.files.image && req.files.image.name) {
  //     req.body.image = uploadImage(req.files.image, "Users");
  //   }
  // }

  let post = await Post.findByIdAndUpdate(req.params.id, req.body);

  if (post) {
    return sendResponse(res, 1, 200, "Post Updated Successfully!", {
      post,
    });
  } else {
    return next(new AppError('Failed to Update Post!', 400))
  }

})

exports.deletePost = catchAsync(async (req, res) => {

  let success = await Post.findByIdAndRemove(req.params.id);

  if (success) {
    return sendResponse(res, 1, 200, "Post Deleted Successfully!");
  } else {
    return sendResponse(res, 0, 500, "Something went wrong!");
  }

});
