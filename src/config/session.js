require("dotenv").config();

let Sequelize = require("sequelize");
let session = require("express-session");

// initalize sequelize with session store
let SequelizeStore = require("connect-session-sequelize")(session.Store);

// connect to the database
let myDatabase = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        logging: false,
        dialect: "mysql",
        storage: "./session.mysql",
});

let sessionStore = new SequelizeStore({
    db: myDatabase
});

let configSession = (app) => {
        app.use(
        session({
            key: "express.sid",
            secret: "secret",
            store: sessionStore,
            resave: true,
            saveUninitialized: false,
            cookie: 
                {
                    httpOnly: false, secure: false, maxAge: (24 * 60 * 60 * 1000)  // 1 day
                } 
        })
    );
};

// create the 'sessions' table in the database
sessionStore.sync();

module.exports = configSession;


