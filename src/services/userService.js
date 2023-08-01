import db from "../models";
import bcrypt from "bcryptjs";



let createNewUser = (user) => {
    // check if user's email exists before ??
    // return true if email exists in the database
    return new Promise(async(resolve, reject) => {
    try{
    let isEmailExist = await checkEmailUser(user);

    if(isEmailExist){
        reject(`This email "${user.email}" already exists Please input another valid email`);
    }
    else{
    //  hash the user's password
        let salt = bcrypt.genSaltSync(10);
    // update the user's password
        user.password = bcrypt.hashSync(user.password, salt);
    // create a new user
        await db.User.create(user);
        resolve("done!")
    }
        }catch (e) {
            reject(e)
        }
    });
};

let checkEmailUser = (userCheck) => {
    return new Promise( async (resolve, reject) => {
        try{
            let currentUser = await db.User.findOne({
                where: {
                    email: userCheck.email
                }
            });

            if(currentUser) resolve(true);
            resolve(false);

        }catch(e){
            reject(e);
        }
    });
}

module.exports = {
    createNewUser: createNewUser,
    checkEmailUser: checkEmailUser
}