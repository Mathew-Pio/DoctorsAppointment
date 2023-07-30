require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import cookieParser from "cookie-parser";
import passport from "passport";
const configSession = require('./config/session');

let app = express();

// config express cookie
app.use(cookieParser('secret'));

// show flash messages
app.use(connectFlash());

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// config app session
configSession(app);

// config passport middleware
app.use(passport.initialize());
app.use(passport.session());

//config view engine
configViewEngine(app);


//init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
});