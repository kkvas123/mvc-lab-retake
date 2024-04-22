const fs = require("fs");
const homeView = require("../views/home");
const carView = require("../views/car");
const addCarView = require("../views/add-car");
const querystring = require('node:querystring'); 

function handleHome(response) {
    response.setHeader("Content-Type", "text/html");
    response.write(homeView.renderPage());
    response.end();
}

function handleAddCar( method, request, response) {
    if (method === "GET") {
        response.setHeader("Content-Type", "text/html");
        response.write(addCarView.renderPage());
        response.end();
    } 
    else if (method === "POST") {
        const body = [];
        request.on("data", (chunk) => {
            body.push(chunk);
        })
        request.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const formData = querystring.parse(parsedBody);
            fs.writeFileSync("formData.json", JSON.stringify(formData));
            response.statusCode =302;
            response.setHeader("Location", "/car");
            response.end(); 
            });
    }
}



function handleCar(response) { 
    fs.readFile("formData.json", (data) => {
        response.setHeader("Content-Type", "text/html");
        response.write(carView.renderPage(data));
        response.end();
    });
}

function handlePageNotFound(response) {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html");
    response.write("404 Page Not Found");
    response.end();
}

module.exports = {handleHome, handleAddCar, handleCar, handlePageNotFound};
