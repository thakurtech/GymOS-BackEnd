const helmet=require("helmet")
const express=require("express")
const cors=require("cors")
const passport = require("passport");
const xss = require("xss-clean");

const { jwtStrategy } = require("./config/passport.js");
const mongoSanitize = require("express-mongo-sanitize");

const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError.js");
const httpStatus = require("http-status");


const app=express()

app.use(helmet())


app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(xss())
app.use(mongoSanitize())


app.use(
    cors({
        origin:[
            "https://localhost:3000"
        ],
        credentials:true,
    })
)

app.options("*",cors())

app.use(passport.initialize())
passport.use("jwt", jwtStrategy);


app.use("/v1", routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
  });



module.exports=app;