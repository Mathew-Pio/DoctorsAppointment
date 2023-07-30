import express from "express";
import homePageController from "../controllers/homePageController";
import auth from "../validation/authValidation";
import initPassportLocal from "../controllers/passport/passportLocal";
import passport from "passport";
import authController from "../controllers/passport/authController";

// initialize passport-local
initPassportLocal();


const router = express.Router();

let initAllWebRoutes = (app) => {
    router.get("/", homePageController.getHomepage);
    router.get("/login", authController.checkLoggedOut, homePageController.getLoginPage);
    router.get("/register",homePageController.getRegisterPage);
    router.get("/users", authController.checkLoggedIn ,homePageController.getAdminPage);
    router.get("/all-users", authController.checkLoggedIn ,homePageController.getAllUsersPage);

    router.post("/register", auth.validateRegister , homePageController.handleRegister);
    router.post("/login", passport.authenticate("local",{
        successRedirect: "/users",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    router.get("/log-out",authController.postLogOut);
    return app.use("/", router)
};

module.exports = initAllWebRoutes;