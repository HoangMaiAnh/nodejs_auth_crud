import express from "express";
import {
  verifyToken,
  checkUser,
  isAdmin,
  redirectIfLoggedIn,
} from "../middlewares/authMiddleware";
import homeController from "../controllers/homeController";
import aboutController from "../controllers/aboutController";
import authController from "../controllers/authController";
import userController from "../controllers/userController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", aboutController.getAboutPage);
  router.get("/register", redirectIfLoggedIn, authController.registerPage);
  router.get("/login", redirectIfLoggedIn, authController.loginPage);
  router.get("/logout", authController.logout);
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/list-user", [verifyToken, isAdmin], userController.userListPage);
  router.get(
    "/update-user/:userId",
    [verifyToken, isAdmin],
    userController.updateUserPage
  );
  router.post(
    "/update-user/:userId",
    [verifyToken, isAdmin],
    userController.updateUserByAdmin
  );
  router.get(
    "/detail-user/:userId",
    [verifyToken, isAdmin],
    userController.detailUser
  );

  router.get(
    "/delete-user/:userId",
    [verifyToken, isAdmin],
    userController.deleteUser
  );

  app.use("*", checkUser);

  return app.use("/api/v1", router);
};

export default initWebRoutes;
