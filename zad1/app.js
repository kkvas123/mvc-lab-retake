const http = require("http");

const { getHTMLDocumentStart, getHTMLDocumentEnd } = require("./htmlGenerator");
const { getCars, getCarInformation, getCarAge } = require("./cars");

const PORT = 3000;

const server = http.createServer(requestListener);

function requestListener(request, response){
    
    const cars = getCars();
    console.log(cars);
    
    response.setHeader("Content-Type", "text/html");
    
    response.write(getHTMLDocumentStart());

    response.write("<body>");

    response.write(`<p>${getCarInformation(1)}</p>`);

    response.write(`<p>${getCarAge(1)}</p>`);

    response.write("</body>");

    response.write(getHTMLDocumentEnd());

    response.end();
}


function listeningListener() {
    console.log(`Server is running on ${PORT}.`);
}

server.listen(PORT, listeningListener);