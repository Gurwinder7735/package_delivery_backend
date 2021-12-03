const { sendResponse, validateInputs } = require("../../helpers");
const { catchAsync } = require("../../helpers/errors");
const Content = require("../../models/ContentModel");


exports.getCMS = catchAsync(async (req, res, next) => {

  const { type } = req.params;
  condition = {};

  if (type == 1) {
    condition = {
      accessor: "terms",
    };
    title = "Terms & Conditions";
  }
  if (type == 2) {
    condition = {
      accessor: "privacy",
    };
    title = "Privacy policy";
  }
  if (type == 3) {
    condition = {
      accessor: "about_us",
    };
    title = "About Us";
  }

  let content = await Content.findOne(condition);
  // res.send('hi')
  console.log('content',content);
  return sendResponse(res, 1, 200, title, { content: content.value });
});

exports.updateCMS = catchAsync(async (req, res, next) => {
    
  let requiredFields = {
      content: req.body.content,
    }

    let nonRequired = {}

    let validate = validateInputs(next,requiredFields,nonRequired);

  console.log("VALIDATE", validate);


  const { type } = req.params;
  condition = {};

  if (type == 1) {
    condition = {
      accessor: "terms",
    };
    title = "Terms & Conditions";
  }
  if (type == 2) {
    condition = {
      accessor: "privacy",
    };
    title = "Privacy Policy";
  }
  if (type == 3) {
    condition = {
      accessor: "about_us",
    };
    title = "About Us";
  }

  console.log('req.body',req.body.content)
  let content = await Content.findOneAndUpdate(condition,{ value: req.body.content },{ new: true } );
  // res.send('hi')
  console.log(content);
  return sendResponse(res, 1, 200, `${title} Updated Successfully!`, {
    content: content.value,
  });

});
