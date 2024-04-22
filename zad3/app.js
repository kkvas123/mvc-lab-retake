const express = require("express"); 
const http = require("http")
const bodyParser = require("body-parser"); 
const carsRouter = require("./routes/cars");
const homeRouter = require("./routes/home");
const public = require("./public")

const app = express(); 
const PORT = 3000;


app.use(express.static(public.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", homeRouter); 
app.use("/car", carsRouter);


app.use((request, response, next) => {
    response.send("404 Page Not Found");
});


function listeningListener() {
    console.log(`Server is running on http://localhost:${PORT}`);
}

app.listen(PORT, listeningListener);
