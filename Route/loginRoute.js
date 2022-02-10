const express = require("express");
const router = express.Router();
const User = require("../models/loginSchema")
const {LocalStorage} = require("node-localstorage")
const alert = require("alert")
const path = require("path")

let localStorage = new LocalStorage("./loginDetails")

router.route("/").post(function (req, res) {

    if (req.body.username){
        localStorage.setItem("username", req.body.username)
        res.redirect("/")
        }else{
            alert("Please enter a username")
            res.redirect("/login")
        }

})

router.get("/", (req, res, next) => {
        res.sendFile(path.resolve(__dirname, "../public/login.html"));
})

router.post('/', async (req, res) =>{
    const {name, email, password} = req.body;
    const user = new User({
        name, email, password
    })

    const document = await user.findOne({email})
    if (document){
        throw  new Error ("user exists")
    }else{
        user.save()
    }
    

})
module.exports = router;