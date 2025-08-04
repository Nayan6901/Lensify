import sendemail from "../config/sendemail.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import verifyemail1 from "../utils/vrifyemail.js";
import genratewebtoken from "../utils/genratewebtoken.js";
import genraterefreshtoken from "../utils/genraterefeshtoken.js";
import uploadImageToCloudinary from "../utils/uploadimageColudnary.js";
import upload from "../middlewear/multers.js";
import forgototpemail from "../utils/forgototp.js";
import genrateOtp from "../utils/genrateotp.js";
import jwt from "jsonwebtoken";

export async function registerUserController(request, response) {
  try {
    const { firstname, lastname, email, password } = request.body;
    if (!firstname || !lastname || !email || !password) {
      return response.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return response.status(400).json({
        message: "User already exists with this email",
        error: true,
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const payload = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    };
    const newUser = await userModel.create(payload);
    const save = await newUser.save();
    const verifyemailurl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser?._id}`;
    const Verifyemail = await sendemail({
      sendto: email,
      subject: "Verify your email",
      html: verifyemail1({ firstname, url: verifyemailurl }),
    });
    return response.status(201).json({
      message: "User registered successfully, please verify your email",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(request, response) {
  try {
    const { code } = request.body;
    const user = await userModel.findOne({ _id: code });
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    const updatedUser = await userModel.updateOne(
      { _id: code },
      { verifyemail: true }
    );
    return response.status(200).json({
      message: "Email verified successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//login controlller
export async function loginUserController(request, response) {
  try {
    const { email, password } = request.body;
    const user = await userModel.findOne({ email });

    if (!user || !password) {
      return response.status(400).json({
        message: "please provide pass email",
        error: true,
        success: false,
      });
    }

    if (!user) {
      return response.status(404).json({
        message: "User not found ",
        error: true,
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(400).json({
        message: "invalid password",
        error: true,
        success: false,
      });
    }

    const accesstoken = await genratewebtoken(user._id);
    const refrestoken = await genraterefreshtoken(user._id);
    const cookieoption = {
      httpOnly: true,
      secure: true,
      samesite: "none",
    };
    response.cookie("accesstoken", accesstoken, cookieoption);
    response.cookie("refreshtoken", refrestoken, cookieoption);
    return response.status(200).json({
      message: "login succesfully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refrestoken,
      },
    });
    if (user.status !== "active") {
      return response.status(403).json({
        message: "User is not active",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//logout controller
export async function logoutUserController(request, response) {
  try {
    const userId = request.userId;
    const cookieoption = {
      httpOnly: true,
      secure: true,
      samesite: "none",
    };
    response.clearCookie("accesstoken", cookieoption);
    response.clearCookie("refreshtoken", cookieoption);
    const removeRefreshToken = await userModel.findByIdAndUpdate(userId, {
      refreshToken: "",
    });

    return response.json({
      message: "logout Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//upload user avtar
export async function uploadavtar(request, response) {
  try {
    const userId = request.userId;

    const image = request.file;
    const uploadimage = await uploadImageToCloudinary(image);
    const user = await userModel.findByIdAndUpdate(userId, {
      avtar: uploadimage.url,
    });
    console.log("image:", image);
    return response.status(200).json({
      message: "Image uploaded successfully",
      error: false,
      success: true,
      data: {
        _id: userId,
        avtar: uploadimage.url,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//user details update controller
export async function updateUserDetailsController(request, response) {
  try {
    const userId = request.userId;
    const { firstname, lastname, email, mobile, avtar, password } =
      request.body;

    let hashedPassword = "";

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    const updateruser = await userModel.updateOne(
      { _id: userId },
      {
        ...(firstname && { firstname: firstname }),
        ...(lastname && { lastname: lastname }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashedPassword }),
        ...(avtar && { avtar: avtar }),
      }
    );
    return response.status(200).json({
      message: "User details updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function forgotpasswordcontroller(request, response) {
  try {
    const { email } = request.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "enter correct email",
        error: true,
        success: false,
      });
    }

    const otp = genrateOtp();
    const otpexpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    const updatedUser = await userModel.findByIdAndUpdate(user._id, {
      forgotPasswordOtp: otp,
      forgotPasswordExpiry: new Date(otpexpiry).toISOString(),
    });
    await sendemail({
      sendto: email,
      subject: "Forgot Password OTP",
      html: forgototpemail({ firstname: user.firstname, otp: otp }),
    });
    return response.json({
      message: "OTP sent to your email",
      error: false,
      success: true,
      otp: otp,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//verifyotp controller
export async function verifyOtpController(request, response) {
  try {
    const { email, otp } = request.body;
    if (!email || !otp) {
      return response.status(400).json({
        message: " fill required fields",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "enter correct email",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();
    const otpExpiry = new Date(user.forgotPasswordExpiry);
    if (currentTime > otpExpiry) {
      return response.status(400).json({
        message: "OTP has expired",
        error: true,
        success: false,
      });
    }
    if (otp !== user.forgotPasswordOtp) {
      return response.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "OTP verified successfully",
      error: false,

      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function resetPasswordController(request, response) {
  try {
    const { email, newPassword, confirmPassword } = request.body;
    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }
    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "New password and confirm password do not match",
        error: true,
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const updatedUser = await userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    return response.status(200).json({
      message: "Password reset successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//refersh token controller
export async function refreshTokenController(request, response) {
  try {
    const refreshToken =
      request.cookies.refreshtoken ||
      request?.headers?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return response.status(401).json({
        message: "Refresh token is required",
        error: true,
        success: false,
      });
    }
    const verifytoken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    if (!verifytoken) {
      return response.status(403).json({
        message: "Invalid refresh token",
        error: true,
        success: false,
      });
    }

    const user = verifytoken?._id;
    const newAcesstoken = await genratewebtoken(user);
    const cookieoption = {
      httpOnly: true,
      secure: true,
      samesite: "none",
    };
    response.cookie("accesstoken", newAcesstoken, cookieoption);
    return response.status(200).json({
      message: "Access token refreshed successfully",
      error: false,
      success: true,
      data: {
        accesstoken: newAcesstoken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

///user  profile controller
export async function userProfileController(request, response) {
  try {
    const userId = request.userId;
    const user = await userModel.findById(userId).select("-password -__v");
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "User profile fetched successfully",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
