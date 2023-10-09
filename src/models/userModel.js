const mongoose = require("mongoose");
import { isEmail } from "validator";
import bcrypt from "bcryptjs";

var userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username!"],
      unique: true,
      minLength: [6, "Minimum username length is 6 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter email!"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email!"],
    },
    password: {
      type: String,
      required: [true, "Please enter password!"],
      minLength: [6, "Minimum password length is 6 characters"],
    },
    fullname: {
      type: String,
      required: [true, "Please enter your fullname!"],
      minLength: [6, "Minimum fullname length is 6 characters"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number!"],
      unique: true,
      minLength: [10, "Minimum phone number length is 10 characters"],
    },
    address: {
      type: String,
      required: [true, "Please enter your address!"],
    },
    gender: {
      type: String,
      required: [true, "Please enter your gender!"],
    },
    groupId: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const User = mongoose.model("User", userSchema);
export default User;
