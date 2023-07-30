import userService from "../services/userService";
import { validationResult } from "express-validator";

let getHomepage = (req, res) => {
    res.render("homepage.ejs");
}

let getLoginPage = (req, res) => {
    res.render("auth/login.ejs", {
        errors: req.flash("errors")
    });
};

let getRegisterPage = (req, res) => {
    let form = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    res.render("auth/register.ejs",{
        errors: req.flash("errors"),
        form:form
    });
};

let handleRegister = async (req, res) => {
    // keep the old inputs
    let form = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }

    // validate input
    // create an array to save validation errors

    let errorsArr = [];
    let validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        let errors = Object.values(validationError.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr)
        res.render("auth/register.ejs",{
            errors: req.flash("errors"),
            form:form
        });
    }

    // create a new user
    try {
        let user = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword,
            createdAt : Date.now()
        };
        await userService.createNewUser(user);
        return res.redirect("/");
    } catch (err) {
        // showing the error messages with flash
        req.flash("errors",err);
        res.render("auth/register.ejs",{
            errors: req.flash("errors"),
            form:form
        });
    }
 
};

let getAdminPage = (req, res) => {
    res.render("users/main.ejs");
};

let getAllUsersPage = (req, res) => {
    res.render("users/manageUsers.ejs");
};

module.exports = {
    getHomepage: getHomepage,
    getRegisterPage: getRegisterPage,
    getLoginPage: getLoginPage,
    handleRegister: handleRegister,
    getAdminPage: getAdminPage,
    getAllUsersPage: getAllUsersPage
};