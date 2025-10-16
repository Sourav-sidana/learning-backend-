import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username, fullName } = req.body;
  console.log(email, password, username, fullName);
  if (
    [email, password, username, fullName].some((field) => {
      return field.trim() === "";
    })
  ) {
    throw new ApiError(400, "All feilds are required");
  }
  const ExistedUser = await User.findOne({ $or: [{ username }, { email }] });
  // res.status(200).json({ message: "ok" });
  if (ExistedUser) {
    throw new ApiError(400, "user with email and username already exists");
  }
console.log("files",req)
  const avatarlocalPath = req.files?.avatar[0]?.path;
  // const coverImagelocalPath = req.files?.coverImage[0]?.path;
let coverImagelocalPath;
  if (!avatarlocalPath) {
    throw new ApiError(400, "avatar is required");
  }
  if(req.files && Array.isArray(req.files)&& req.files.coverImage.length > 0){
    coverImagelocalPath = req.files.coverImage
  }

  const avatar = await uploadToCloudinary(avatarlocalPath);
  const coverImage = await uploadToCloudinary(coverImagelocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
  }
  return res.status(201).json(new ApiResponse(200, createdUser ,"user registered succesfully"))
});
