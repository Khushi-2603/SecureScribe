const express = require('express')
const router = express.Router()
const {
    landingPageController,
    registerController,
    loginPageController,
    postregisterController,
    logoutPageController,
    IprofilePageController,
    createHisaabController,
    postcreateHisaabController,
    uploadController,
    postuploadController,
} = require("../controllers/index-controller")

const {isLoggedIn} = require("../middlewares/auth-middleware")
const upload = require("../config/multer")

router.get('/', landingPageController)
router.post('/login', loginPageController)
router.get('/register',registerController)
router.post('/register',postregisterController)
router.get('/logout', logoutPageController)
router.get('/profile',isLoggedIn, IprofilePageController)
router.get('/create',isLoggedIn, createHisaabController)
router.post('/create',isLoggedIn, postcreateHisaabController)
router.get('/upload',isLoggedIn, uploadController)
router.post('/upload',isLoggedIn, upload.single('image'),postuploadController)

module.exports = router;