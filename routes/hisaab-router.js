const express = require('express')
const router = express.Router()
const {
    viewpagecontroller,
    deletepagecontroller,
    editpagecontroller,
    updatepagecontroller,
    passcodepagecontroller,
    postpasscodepagecontroller,
} = require("../controllers/hisaab-controller")

const {isLoggedIn} = require("../middlewares/auth-middleware")


router.get('/:id',isLoggedIn, viewpagecontroller)
router.get('/delete/:id',isLoggedIn, deletepagecontroller)
router.get('/edit/:id',isLoggedIn, editpagecontroller)
router.post('/update/:id',isLoggedIn,updatepagecontroller)
router.post('/verify/:id',isLoggedIn,postpasscodepagecontroller)

module.exports = router;