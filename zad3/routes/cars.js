const express = require("express");
const router = express.Router();
const fs = require("fs");

const carView = require("../views/car.html")

const addCarView = require("../views/add-car.html");

const carListView = require("../views/cars-list.html");


let cars = [];
let nextId = 1;


router.get("/car", (request, response, next) => {
    response.sendFile(carView);
    

    fs.readFile(carView, 'utf-8', (err, html) => {
        if (err) {
            throw err;
        }
        
        const $ = cheerio.load(html);

        if (cars.length === 0){
            $(".car").html("No cars has been found.");
        }
        else {
            $(".car").html("<h2>Last added car</h2>");
            cars.forEach(car => {
                $(".car").append(`<div><span class="bold">make:</span> ${car.make}</div>`);
                $(".car").append(`<div><span class="bold">model:</span> ${car.model}</div>`);
                $(".car").append(`<div><span class="bold">year:</span> ${car.year}</div>`);
                $(".car").append(`<div><span class="bold">color:</span> ${car.color}</div>`);
            });
        
        }
        response.send($.html())
    });
});


router.get("/car/add", (request, response, next) => {
    response.sendFile(addCarView);
});

router.get("/car/list", (request, response, next) => {
    response.sendFile(carListView);

    fs.readFile(carListView, "utf-8", (err, html) => {
        if (err) {
            throw err;
        }
        const $ = cheerio.load(html);
        if (cars.length === 0) {
            $(".cars").html("No cars has been found.");
        } 
        else {
            $(".cars").html("<h2>Cars</h2><ul></ul>");
            cars.forEach(car => {
                $("ul").append(`<li><p><span class="bold">make:</span> ${car.make}</p><p><span class="bold">model:</span> ${car.model}</p><p><span class="bold">year:</span> ${car.year}</p><p><span class="bold">color:</span> ${car.color}</p></li>`);
            });
        }
        response.send($.html());
    });
});

router.post("/car/add", (request, response,  next) => {
    const { make, model, year, color } = request.body;
    const newCar = { id: nextId++, make, model, year, color };
    cars.push(newCar);
    response.redirect("/car");
});

module.exports = router;

