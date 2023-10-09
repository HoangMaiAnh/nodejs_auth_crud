import User from "../models/userModel";
import jwt from "jsonwebtoken";

// hàm xử lý lỗi
const handleErrors = (err) => {
  let errors = {
    email: "",
    password: "",
  };

  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered!";
  }

  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect!";
  }

  if (err.code === 11000) {
    errors.username = "That username is already in use!";
    errors.email = "That email is already in use!";
    errors.phone = "That phone is already in use!";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

// jwt có access token và refresh token
// access token -> phân quyền người dùng

// id người dùng, khóa bí mật, thời gian nó hết hạn
const accessToken = (id, groupId) => {
  return jwt.sign({ _id: id, groupId }, process.env.SECRET_KEYS, {
    expiresIn: maxAge,
  });
};

const registerPage = (req, res) => {
  return res.render("main", {
    data: { title: "Register page", page: "register" },
  });
};

const loginPage = (req, res) => {
  return res.render("main", {
    data: { title: "Login page", page: "login" },
  });
};

// register
const register = async (req, res) => {
  const { username, email, password, fullname, phone, address, gender } =
    req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      fullname,
      phone,
      address,
      gender,
    });

    // tạo token bằng id người dùng
    const token = accessToken(user._id);
    // gán token đó len cookie bằng key : "jwt"
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    return res.status(200).json({
      user: user._id,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({
      errors,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (user) {
      const {
        username,
        email,
        password,
        fullname,
        phone,
        address,
        gender,
        createdAt,
        updatedAt,
        __v,
        ...userData
      } = user.toObject();

      const token = accessToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

      return res.status(200).json({ user: userData });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  registerPage,
  loginPage,
  register,
  login,
  logout,
};
