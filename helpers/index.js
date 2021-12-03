// const sgMail = require('@sendgrid/mail');
const jwt = require('express-jwt');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const AppError = require('./appError');


// exports.sessionChecker = (req, res, next) => {
// 	if (req.session && req.session.user) {
// 		next();
// 	} else {
// 		res.redirect('/');
// 	}
// };


exports.sendResponse = (res, success, status, message, body = {}) => {
	return res.status(status).json({
		success,
		status,
		message,
		body: body,
	});
};

exports.successResponse = (res, message, body = {}) => {
	return res.status(200).json({
		success: 1,
		status: 200,
		message,
		body: body,
	});
};


exports.authenticate = (password, enc_password) => {
	return bcrypt.compareSync(password, enc_password);
};

exports.encryptPassword = (password) => {
	const hash = bcrypt.hashSync(password, 10);
	return hash;
};

exports.validateNewPassword = (value, { req }) => {
	if (value === req.body.oldPassword) {
		return Promise.reject('New pasword can not be same as Old password!');
	} else {
		return true;
	}
};



exports.validateInputs = (next, requiredFields, nonRequired = {}) => {

	let x = Object.keys(requiredFields);

	// console.log('x',x);

	let emptyFields = []

	for(x in requiredFields){
		console.log('requiredFields',requiredFields)
		console.log('requiredFields[x]',requiredFields[x])
		if(requiredFields[x] == '' || requiredFields[x] == undefined){
			emptyFields.push(x)
		}
	}

	let requestData = {}

	for(x in nonRequired){
		if(nonRequired[x] != undefined && nonRequired[x] != ''){
			requestData[x] = nonRequired[x]
		}
	}

	console.log('emptyFields',emptyFields)
	if(emptyFields.length !== 0){
		return next(new AppError(`${emptyFields.toString()} are required!`, 400))
	}else{
		return {
			...requestData,
			...requiredFields
		}
	
	}


	// requiredFields.forEach((e) => {
	// 	if (!x.includes(e) || fields[e] == '') {
	// 		missingFields.push(e);
	// 	}
	// });

	// if(missingFields.length){
	// 	return `${missingFields.toString()} is required!`
	// }else{
	// 	return ''
	// }

	
};

// PROTECTED ROUTES
exports.isSignedIn = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'auth',
	algorithms: ['HS256'],
});


// exports.addWatermark = async(filename, logo, text = '') => {

// 	const ORIGINAL_IMAGE = path.join(__dirname, '../public/Uploads/User/' + filename);
// 	const LOGO = path.join(__dirname, '../public/Uploads/Admin/' + logo);

// 	const LOGO_MARGIN_PERCENTAGE = 10;

// 	let X;
// 	let Y;

// 	const main = async () => {
// 		let [image, logo] = await Promise.all([Jimp.read(ORIGINAL_IMAGE), Jimp.read(LOGO)]);

// 		image = image.resize(969, 1280);

// 		logo.resize(image.bitmap.width / 10, Jimp.AUTO);

// 		const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
// 		const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

// 		X = image.bitmap.width - logo.bitmap.width - xMargin;
// 		Y = image.bitmap.height - logo.bitmap.height - yMargin;
// 		console.log(X);

// 		return image.composite(logo, X - 130, Y - 40, [
// 			{
// 				mode: Jimp.BLEND_SCREEN,
// 				opacitySource: 0.1,
// 				opacityDest: 1,
// 			},
// 		]);
// 	};

// 	main()
// 		.then((image) => image.write(ORIGINAL_IMAGE))
// 		.then(async (result) => {
// 			// console.log(result);

// 			var imageCaption = 'Image caption';
// 			var loadedImage;

// 			await Jimp.read(ORIGINAL_IMAGE)
// 				.then(function (image) {
// 					loadedImage = image;
// 					return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
// 				})
// 				.then(function (font) {
// 					loadedImage
// 						.print(font, X - 250, Y + 120, {
// 							text: text,
// 						})
// 						.write(ORIGINAL_IMAGE);
// 				})
// 				.catch(function (err) {
// 					console.error(err);
// 				});
// 		});

// }

// STOCK
// exports.decreaseQuantity = (productId, qty) => {
// 	return db.tbl_products.update({ quantity: Sequelize.literal(`quantity - ${qty}`) }, { where: { id: productId } });
// };

exports.uploadImage = (file,folder)  => {

	console.log('file',file);

	if(Array.isArray(file)){

		let imagesArray = [];
		file.forEach(f =>{

			image = new Date().getTime().toString() + f.name;
			let imagePath = path.join(__dirname, `../public/Uploads/${folder}/${image}`);
	
			console.log(imagePath);
	
			f.mv(imagePath, function(err) {
				if (err){
					console.log(err)
				}
				//   return res.status(500).send(err);
			  });

             imagesArray.push(image);
			  
			  console.log('FIle Uploaded Successfully!')

		})

		return imagesArray;


	}else{

		if (file.name) {		
			image = new Date().getTime().toString() + file.name;
			let imagePath = path.join(__dirname, `../public/Uploads/${folder}/${image}`);
	
			console.log(imagePath);
	
			file.mv(imagePath, function(err) {
				if (err){
					console.log(err)
				}
				//   return res.status(500).send(err);
			  });
			  
			  console.log('FIle Uploaded Successfully!')
	
			return image
	
		}else{
			return ''
		}
		
	}

	return ''



}