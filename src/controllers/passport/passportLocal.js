import passport from "passport";
import passportLocal from "passport-local";
import loginServices from "../../services/loginServices";

let LocalStrategy = passportLocal.Strategy;

// initialize the passport-local
let initPassportLocal = () => {
    // check login with the email and password input
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        try{
            // find user by email address
            await loginServices.findUserByEmail(email)
            // had a user ?
            .then(async(user) => {
                if(!user) return done(null, false, req.flash("errors","User not found!!"));
                // compare the user's password
                let message = await loginServices.comparePassword(password, user);
                if(message === true){
                    // the password is match
                    return done(null, user, null);
                }
                else{
                    // return false with the error message
                    return done(null, false, req.flash("errors",message));
                }
            })
            .catch(err => {
                console.log(err);
                return done(null, false, req.flash("errors",err));
            })
        }catch(error){
            console.log(error);
            return done(null, false, error);
        }
    }
    
    
    ))
};

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    await loginServices.findUserById(id).then(user => {
        return done(null, user)
    }).catch(error => {
        console.log(error);
        return done(error, null)
    })
});

module.exports = initPassportLocal;





