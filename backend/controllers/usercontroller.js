import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// @desc Auth user/set token
//route POST/api/users/auth
//@access Pubic
const authUser = asyncHandler(async (req, res) => {
  const {email,password} = req.body

  const user = await User.findOne({email})
  if(user && (await user.matchPasswords(password))){
    generateToken(res,user._id)
    res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email
    })
   }else{
    res.status(400);
    throw new Error("Invalid email or password")
   }


});

// @desc Register new user
//route POST /api/users/register
//@access Pubic
const registerUser = asyncHandler(async (req, res) => {
  
 const {name,email,password} = req.body;

 const userExiisits = await User.findOne({email:email})

 if(userExiisits){
  res.status(400);
  throw new Error('User already exists')
 }
  
 const user = await User.create({
  name,
  email,
  password
 })

 if(user){
  generateToken(res,user._id)
  res.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email
  })
 }else{
  res.status(400);
  throw new Error("Invalide user data")
 }
  
});

// @desc logot user/set token
//route POST/api/users/logout
//@access Pubic
const logoutUser = asyncHandler(async (req, res) => {

res.cookie('jwt','',{
  httpOnly:true,
  expires:new Date(0) 
})

res.status(200).json({message: 'User Logged out'})

});

// @desc Get user profile
//route GET/api/users/progile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: " User Profile" });
});

// @desc update user profile
//route PUT/api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update user profile" });
});

export {
  authUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
};
