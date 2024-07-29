const express = require('express')
const app = express()
const path = require("path");
const db = require("./config/mongsose-connection")
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 3000;

require("dotenv").config()

const indexRouter = require("./routes/index-router")
const hisaabRouter = require("./routes/hisaab-router")
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());


app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    next();
});


app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use('/', indexRouter)
app.use('/hisaab', hisaabRouter)

app.listen(PORT,()=>{
  console.log(`Server is runing on ${PORT}`);
})