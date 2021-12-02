const jwt = require("jsonwebtoken");

const AdminModel = require("../../models/AdminModel");
const { sendResponse, authenticate } = require("../../helpers");

exports.handleLogin = async (req, res) => {

  // let success = await AdminModel.create({
  //   email: 'admin@admin.com',
  //   password: '123'
  // })
  // console.log(success);
  
  try {

    console.log('BODY',req.body)
    const { email, password } = req.body;

    let user = await AdminModel.findOne({ email }).exec();
    console.log(user);

    if (!user) {
      return sendResponse(res, 0, 400, "Invalid Credientials!");
    }

    let authenticated = authenticate(password, user.password);

    if (!authenticated) {
      return sendResponse(res, 0, 400, "Invalid Credientials!");
    }

    user.password == undefined;

    const token = jwt.sign(
      {
        user: {
          id: user.id,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return sendResponse(res, 1, 200, "Login Successful!", { user, token });

  } catch (err) {
    return sendResponse(res, 0, 400, "Something Went Wrong!");
  }
};
