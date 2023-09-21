import asyncHandler from "express-async-handler";

// @desc Auth user/set token
//route POST/api/users/auth
//@access Pubic
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth User" });
});

// @desc Register new user
//route POST /api/users/register
//@access Pubic
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Register User" });
});

// @desc logot user/set token
//route POST/api/users/logout
//@access Pubic
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout User" });
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