const express = require("express");
const router = express.Router();

const homePage = require("./views/home.html");

router.get("/", (request, response, next) => {
    response.sendFile(homePage);
});


module.exports = router;