/* ============================================================
   GADI FINDER — PART 8
   COMPLETE CAR DATABASE
   ============================================================

   PURPOSE:
   This file contains ONLY car data.

   DO NOT put:
   - HTML layout here
   - CSS here
   - Home page code here
   - Menu code here
   - Contact page code here

   To update a car, edit ONLY this file.

   IMAGE PATH:
   Leave image fields empty until the corresponding images
   are added to the website.

   ============================================================ */


/* ============================================================
   DATABASE CONFIGURATION
   ============================================================ */

const GADI_FINDER_DATABASE = {

    version: "2026",
    country: "India",

    brands: [
        "Maruti Suzuki",
        "Toyota",
        "Hyundai",
        "Kia",
        "Tata",
        "Mahindra",
        "Honda",
        "MG",
        "Škoda",
        "Volkswagen",
        "Renault",
        "Nissan",
        "Citroën"
    ],

    cars: []

};


/* ============================================================
   CAR DATABASE
   ============================================================

   IMPORTANT:

   The actual variant records from the uploaded CSV/XLSX
   databases should be imported/generated here.

   Each MODEL contains:
   - basic model information
   - body type
   - seats
   - fuel
   - transmission
   - engine
   - mileage
   - dimensions
   - performance
   - safety
   - comfort
   - technology
   - variants
   - prices
   - images
   - source information

   ============================================================ */


/* ============================================================
   MARUTI SUZUKI
   ============================================================ */

GADI_FINDER_DATABASE.cars.push(

    {
        id: "maruti-suzuki-swift",

        brand: "Maruti Suzuki",
        model: "Swift",

        status: "Available in India",

        bodyType: "",
        seatingCapacity: "",
        doors: 5,

        fuelTypes: [],
        transmissionTypes: [],

        engine: {
            type: "",
            displacement: "",
            cylinders: "",
            power: "",
            torque: ""
        },

        mileage: {
            petrol: "",
            diesel: "",
            cng: "",
            hybrid: "",
            electric: ""
        },

        dimensions: {
            length: "",
            width: "",
            height: "",
            wheelbase: "",
            groundClearance: "",
            bootSpace: ""
        },

        performance: {
            topSpeed: "",
            acceleration: ""
        },

        safety: {
            airbags: "",
            abs: "",
            esc: "",
            hillAssist: "",
            parkingSensors: "",
            camera: "",
            tpms: "",
            isofix: ""
        },

        comfortFeatures: [],

        technologyFeatures: [],

        exteriorFeatures: [],

        interiorFeatures: [],

        colors: [],

        variants: [],

        images: {
            main: "",
            gallery: [
                "",
                "",
                "",
                "",
                "",
                ""
            ]
        },

        imageFolder: "",

        locationImage: "",

        officialWebsite: "",

        sources: {
            official: "",
            research: []
        }
    }

);


/* ============================================================
   DATABASE HELPER FUNCTIONS
   ============================================================ */


/* Get every car */

function getAllCars() {

    return GADI_FINDER_DATABASE.cars;

}


/* Find car by ID */

function getCarById(id) {

    return GADI_FINDER_DATABASE.cars.find(
        car => car.id === id
    );

}


/* Find cars by brand */

function getCarsByBrand(brand) {

    return GADI_FINDER_DATABASE.cars.filter(
        car =>
            car.brand.toLowerCase() === brand.toLowerCase()
    );

}


/* Search cars */

function searchCars(searchText) {

    const search = searchText
        .toLowerCase()
        .trim();

    if (!search) {
        return getAllCars();
    }

    return GADI_FINDER_DATABASE.cars.filter(car => {

        const brand = car.brand.toLowerCase();
        const model = car.model.toLowerCase();

        return (
            brand.includes(search) ||
            model.includes(search)
        );

    });

}


/* Find cars according to fuel */

function getCarsByFuel(fuel) {

    return GADI_FINDER_DATABASE.cars.filter(car => {

        return car.fuelTypes.some(
            item =>
                item.toLowerCase() === fuel.toLowerCase()
        );

    });

}


/* Find cars according to seating */

function getCarsBySeats(seats) {

    return GADI_FINDER_DATABASE.cars.filter(
        car =>
            Number(car.seatingCapacity) === Number(seats)
    );

}


/* Find cars according to body type */

function getCarsByBodyType(type) {

    return GADI_FINDER_DATABASE.cars.filter(
        car =>
            car.bodyType.toLowerCase() ===
            type.toLowerCase()
    );

}


/* Find cars according to transmission */

function getCarsByTransmission(transmission) {

    return GADI_FINDER_DATABASE.cars.filter(car => {

        return car.transmissionTypes.some(
            item =>
                item.toLowerCase() ===
                transmission.toLowerCase()
        );

    });

}


/* ============================================================
   EXPORT DATABASE
   ============================================================ */

window.GADI_FINDER_DATABASE = GADI_FINDER_DATABASE;

window.getAllCars = getAllCars;
window.getCarById = getCarById;
window.getCarsByBrand = getCarsByBrand;
window.searchCars = searchCars;
window.getCarsByFuel = getCarsByFuel;
window.getCarsBySeats = getCarsBySeats;
window.getCarsByBodyType = getCarsByBodyType;
window.getCarsByTransmission = getCarsByTransmission;


/* ============================================================
   END OF PART 8
   ============================================================ */
