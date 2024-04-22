
const cars = [
    {
        id: 1,
        make: "Toyota",
        model: "Yaris",
        year: 2001,
        color: "white"
    },
    {
        id: 2,
        make: "Honda",
        model: "Civic",
        year: 2000,
        color: "silver"
    },
    {
        id: 3,
        make: "Moris",
        model: "MINI",
        year: 2010,
        color: "pink"
    },
    {
        id: 4,
        make: "Mercedes",
        model: "CLA",
        year: 2020,
        color: "black"
    },
    {
        id: 5,
        make: "Fiat",
        model: "500",
        year: 1995,
        color: "red"
    }
];

function getCars() {
    return cars;
}

function getCarInformation(id) {
    for (const car of cars){
        if (car.id === id){
            return `Make: ${car.make}, Model: ${car.model}, Year: ${car.year}, Color: ${car.color}.`;
        }
    }
    return "Car doesn't exist";
}

function getCarAge(id) {
    for (const car of cars) {
        if (car.id === id) {
            const currentYear = new Date().getFullYear();
            const CAR_AGE = currentYear - car.year;
            return `Car is ${CAR_AGE} years old.`;
        }
    }
    return "Car doesn't exist";
}


module.exports = {getCars, getCarInformation,getCarAge};