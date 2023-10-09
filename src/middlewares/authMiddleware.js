import jwt from "jsonwebtoken";
import User from "../models/userModel";
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEYS, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      }
      req.user = decodedToken;
      next();
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEYS, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken._id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.groupId === 0) {
      next();
    } else {
      res.render("forbidden", {
        message: "Bạn không có tuyền truy cập trang này!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const redirectIfLoggedIn = (req, res, next) => {
  if (req.cookies.jwt) {
    return res.redirect("/");
  }
  next();
};

module.exports = {
  verifyToken,
  checkUser,
  isAdmin,
  redirectIfLoggedIn,
};
