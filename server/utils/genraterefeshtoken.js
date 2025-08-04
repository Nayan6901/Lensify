import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
const genraterefreshtoken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );
  const updaterefreshtokenuser = await userModel.updateOne(
    {
      _id: userId,
    },
    { refreshToken: token }
  );
  return token;
};

export default genraterefreshtoken;
