var express = require('express');
const Admin = require('../../models/AdminModel');
const User = require('../../models/UserModel');
const Post = require('../../models/PostModel');
const Content = require('../../models/ContentModel');
const PostBids = require('../../models/PostBids');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

  // User.create({
  // firstName: 'Gurwinder',
	// lastName: 'Singh',
	// phone: '8437576239' ,
	// email: 'gurwinder7735@gmail.com' , 
  // profile_img: 'user.png',
	// password: 'adadad' ,
	// otp: '2323',
  // status: 1,
	// userType: 1,
  // wallet: 0,
  // userType: 1
  //  }).then(result => {
  //    console.log('RESULT', result);
  //  }).catch(err => {
  //    console.log(err.message);
  //  })

  //   Post.create({
  //       images: [{name: 'fsf'}],
  //       title: 'Test Post',
  //       description: 'Post Description',
  //       pickupDate: 'Post Description',
  //       pickupTime: 'Post Description',
  //       user: '61a8b087ba195b2ddc43023a',
  //       pickupLocation: {
  //         location: 'String',
  //         latitude: 'String',
  //         longitude: 'String'
  //       },
  //       deliveryLocation: {
  //         location: 'String',
  //         latitude: 'String',
  //         longitude: 'String'
  //       },
  //       images: [{name: 'tets'}]
  //  }).then(result => {
  //    console.log('RESULT', result);
  //  }).catch(err => {
  //    console.log(err.message);
  //  });


//   PostBids.create({
//     user: '61a9d04b03a4636bb7ceb7f3',
//     post: '61a9ccab33a24d197090e14b',
//     offerPrice: 30,
   
// }).then(result => {
//  console.log('RESULT', result);
// }).catch(err => {
//  console.log(err.message);
// })



});

module.exports = router;
