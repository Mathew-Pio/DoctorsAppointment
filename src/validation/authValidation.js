import {check} from "express-validator";

let validateRegister = [
    check("email","Invalid Email!").isEmail().trim(),

    check("password","Invalid Password, Password must be about 3 chars long")
    .isLength({min:3}),

    check("confirmPassword", "Password does not match. Please double-check your password for correct spelling and capitalization")
    .custom((value, {req} ) => {
        return value === req.body.password
    })
];

module.exports = {
    validateRegister: validateRegister
}