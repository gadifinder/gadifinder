/* =========================================================
   GADIFINDER — PART 11
   MAIN JAVASCRIPT
   File: script.js

   This file controls:
   - Page navigation
   - Mobile menu
   - Car database search
   - Find Cars filters
   - Car cards
   - Car detail pages
   - Compare
   - Insurance
   - EMI
   - Promote
   - Contact/query form
   - Advertisement placeholders
   - Image galleries
   - Search
   ========================================================= */


/* =========================================================
   1. GLOBAL SETTINGS
   ========================================================= */

const GADIFINDER = {

    siteName: "GadiFinder",

    contactEmail: "tanamy7773y@gmail.com",

    /* Main pages */
    pages: {
        home: "index.html",
        findCars: "find-cars.html",
        allCars: "all-cars.html",
        compare: "compare.html",
        promote: "promote.html",
        insuranceEmi: "insurance-emi.html",
        contact: "contact.html"
    },

    /* Brands currently included in GadiFinder */
    brands: [
        "Maruti Suzuki",
        "Toyota",
        "Hyundai",
        "Kia",
        "Tata",
        "Mahindra",
        "Honda",
        "MG",
        "Skoda",
        "Volkswagen",
        "Renault",
        "Nissan",
        "Citroën",
        "BYD",
        "Force",
        "Jeep"
    ]
};


/* =========================================================
   2. SAFE STORAGE HELPERS
   ========================================================= */

function saveData(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.error(
            "GadiFinder storage error:",
            error
        );

    }
}


function getData(key, defaultValue = null) {

    try {

        const value =
            localStorage.getItem(key);

        if (value === null) {

            return defaultValue;
        }

        return JSON.parse(value);

    } catch (error) {

        console.error(
            "GadiFinder storage read error:",
            error
        );

        return defaultValue;
    }
}


/* =========================================================
   3. PAGE NAVIGATION
   ========================================================= */

function goToPage(page) {

    if (!page) return;

    window.location.href = page;
}


function openHome() {

    goToPage(GADIFINDER.pages.home);
}


function openFindCars() {

    goToPage(GADIFINDER.pages.findCars);
}


function openAllCars() {

    goToPage(GADIFINDER.pages.allCars);
}


function openCompare() {

    goToPage(GADIFINDER.pages.compare);
}


function openPromote() {

    goToPage(GADIFINDER.pages.promote);
}


function openInsuranceEmi() {

    goToPage(GADIFINDER.pages.insuranceEmi);
}


function openContact() {

    goToPage(GADIFINDER.pages.contact);
}


/* =========================================================
   4. UNIVERSAL CLICK NAVIGATION
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const target =
            event.target.closest(
                "[data-page]"
            );

        if (!target) return;

        const page =
            target.getAttribute(
                "data-page"
            );

        if (!page) return;

        event.preventDefault();

        goToPage(page);
    }
);


/* =========================================================
   5. MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

    const menuButton =
        document.querySelector(
            "[data-menu-toggle]"
        );

    const menu =
        document.querySelector(
            "[data-mobile-menu]"
        );

    if (!menuButton || !menu) {

        return;
    }

    menuButton.addEventListener(
        "click",
        function () {

            menu.classList.toggle(
                "active"
            );

            menuButton.classList.toggle(
                "active"
            );

            const expanded =
                menu.classList.contains(
                    "active"
                );

            menuButton.setAttribute(
                "aria-expanded",
                expanded
            );
        }
    );


    /* Close menu after selecting item */

    menu.querySelectorAll(
        "a,button"
    ).forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    menu.classList.remove(
                        "active"
                    );

                    menuButton.classList.remove(
                        "active"
                    );
                }
            );
        }
    );
}


/* =========================================================
   6. ACTIVE NAVIGATION ITEM
   ========================================================= */

function setActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    document
        .querySelectorAll(
            "[data-nav-page]"
        )
        .forEach(
            function (link) {

                const page =
                    link
                        .getAttribute(
                            "data-nav-page"
                        )
                        .toLowerCase();

                if (
                    page === currentPage ||
                    (
                        currentPage === "" &&
                        page === "index.html"
                    )
                ) {

                    link.classList.add(
                        "active"
                    );

                } else {

                    link.classList.remove(
                        "active"
                    );
                }
            }
        );
}


/* =========================================================
   7. DATABASE ACCESS
   ========================================================= */

/*
   PART 8 contains the actual car database.

   The code below supports either:

   window.GADIFINDER_CARS

   OR

   window.carDatabase

   OR

   window.carsDatabase
*/

function getCarDatabase() {

    if (
        Array.isArray(
            window.GADIFINDER_CARS
        )
    ) {

        return window.GADIFINDER_CARS;
    }


    if (
        Array.isArray(
            window.carDatabase
        )
    ) {

        return window.carDatabase;
    }


    if (
        Array.isArray(
            window.carsDatabase
        )
    ) {

        return window.carsDatabase;
    }


    return [];
}


/* =========================================================
   8. FIND CAR BY ID
   ========================================================= */

function getCarIdFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return (
        params.get("id") ||
        params.get("car") ||
        params.get("model")
    );
}


function findCarById(id) {

    const cars =
        getCarDatabase();

    if (!id) return null;

    return cars.find(
        function (car) {

            return String(
                car.id
            ).toLowerCase() ===
            String(
                id
            ).toLowerCase();

        }
    ) || null;
}


/* =========================================================
   9. OPEN CAR DETAIL PAGE
   ========================================================= */

function openCarDetails(carId) {

    if (!carId) return;

    window.location.href =
        "car-detail.html?id=" +
        encodeURIComponent(
            carId
        );
}


/* =========================================================
   10. CAR IMAGE HELPER
   ========================================================= */

function getCarImage(car) {

    if (!car) {

        return "";
    }


    /* Main image */

    if (
        car.image &&
        typeof car.image === "string"
    ) {

        return car.image;
    }


    if (
        car.mainImage &&
        typeof car.mainImage === "string"
    ) {

        return car.mainImage;
    }


    if (
        Array.isArray(car.images) &&
        car.images.length > 0
    ) {

        return car.images[0];
    }


    return "";
}


/* =========================================================
   11. IMAGE FALLBACK
   ========================================================= */

function setupImageFallbacks() {

    document
        .querySelectorAll(
            "img"
        )
        .forEach(
            function (image) {

                image.addEventListener(
                    "error",
                    function () {

                        image.classList.add(
                            "image-not-found"
                        );

                        /*
                           We intentionally do not
                           insert fake company images.

                           Your own image paths can be
                           added later to the database.
                        */

                    }
                );
            }
        );
}


/* =========================================================
   12. RENDER CAR CARD
   ========================================================= */

function createCarCard(car) {

    if (!car) return null;

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "car-card";

    card.setAttribute(
        "data-car-id",
        car.id || ""
    );


    const image =
        getCarImage(car);


    const brand =
        car.brand ||
        "";


    const name =
        car.name ||
        car.model ||
        "Car";


    const price =
        car.price ||
        car.exShowroomPrice ||
        car.ex_showroom_price ||
        "Price unavailable";


    const fuel =
        car.fuel ||
        car.fuelType ||
        "";


    const transmission =
        car.transmission ||
        "";


    const seats =
        car.seats ||
        "";


    card.innerHTML = `

        <div class="car-card-image">

            ${
                image
                ?
                `
                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(
                        brand + " " + name
                    )}"
                    loading="lazy"
                >
                `
                :
                `
                <div class="car-image-placeholder">
                    <span>Car Image</span>
                </div>
                `
            }

        </div>


        <div class="car-card-content">

            <div class="car-card-brand">

                ${escapeHTML(brand)}

            </div>


            <h3 class="car-card-title">

                ${escapeHTML(name)}

            </h3>


            <div class="car-card-price">

                ${escapeHTML(
                    String(price)
                )}

            </div>


            <div class="car-card-specs">

                ${
                    fuel
                    ?
                    `<span>${escapeHTML(
                        String(fuel)
                    )}</span>`
                    :
                    ""
                }

                ${
                    transmission
                    ?
                    `<span>${escapeHTML(
                        String(transmission)
                    )}</span>`
                    :
                    ""
                }

                ${
                    seats
                    ?
                    `<span>${escapeHTML(
                        String(seats)
                    )} Seats</span>`
                    :
                    ""
                }

            </div>


            <button
                type="button"
                class="car-card-button"
                data-car-open="${escapeHTML(
                    String(car.id || "")
                )}"
            >
                View Car
            </button>

        </div>
    `;


    return card;
}


/* =========================================================
   13. CAR CARD CLICK HANDLER
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "[data-car-open]"
            );

        if (!button) return;

        const carId =
            button.getAttribute(
                "data-car-open"
            );

        openCarDetails(
            carId
        );
    }
);


/* =========================================================
   14. RENDER CAR LIST
   ========================================================= */

function renderCars(
    cars,
    container
) {

    if (
        !container
    ) {

        return;
    }


    container.innerHTML = "";


    if (
        !Array.isArray(cars) ||
        cars.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>No cars found</h3>

                <p>
                    Try changing your
                    filters or search.
                </p>

            </div>

        `;

        return;
    }


    cars.forEach(
        function (car) {

            const card =
                createCarCard(
                    car
                );

            if (card) {

                container.appendChild(
                    card
                );
            }
        }
    );
}


/* =========================================================
   15. BRAND FILTER
   ========================================================= */

function filterCarsByBrand(
    brand
) {

    const cars =
        getCarDatabase();


    if (
        !brand ||
        brand === "all"
    ) {

        return cars;
    }


    return cars.filter(
        function (car) {

            return String(
                car.brand || ""
            ).toLowerCase() ===
            String(
                brand
            ).toLowerCase();

        }
    );
}


/* =========================================================
   16. SEARCH CARS
   ========================================================= */

function searchCars(
    searchTerm
) {

    const cars =
        getCarDatabase();


    if (
        !searchTerm ||
        !searchTerm.trim()
    ) {

        return cars;
    }


    const query =
        searchTerm
            .trim()
            .toLowerCase();


    return cars.filter(
        function (car) {

            const searchableText = [

                car.brand,

                car.name,

                car.model,

                car.variant,

                car.bodyType,

                car.type,

                car.fuel,

                car.fuelType,

                car.transmission

            ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();


            return searchableText.includes(
                query
            );
        }
    );
}


/* =========================================================
   17. NORMALIZE NUMBER
   ========================================================= */

function numberValue(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return null;
    }


    if (
        typeof value === "number"
    ) {

        return value;
    }


    const cleaned =
        String(value)
            .replace(
                /,/g,
                ""
            )
            .replace(
                /₹/g,
                ""
            )
            .replace(
                /lakhs?/gi,
                ""
            )
            .trim();


    const number =
        parseFloat(
            cleaned
        );


    return Number.isFinite(
        number
    )
    ?
    number
    :
    null;
}


/* =========================================================
   18. PRICE TO LAKHS
   ========================================================= */

function priceInLakhs(
    value
) {

    const number =
        numberValue(
            value
        );


    if (
        number === null
    ) {

        return null;
    }


    /*
       If database already stores
       price in lakhs, keep it.

       If it stores a large rupee
       value, convert it.
    */

    if (
        number > 1000
    ) {

        return number / 100000;
    }


    return number;
}


/* =========================================================
   19. GET CAR PRICE
   ========================================================= */

function getCarStartingPrice(
    car
) {

    if (!car) return null;


    const possiblePrices = [

        car.startingPrice,

        car.exShowroomPrice,

        car.ex_showroom_price,

        car.price,

        car.minPrice,

        car.minimumPrice

    ];


    for (
        const price of possiblePrices
    ) {

        const value =
            priceInLakhs(
                price
            );


        if (
            value !== null
        ) {

            return value;
        }
    }


    return null;
}


/* =========================================================
   20. BUDGET FILTER
   ========================================================= */

function filterCarsByBudget(
    cars,
    minimum,
    maximum
) {

    if (
        !Array.isArray(cars)
    ) {

        return [];
    }


    const min =
        numberValue(
            minimum
        );


    const max =
        numberValue(
            maximum
        );


    if (
        min === null &&
        max === null
    ) {

        return cars;
    }


    return cars.filter(
        function (car) {

            const price =
                getCarStartingPrice(
                    car
                );


            if (
                price === null
            ) {

                return false;
            }


            if (
                min !== null &&
                price < min
            ) {

                return false;
            }


            if (
                max !== null &&
                price > max
            ) {

                return false;
            }


            return true;
        }
    );
}


/* =========================================================
   21. FUEL FILTER
   ========================================================= */

function filterCarsByFuel(
    cars,
    fuel
) {

    if (
        !fuel ||
        fuel === "all"
    ) {

        return cars;
    }


    const wanted =
        String(
            fuel
        ).toLowerCase();


    return cars.filter(
        function (car) {

            const actual =
                String(
                    car.fuel ||
                    car.fuelType ||
                    ""
                ).toLowerCase();


            return actual.includes(
                wanted
            );
        }
    );
}


/* =========================================================
   22. TRANSMISSION FILTER
   ========================================================= */

function filterCarsByTransmission(
    cars,
    transmission
) {

    if (
        !transmission ||
        transmission === "all"
    ) {

        return cars;
    }


    const wanted =
        String(
            transmission
        ).toLowerCase();


    return cars.filter(
        function (car) {

            const actual =
                String(
                    car.transmission ||
                    ""
                ).toLowerCase();


            return actual.includes(
                wanted
            );
        }
    );
}


/* =========================================================
   23. SEAT FILTER
   ========================================================= */

function filterCarsBySeats(
    cars,
    minimumSeats
) {

    if (
        minimumSeats === "" ||
        minimumSeats === null ||
        minimumSeats === undefined
    ) {

        return cars;
    }


    const minimum =
        numberValue(
            minimumSeats
        );


    if (
        minimum === null
    ) {

        return cars;
    }


    return cars.filter(
        function (car) {

            const seats =
                numberValue(
                    car.seats
                );


            if (
                seats === null
            ) {

                return false;
            }


            return seats >= minimum;
        }
    );
}


/* =========================================================
   24. BODY TYPE FILTER
   ========================================================= */

function filterCarsByBodyType(
    cars,
    bodyType
) {

    if (
        !bodyType ||
        bodyType === "all"
    ) {

        return cars;
    }


    const wanted =
        String(
            bodyType
        ).toLowerCase();


    return cars.filter(
        function (car) {

            const actual =
                String(
                    car.bodyType ||
                    car.type ||
                    ""
                ).toLowerCase();


            return actual.includes(
                wanted
            );
        }
    );
}


/* =========================================================
   25. PERSONAL / COMMERCIAL FILTER
   ========================================================= */

function filterCarsByUsage(
    cars,
    usage
) {

    if (
        !usage ||
        usage === "all"
    ) {

        return cars;
    }


    /*
       This filter is intentionally
       flexible because some cars can
       be used for both personal and
       commercial purposes.

       The database can specify:

       usage:
       "Personal"

       usage:
       "Commercial"

       usage:
       "Personal, Commercial"

       usage:
       ["Personal","Commercial"]
    */

    const wanted =
        String(
            usage
        ).toLowerCase();


    return cars.filter(
        function (car) {

            const value =
                car.usage ||
                car.use ||
                car.application ||
                "";


            if (
                Array.isArray(value)
            ) {

                return value.some(
                    function (item) {

                        return String(
                            item
                        )
                        .toLowerCase()
                        .includes(
                            wanted
                        );
                    }
                );
            }


            return String(
                value
            )
            .toLowerCase()
            .includes(
                wanted
            );
        }
    );
}


/* =========================================================
   26. FIND-CARS FILTER SYSTEM
   ========================================================= */

function applyFindCarFilters(
    filters
) {

    let cars =
        getCarDatabase();


    if (
        !filters
    ) {

        return cars;
    }


    cars =
        filterCarsByBudget(
            cars,
            filters.minBudget,
            filters.maxBudget
        );


    cars =
        filterCarsByFuel(
            cars,
            filters.fuel
        );


    cars =
        filterCarsBySeats(
            cars,
            filters.seats
        );


    cars =
        filterCarsByBodyType(
            cars,
            filters.bodyType
        );


    cars =
        filterCarsByTransmission(
            cars,
            filters.transmission
        );


    cars =
        filterCarsByUsage(
            cars,
            filters.usage
        );


    return cars;
}


/* =========================================================
   27. FIND-CAR FORM
   ========================================================= */

function setupFindCarForm() {

    const form =
        document.querySelector(
            "[data-find-car-form]"
        );


    if (!form) {

        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const formData =
                new FormData(
                    form
                );


            const filters = {

                minBudget:
                    formData.get(
                        "minBudget"
                    ) ||
                    formData.get(
                        "budgetMin"
                    ),

                maxBudget:
                    formData.get(
                        "maxBudget"
                    ) ||
                    formData.get(
                        "budgetMax"
                    ),

                fuel:
                    formData.get(
                        "fuel"
                    ),

                seats:
                    formData.get(
                        "seats"
                    ),

                bodyType:
                    formData.get(
                        "bodyType"
                    ) ||
                    formData.get(
                        "type"
                    ),

                transmission:
                    formData.get(
                        "transmission"
                    ),

                usage:
                    formData.get(
                        "usage"
                    )

            };


            /*
               Save filters so the
               result page can use them.
            */

            saveData(
                "gadifinder_filters",
                filters
            );


            /*
               Results ALWAYS open on
               the next page.
            */

            window.location.href =
                "car-results.html";
        }
    );
}


/* =========================================================
   28. LOAD FIND-CAR RESULTS
   ========================================================= */

function setupResultsPage() {

    const container =
        document.querySelector(
            "[data-results-container]"
        );


    if (!container) {

        return;
    }


    const filters =
        getData(
            "gadifinder_filters",
            {}
        );


    const cars =
        applyFindCarFilters(
            filters
        );


    renderCars(
        cars,
        container
    );


    const countElement =
        document.querySelector(
            "[data-results-count]"
        );


    if (
        countElement
    ) {

        countElement.textContent =
            String(
                cars.length
            );
    }
}


/* =========================================================
   29. ALL CARS PAGE
   ========================================================= */

function setupAllCarsPage() {

    const container =
        document.querySelector(
            "[data-all-cars-container]"
        );


    if (!container) {

        return;
    }


    renderCars(
        getCarDatabase(),
        container
    );
}


/* =========================================================
   30. BRAND PAGE / BRAND FILTER
   ========================================================= */

function setupBrandFilter() {

    const brandSelect =
        document.querySelector(
            "[data-brand-filter]"
        );


    const container =
        document.querySelector(
            "[data-brand-cars]"
        );


    if (
        !brandSelect ||
        !container
    ) {

        return;
    }


    function update() {

        const cars =
            filterCarsByBrand(
                brandSelect.value
            );


        renderCars(
            cars,
            container
        );
    }


    brandSelect.addEventListener(
        "change",
        update
    );


    update();
}


/* =========================================================
   31. LIVE CAR SEARCH
   ========================================================= */

function setupCarSearch() {

    const input =
        document.querySelector(
            "[data-car-search]"
        );


    const container =
        document.querySelector(
            "[data-search-results]"
        );


    if (
        !input ||
        !container
    ) {

        return;
    }


    input.addEventListener(
        "input",
        function () {

            const results =
                searchCars(
                    input.value
                );


            renderCars(
                results,
                container
            );
        }
    );
}


/* =========================================================
   32. CAR DETAIL PAGE
   ========================================================= */

function setupCarDetailPage() {

    const detailContainer =
        document.querySelector(
            "[data-car-detail]"
        );


    if (!detailContainer) {

        return;
    }


    const id =
        getCarIdFromURL();


    const car =
        findCarById(
            id
        );


    if (!car) {

        detailContainer.innerHTML = `

            <div class="empty-state">

                <h2>Car not found</h2>

                <p>
                    The requested car could
                    not be found in the
                    GadiFinder database.
                </p>

                <a
                    href="all-cars.html"
                    class="btn"
                >
                    View All Cars
                </a>

            </div>
        `;

        return;
    }


    renderCarDetail(
        car,
        detailContainer
    );
}


/* =========================================================
   33. RENDER CAR DETAIL
   ========================================================= */

function renderCarDetail(
    car,
    container
) {

    const mainImage =
        getCarImage(
            car
        );


    const images =
        Array.isArray(
            car.images
        )
        ?
        car.images
        :
        [];


    const variants =
        Array.isArray(
            car.variants
        )
        ?
        car.variants
        :
        [];


    const specifications =
        car.specifications ||
        car.specs ||
        {};


    const features =
        Array.isArray(
            car.features
        )
        ?
        car.features
        :
        [];


    container.innerHTML = `

        <div class="car-detail-wrapper">


            <!-- =========================
                 IMAGE AREA
                 ========================= -->

            <section
                class="car-detail-gallery"
            >

                <div
                    class="car-main-image"
                    data-main-car-image
                >

                    ${
                        mainImage
                        ?
                        `
                        <img
                            src="${escapeHTML(
                                mainImage
                            )}"
                            alt="${escapeHTML(
                                car.brand +
                                " " +
                                (
                                    car.name ||
                                    car.model ||
                                    ""
                                )
                            )}"
                        >
                        `
                        :
                        `
                        <div
                            class="car-image-placeholder"
                        >
                            Car Image
                        </div>
                        `
                    }

                </div>


                <div
                    class="car-thumbnail-grid"
                >

                    ${
                        images
                            .slice(0, 6)
                            .map(
                                function (
                                    image,
                                    index
                                ) {

                                    return `

                                    <button
                                        type="button"
                                        class="car-thumbnail ${
                                            index === 0
                                            ? "active"
                                            : ""
                                        }"
                                        data-gallery-image="${escapeHTML(
                                            image
                                        )}"
                                    >

                                        <img
                                            src="${escapeHTML(
                                                image
                                            )}"
                                            alt="${escapeHTML(
                                                car.name ||
                                                car.model ||
                                                "Car"
                                            )} image ${
                                                index + 1
                                            }"
                                        >

                                    </button>

                                    `;
                                }
                            )
                            .join("")
                    }

                </div>

            </section>


            <!-- =========================
                 BASIC CAR INFORMATION
                 ========================= -->

            <section
                class="car-detail-information"
            >

                <div
                    class="car-detail-brand"
                >
                    ${escapeHTML(
                        car.brand || ""
                    )}
                </div>


                <h1>
                    ${escapeHTML(
                        car.name ||
                        car.model ||
                        "Car"
                    )}
                </h1>


                ${
                    car.tagline
                    ?
                    `
                    <p class="car-tagline">
                        ${escapeHTML(
                            car.tagline
                        )}
                    </p>
                    `
                    :
                    ""
                }


                ${
                    car.startingPrice ||
                    car.price ||
                    car.exShowroomPrice
                    ?
                    `
                    <div
                        class="car-detail-price"
                    >

                        ${
                            car.startingPrice ||
                            car.price ||
                            car.exShowroomPrice ||
                            ""
                        }

                    </div>
                    `
                    :
                    ""
                }


                <div
                    class="car-quick-specs"
                >

                    ${
                        car.fuel ||
                        car.fuelType
                        ?
                        `
                        <div>
                            <strong>Fuel</strong>
                            <span>
                                ${escapeHTML(
                                    car.fuel ||
                                    car.fuelType
                                )}
                            </span>
                        </div>
                        `
                        :
                        ""
                    }


                    ${
                        car.transmission
                        ?
                        `
                        <div>
                            <strong>
                                Transmission
                            </strong>

                            <span>
                                ${escapeHTML(
                                    car.transmission
                                )}
                            </span>
                        </div>
                        `
                        :
                        ""
                    }


                    ${
                        car.seats
                        ?
                        `
                        <div>
                            <strong>
                                Seating
                            </strong>

                            <span>
                                ${escapeHTML(
                                    String(
                                        car.seats
                                    )
                                )} Seats
                            </span>
                        </div>
                        `
                        :
                        ""
                    }


                    ${
                        car.mileage
                        ?
                        `
                        <div>
                            <strong>
                                Mileage
                            </strong>

                            <span>
                                ${escapeHTML(
                                    String(
                                        car.mileage
                                    )
                                )}
                            </span>
                        </div>
                        `
                        :
                        ""
                    }

                </div>


                <button
                    type="button"
                    class="btn btn-primary"
                    data-emi-car="${escapeHTML(
                        String(
                            car.id || ""
                        )
                    )}"
                >
                    Calculate EMI
                </button>

            </section>


            <!-- =========================
                 OVERVIEW
                 ========================= -->

            <section
                class="car-information-section"
            >

                <h2>
                    ${escapeHTML(
                        car.name ||
                        car.model ||
                        "Car"
                    )} Overview
                </h2>


                ${
                    car.description
                    ?
                    `
                    <p class="car-description">
                        ${escapeHTML(
                            car.description
                        )}
                    </p>
                    `
                    :
                    `
                    <p>
                        Detailed vehicle
                        information will be
                        displayed here from
                        the GadiFinder database.
                    </p>
                    `
                }

            </section>


            <!-- =========================
                 VARIANTS
                 ========================= -->

            <section
                class="car-information-section"
            >

                <h2>
                    Variants & Prices
                </h2>


                <div
                    class="variant-list"
                >

                    ${
                        variants.length
                        ?
                        variants
                            .map(
                                function (
                                    variant
                                ) {

                                    return createVariantHTML(
                                        variant
                                    );

                                }
                            )
                            .join("")
                        :
                        `
                        <div class="empty-state">
                            Variant information
                            will appear here.
                        </div>
                        `
                    }

                </div>

            </section>


            <!-- =========================
                 FEATURES
                 ========================= -->

            <section
                class="car-information-section"
            >

                <h2>
                    Key Features
                </h2>


                ${
                    features.length
                    ?
                    `
                    <ul class="feature-list">

                        ${
                            features
                                .map(
                                    function (
                                        feature
                                    ) {

                                        return `
                                        <li>
                                            ${escapeHTML(
                                                String(
                                                    feature
                                                )
                                            )}
                                        </li>
                                        `;

                                    }
                                )
                                .join("")
                        }

                    </ul>
                    `
                    :
                    ""
                }

            </section>


            <!-- =========================
                 SPECIFICATIONS
                 ========================= -->

            <section
                class="car-information-section"
            >

                <h2>
                    Specifications
                </h2>


                <div
                    class="specification-grid"
                >

                    ${
                        createSpecificationsHTML(
                            specifications
                        )
                    }

                </div>

            </section>


            <!-- =========================
                 EMI
                 ========================= -->

            <section
                class="car-information-section"
                id="car-emi"
            >

                <h2>
                    Car EMI Calculator
                </h2>


                <div
                    class="emi-calculator"
                    data-emi-calculator
                >

                    <label>
                        Ex-showroom / Loan Value
                    </label>

                    <input
                        type="number"
                        data-emi-price
                        value="${escapeHTML(
                            String(
                                numberValue(
                                    car.loanAmount ||
                                    car.exShowroomPrice ||
                                    car.price ||
                                    ""
                                ) || ""
                            )
                        )}"
                        placeholder="Enter amount"
                    >


                    <label>
                        Down Payment
                    </label>

                    <input
                        type="number"
                        data-emi-downpayment
                        placeholder="Enter down payment"
                    >


                    <label>
                        Interest Rate (%)
                    </label>

                    <input
                        type="number"
                        data-emi-rate
                        value="9"
                        step="0.1"
                    >


                    <label>
                        Loan Tenure (Years)
                    </label>

                    <input
                        type="number"
                        data-emi-years
                        value="5"
                        min="1"
                        max="10"
                    >


                    <button
                        type="button"
                        class="btn btn-primary"
                        data-calculate-emi
                    >
                        Calculate EMI
                    </button>


                    <div
                        class="emi-result"
                        data-emi-result
                    >
                    </div>

                </div>

            </section>

        </div>
    `;


    setupGallery();


    setupEMICalculator();
}


/* =========================================================
   34. VARIANT HTML
   ========================================================= */

function createVariantHTML(
    variant
) {

    if (
        typeof variant === "string"
    ) {

        return `

            <div class="variant-card">

                <h3>
                    ${escapeHTML(
                        variant
                    )}
                </h3>

            </div>
        `;
    }


    const name =
        variant.name ||
        variant.variant ||
        "Variant";


    const price =
        variant.price ||
        variant.exShowroomPrice ||
        variant.ex_showroom_price ||
        "Price unavailable";


    const variantFeatures =
        Array.isArray(
            variant.features
        )
        ?
        variant.features
        :
        [];


    return `

        <article
            class="variant-card"
        >

            <div
                class="variant-header"
            >

                <h3>
                    ${escapeHTML(
                        name
                    )}
                </h3>

                <strong>
                    ${escapeHTML(
                        String(
                            price
                        )
                    )}
                </strong>

            </div>


            ${
                variant.engine
                ?
                `
                <p>
                    <strong>
                        Engine:
                    </strong>

                    ${escapeHTML(
                        String(
                            variant.engine
                        )
                    )}
                </p>
                `
                :
                ""
            }


            ${
                variant.transmission
                ?
                `
                <p>
                    <strong>
                        Transmission:
                    </strong>

                    ${escapeHTML(
                        String(
                            variant.transmission
                        )
                    )}
                </p>
                `
                :
                ""
            }


            ${
                variant.fuel
                ?
                `
                <p>
                    <strong>
                        Fuel:
                    </strong>

                    ${escapeHTML(
                        String(
                            variant.fuel
                        )
                    )}
                </p>
                `
                :
                ""
            }


            ${
                variantFeatures.length
                ?
                `
                <div>

                    <strong>
                        Key Features
                    </strong>

                    <ul>

                        ${
                            variantFeatures
                                .map(
                                    function (
                                        feature
                                    ) {

                                        return `
                                        <li>
                                            ${escapeHTML(
                                                String(
                                                    feature
                                                )
                                            )}
                                        </li>
                                        `;

                                    }
                                )
                                .join("")
                        }

                    </ul>

                </div>
                `
                :
                ""
            }

        </article>
    `;
}


/* =========================================================
   35. SPECIFICATIONS HTML
   ========================================================= */

function createSpecificationsHTML(
    specifications
) {

    if (
        !specifications ||
        typeof specifications !==
        "object"
    ) {

        return `
            <div class="empty-state">
                Specifications will
                appear here.
            </div>
        `;
    }


    const entries =
        Object.entries(
            specifications
        );


    if (
        entries.length === 0
    ) {

        return `
            <div class="empty-state">
                Specifications will
                appear here.
            </div>
        `;
    }


    return entries
        .map(
            function (
                [
                    key,
                    value
                ]
            ) {

                return `

                    <div
                        class="specification-item"
                    >

                        <strong>
                            ${escapeHTML(
                                formatLabel(
                                    key
                                )
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                formatSpecificationValue(
                                    value
                                )
                            )}
                        </span>

                    </div>

                `;
            }
        )
        .join("");
}


/* =========================================================
   36. FORMAT LABEL
   ========================================================= */

function formatLabel(
    value
) {

    return String(
        value
    )
    .replace(
        /([A-Z])/g,
        " $1"
    )
    .replace(
        /[_-]/g,
        " "
    )
    .replace(
        /\s+/g,
        " "
    )
    .trim()
    .replace(
        /^./,
        function (letter) {

            return letter.toUpperCase();

        }
    );
}


/* =========================================================
   37. FORMAT SPECIFICATION VALUE
   ========================================================= */

function formatSpecificationValue(
    value
) {

    if (
        Array.isArray(value)
    ) {

        return value.join(
            ", "
        );
    }


    if (
        typeof value === "object" &&
        value !== null
    ) {

        return Object.entries(
            value
        )
        .map(
            function (
                [
                    key,
                    val
                ]
            ) {

                return (
                    formatLabel(
                        key
                    ) +
                    ": " +
                    val
                );
            }
        )
        .join(
            " • "
        );
    }


    return String(
        value
    );
}


/* =========================================================
   38. IMAGE GALLERY
   ========================================================= */

function setupGallery() {

    const mainImage =
        document.querySelector(
            "[data-main-car-image] img"
        );


    if (!mainImage) {

        return;
    }


    document
        .querySelectorAll(
            "[data-gallery-image]"
        )
        .forEach(
            function (thumbnail) {

                thumbnail.addEventListener(
                    "click",
                    function () {

                        const image =
                            thumbnail.getAttribute(
                                "data-gallery-image"
                            );


                        if (!image) return;


                        mainImage.src =
                            image;


                        document
                            .querySelectorAll(
                                "[data-gallery-image]"
                            )
                            .forEach(
                                function (
                                    item
                                ) {

                                    item.classList.remove(
                                        "active"
                                    );
                                }
                            );


                        thumbnail.classList.add(
                            "active"
                        );
                    }
                );
            }
        );
}


/* =========================================================
   39. EMI CALCULATOR
   ========================================================= */

function calculateEMI(
    principal,
    annualRate,
    years
) {

    const P =
        Number(
            principal
        );


    const annual =
        Number(
            annualRate
        );


    const n =
        Number(
            years
        ) * 12;


    if (
        !Number.isFinite(P) ||
        !Number.isFinite(annual) ||
        !Number.isFinite(n) ||
        P <= 0 ||
        n <= 0
    ) {

        return null;
    }


    const monthlyRate =
        annual / 12 / 100;


    if (
        monthlyRate === 0
    ) {

        return P / n;
    }


    const emi =
        P *
        monthlyRate *
        Math.pow(
            1 + monthlyRate,
            n
        ) /
        (
            Math.pow(
                1 + monthlyRate,
                n
            ) - 1
        );


    return emi;
}


/* =========================================================
   40. FORMAT INDIAN CURRENCY
   ========================================================= */

function formatINR(
    amount
) {

    const number =
        Number(
            amount
        );


    if (
        !Number.isFinite(number)
    ) {

        return "₹0";
    }


    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(
        number
    );
}


/* =========================================================
   41. CAR EMI CALCULATOR SETUP
   ========================================================= */

function setupEMICalculator() {

    const calculator =
        document.querySelector(
            "[data-emi-calculator]"
        );


    if (!calculator) {

        return;
    }


    const priceInput =
        calculator.querySelector(
            "[data-emi-price]"
        );


    const downPaymentInput =
        calculator.querySelector(
            "[data-emi-downpayment]"
        );


    const rateInput =
        calculator.querySelector(
            "[data-emi-rate]"
        );


    const yearsInput =
        calculator.querySelector(
            "[data-emi-years]"
        );


    const button =
        calculator.querySelector(
            "[data-calculate-emi]"
        );


    const result =
        calculator.querySelector(
            "[data-emi-result]"
        );


    if (
        !priceInput ||
        !downPaymentInput ||
        !rateInput ||
        !yearsInput ||
        !button ||
        !result
    ) {

        return;
    }


    /*
       Minimum down payment can be
       specified in the car database.

       Supported:

       minimumDownPayment

       minDownPayment

       downPayment

       minimum_down_payment
    */

    const carId =
        getCarIdFromURL();


    const car =
        findCarById(
            carId
        );


    if (car) {

        const minimum =
            car.minimumDownPayment ||
            car.minDownPayment ||
            car.minimum_down_payment;


        if (
            minimum !== undefined &&
            minimum !== null
        ) {

            const numericMinimum =
                numberValue(
                    minimum
                );


            if (
                numericMinimum !== null
            ) {

                downPaymentInput.min =
                    numericMinimum;


                downPaymentInput.placeholder =
                    "Minimum ₹" +
                    numericMinimum
                        .toLocaleString(
                            "en-IN"
                        );
            }
        }
    }


    button.addEventListener(
        "click",
        function () {

            const price =
                numberValue(
                    priceInput.value
                );


            const down =
                numberValue(
                    downPaymentInput.value
                ) || 0;


            const rate =
                numberValue(
                    rateInput.value
                );


            const years =
                numberValue(
                    yearsInput.value
                );


            if (
                price === null ||
                rate === null ||
                years === null
            ) {

                result.innerHTML = `

                    <div class="emi-error">

                        Please enter valid
                        loan details.

                    </div>

                `;

                return;
            }


            if (
                down < 0
            ) {

                result.innerHTML = `

                    <div class="emi-error">

                        Down payment cannot
                        be negative.

                    </div>

                `;

                return;
            }


            if (
                down >= price
            ) {

                result.innerHTML = `

                    <div class="emi-error">

                        Down payment must be
                        lower than the vehicle
                        amount.

                    </div>

                `;

                return;
            }


            const loanAmount =
                price - down;


            const emi =
                calculateEMI(
                    loanAmount,
                    rate,
                    years
                );


            if (
                emi === null
            ) {

                return;
            }


            const totalPayment =
                emi *
                years *
                12;


            const totalInterest =
                totalPayment -
                loanAmount;


            result.innerHTML = `

                <div
                    class="emi-result-grid"
                >

                    <div>

                        <span>
                            Monthly EMI
                        </span>

                        <strong>
                            ${formatINR(
                                emi
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Loan Amount
                        </span>

                        <strong>
                            ${formatINR(
                                loanAmount
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Total Interest
                        </span>

                        <strong>
                            ${formatINR(
                                totalInterest
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Total Payment
                        </span>

                        <strong>
                            ${formatINR(
                                totalPayment
                            )}
                        </strong>

                    </div>

                </div>

            `;
        }
    );
}


/* =========================================================
   42. EMI BUTTON FROM CAR CARD
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "[data-emi-car]"
            );


        if (!button) return;


        const carId =
            button.getAttribute(
                "data-emi-car"
            );


        if (!carId) return;


        window.location.href =
            "car-detail.html?id=" +
            encodeURIComponent(
                carId
            ) +
            "#car-emi";
    }
);


/* =========================================================
   43. COMPARE SYSTEM
   ========================================================= */

const COMPARE_STORAGE_KEY =
    "gadifinder_compare_cars";


function getCompareCars() {

    return getData(
        COMPARE_STORAGE_KEY,
        []
    );
}


function addToCompare(
    carId
) {

    if (!carId) return;


    const current =
        getCompareCars();


    if (
        current.includes(
            carId
        )
    ) {

        return;
    }


    if (
        current.length >= 3
    ) {

        alert(
            "You can compare up to 3 cars at a time."
        );

        return;
    }


    current.push(
        carId
    );


    saveData(
        COMPARE_STORAGE_KEY,
        current
    );


    updateCompareCounter();


    alert(
        "Car added to comparison."
    );
}


function removeFromCompare(
    carId
) {

    const current =
        getCompareCars()
            .filter(
                function (
                    id
                ) {

                    return id !== carId;

                }
            );


    saveData(
        COMPARE_STORAGE_KEY,
        current
    );


    updateCompareCounter();


    setupComparePage();
}


function clearCompare() {

    saveData(
        COMPARE_STORAGE_KEY,
        []
    );


    updateCompareCounter();


    setupComparePage();
}


function updateCompareCounter() {

    const count =
        getCompareCars()
            .length;


    document
        .querySelectorAll(
            "[data-compare-count]"
        )
        .forEach(
            function (
                element
            ) {

                element.textContent =
                    String(
                        count
                    );
            }
        );
}


/* =========================================================
   44. COMPARE BUTTON
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "[data-add-compare]"
            );


        if (!button) return;


        addToCompare(
            button.getAttribute(
                "data-add-compare"
            )
        );
    }
);


/* =========================================================
   45. COMPARE PAGE
   ========================================================= */

function setupComparePage() {

    const container =
        document.querySelector(
            "[data-compare-container]"
        );


    if (!container) {

        return;
    }


    const ids =
        getCompareCars();


    const cars =
        ids
            .map(
                function (
                    id
                ) {

                    return findCarById(
                        id
                    );
                }
            )
            .filter(Boolean);


    if (
        cars.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>
                    No cars selected
                </h2>

                <p>
                    Add cars from the
                    All Cars or Find Cars
                    pages to compare them.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML = `

        <div class="compare-table-wrapper">

            <table
                class="compare-table"
            >

                <thead>

                    <tr>

                        <th>
                            Specification
                        </th>

                        ${
                            cars
                                .map(
                                    function (
                                        car
                                    ) {

                                        return `

                                        <th>

                                            <div
                                                class="compare-car-heading"
                                            >

                                                <strong>
                                                    ${escapeHTML(
                                                        car.name ||
                                                        car.model ||
                                                        ""
                                                    )}
                                                </strong>

                                                <button
                                                    type="button"
                                                    data-remove-compare="${escapeHTML(
                                                        String(
                                                            car.id
                                                        )
                                                    )}"
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                        </th>

                                        `;

                                    }
                                )
                                .join("")
                        }

                    </tr>

                </thead>


                <tbody>

                    ${createCompareRow(
                        "Brand",
                        cars,
                        function(car) {
                            return car.brand || "—";
                        }
                    )}


                    ${createCompareRow(
                        "Price",
                        cars,
                        function(car) {
                            return (
                                car.price ||
                                car.exShowroomPrice ||
                                car.startingPrice ||
                                "—"
                            );
                        }
                    )}


                    ${createCompareRow(
                        "Fuel",
                        cars,
                        function(car) {
                            return (
                                car.fuel ||
                                car.fuelType ||
                                "—"
                            );
                        }
                    )}


                    ${createCompareRow(
                        "Transmission",
                        cars,
                        function(car) {
                            return (
                                car.transmission ||
                                "—"
                            );
                        }
                    )}


                    ${createCompareRow(
                        "Seats",
                        cars,
                        function(car) {
                            return (
                                car.seats ||
                                "—"
                            );
                        }
                    )}


                    ${createCompareRow(
                        "Mileage",
                        cars,
                        function(car) {
                            return (
                                car.mileage ||
                                "—"
                            );
                        }
                    )}

                </tbody>

            </table>

        </div>


        <div
            class="compare-actions"
        >

            <button
                type="button"
                class="btn"
                data-clear-compare
            >
                Clear Comparison
            </button>

        </div>
    `;
}


/* =========================================================
   46. COMPARE ROW
   ========================================================= */

function createCompareRow(
    label,
    cars,
    valueFunction
) {

    return `

        <tr>

            <th>
                ${escapeHTML(
                    label
                )}
            </th>

            ${
                cars
                    .map(
                        function (
                            car
                        ) {

                            return `

                            <td>
                                ${escapeHTML(
                                    String(
                                        valueFunction(
                                            car
                                        )
                                    )
                                )}
                            </td>

                            `;

                        }
                    )
                    .join("")
            }

        </tr>

    `;
}


/* =========================================================
   47. COMPARE REMOVE / CLEAR
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const removeButton =
            event.target.closest(
                "[data-remove-compare]"
            );


        if (
            removeButton
        ) {

            removeFromCompare(
                removeButton.getAttribute(
                    "data-remove-compare"
                )
            );

            return;
        }


        const clearButton =
            event.target.closest(
                "[data-clear-compare]"
            );


        if (
            clearButton
        ) {

            clearCompare();
        }
    }
);


/* =========================================================
   48. CONTACT FORM
   ========================================================= */

function setupContactForm() {

    const form =
        document.querySelector(
            "[data-contact-form]"
        );


    if (!form) {

        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            /*
               The form is prepared to
               open the user's email
               application.

               For true server-side
               Gmail delivery, connect
               this form later to a
               backend/form service.
            */

            event.preventDefault();


            const name =
                getFieldValue(
                    form,
                    [
                        "name",
                        "fullName"
                    ]
                );


            const email =
                getFieldValue(
                    form,
                    [
                        "email"
                    ]
                );


            const subject =
                getFieldValue(
                    form,
                    [
                        "subject"
                    ]
                ) ||
                "GadiFinder Website Query";


            const message =
                getFieldValue(
                    form,
                    [
                        "message",
                        "query",
                        "description"
                    ]
                );


            const body =

                "Name: " +
                name +
                "\n\n" +

                "Email: " +
                email +
                "\n\n" +

                "Message:\n" +
                message;


            const mailto =
                "mailto:" +
                GADIFINDER.contactEmail +
                "?subject=" +
                encodeURIComponent(
                    subject
                ) +
                "&body=" +
                encodeURIComponent(
                    body
                );


            window.location.href =
                mailto;
        }
    );
}


/* =========================================================
   49. PROMOTE FORM
   ========================================================= */

function setupPromoteForm() {

    const form =
        document.querySelector(
            "[data-promote-form]"
        );


    if (!form) {

        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const company =
                getFieldValue(
                    form,
                    [
                        "company",
                        "companyName"
                    ]
                );


            const contact =
                getFieldValue(
                    form,
                    [
                        "email",
                        "contact"
                    ]
                );


            const promotionType =
                getFieldValue(
                    form,
                    [
                        "promotionType",
                        "type"
                    ]
                );


            const message =
                getFieldValue(
                    form,
                    [
                        "message",
                        "query"
                    ]
                );


            const subject =
                "GadiFinder Promotion / Collaboration Enquiry";


            const body =

                "Company / Brand: " +
                company +
                "\n\n" +

                "Contact: " +
                contact +
                "\n\n" +

                "Promotion Type: " +
                promotionType +
                "\n\n" +

                "Message:\n" +
                message;


            window.location.href =
                "mailto:" +
                GADIFINDER.contactEmail +
                "?subject=" +
                encodeURIComponent(
                    subject
                ) +
                "&body=" +
                encodeURIComponent(
                    body
                );
        }
    );
}


/* =========================================================
   50. GENERIC FIELD VALUE
   ========================================================= */

function getFieldValue(
    form,
    names
) {

    for (
        const name of names
    ) {

        const field =
            form.querySelector(
                `[name="${name}"]`
            );


        if (
            field
        ) {

            return (
                field.value ||
                ""
            ).trim();
        }
    }


    return "";
}


/* =========================================================
   51. ADVERTISEMENT PLACEHOLDER
   ========================================================= */

function setupAdvertisementBoxes() {

    document
        .querySelectorAll(
            "[data-ad-space]"
        )
        .forEach(
            function (
                box
            ) {

                /*
                   Intentionally blank.

                   This space can later be
                   used for advertising images,
                   banners or paid promotions.
                */

                box.setAttribute(
                    "aria-label",
                    "Advertisement space"
                );
            }
        );
}


/* =========================================================
   52. INSURANCE / EMI PARTNERS
   ========================================================= */

function setupPartnerSections() {

    /*
       Partner cards remain empty until
       companies actually promote/list
       themselves on GadiFinder.

       This prevents fake companies
       from appearing on the website.
    */

    document
        .querySelectorAll(
            "[data-partner-empty]"
        )
        .forEach(
            function (
                section
            ) {

                section.classList.add(
                    "partner-empty"
                );
            }
        );
}


/* =========================================================
   53. NUMBER INPUT — KEYBOARD FRIENDLY
   ========================================================= */

function setupNumericInputs() {

    document
        .querySelectorAll(
            'input[type="number"]'
        )
        .forEach(
            function (
                input
            ) {

                input.addEventListener(
                    "keydown",
                    function (
                        event
                    ) {

                        /*
                           Allow:

                           numbers
                           decimal
                           backspace
                           delete
                           arrows
                           tab
                           enter
                           home/end
                           Ctrl/Cmd + A/C/V/X
                        */

                        const allowedKeys = [

                            "Backspace",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                            "ArrowUp",
                            "ArrowDown",
                            "Tab",
                            "Enter",
                            "Home",
                            "End",
                            "."
                        ];


                        if (
                            allowedKeys.includes(
                                event.key
                            )
                        ) {

                            return;
                        }


                        if (
                            event.ctrlKey ||
                            event.metaKey
                        ) {

                            return;
                        }


                        if (
                            !/^[0-9]$/.test(
                                event.key
                            )
                        ) {

                            event.preventDefault();
                        }
                    }
                );
            }
        );
}


/* =========================================================
   54. SCROLL REVEAL
   ========================================================= */

function setupScrollReveal() {

    const elements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (
        elements.length === 0
    ) {

        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            function (
                element
            ) {

                element.classList.add(
                    "revealed"
                );
            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            function (
                entries
            ) {

                entries.forEach(
                    function (
                        entry
                    ) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    }
                );
            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        function (
            element
        ) {

            observer.observe(
                element
            );
        }
    );
}


/* =========================================================
   55. FOUNDER CURVE EFFECT
   ========================================================= */

function setupFounderCurve() {

    const section =
        document.querySelector(
            "[data-founder-section]"
        );


    if (!section) {

        return;
    }


    function updateCurve() {

        const rect =
            section.getBoundingClientRect();


        if (
            rect.top <
            window.innerHeight &&
            rect.bottom > 0
        ) {

            const progress =
                Math.min(
                    1,
                    Math.max(
                        0,
                        (
                            window.innerHeight -
                            rect.top
                        ) /
                        window.innerHeight
                    )
                );


            section.style.setProperty(
                "--curve-progress",
                progress
            );
        }
    }


    window.addEventListener(
        "scroll",
        updateCurve,
        {
            passive: true
        }
    );


    updateCurve();
}


/* =========================================================
   56. BACK TO TOP
   ========================================================= */

function setupBackToTop() {

    const button =
        document.querySelector(
            "[data-back-to-top]"
        );


    if (!button) {

        return;
    }


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY >
                500
            ) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );
            }
        },
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        function () {

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth"
                }
            );
        }
    );
}


/* =========================================================
   57. ENTER KEY SEARCH
   ========================================================= */

function setupSearchEnter() {

    document
        .querySelectorAll(
            "[data-search-input]"
        )
        .forEach(
            function (
                input
            ) {

                input.addEventListener(
                    "keydown",
                    function (
                        event
                    ) {

                        if (
                            event.key !==
                            "Enter"
                        ) {

                            return;
                        }


                        event.preventDefault();


                        const query =
                            input.value
                                .trim();


                        if (!query) {

                            return;
                        }


                        saveData(
                            "gadifinder_search",
                            query
                        );


                        window.location.href =
                            "car-results.html";
                    }
                );
            }
        );
}


/* =========================================================
   58. LOAD SAVED SEARCH
   ========================================================= */

function loadSavedSearch() {

    const query =
        getData(
            "gadifinder_search",
            ""
        );


    document
        .querySelectorAll(
            "[data-search-input]"
        )
        .forEach(
            function (
                input
            ) {

                if (
                    query
                ) {

                    input.value =
                        query;
                }
            }
        );
}


/* =========================================================
   59. RESET FILTERS
   ========================================================= */

function setupFilterReset() {

    document
        .querySelectorAll(
            "[data-reset-filters]"
        )
        .forEach(
            function (
                button
            ) {

                button.addEventListener(
                    "click",
                    function () {

                        saveData(
                            "gadifinder_filters",
                            {}
                        );


                        const form =
                            document.querySelector(
                                "[data-find-car-form]"
                            );


                        if (
                            form
                        ) {

                            form.reset();
                        }
                    }
                );
            }
        );
}


/* =========================================================
   60. BRAND BUTTONS
   ========================================================= */

function setupBrandButtons() {

    document
        .querySelectorAll(
            "[data-brand]"
        )
        .forEach(
            function (
                button
            ) {

                button.addEventListener(
                    "click",
                    function () {

                        const brand =
                            button.getAttribute(
                                "data-brand"
                            );


                        if (
                            !brand
                        ) return;


                        saveData(
                            "gadifinder_selected_brand",
                            brand
                        );


                        window.location.href =
                            "all-cars.html?brand=" +
                            encodeURIComponent(
                                brand
                            );
                    }
                );
            }
        );
}


/* =========================================================
   61. READ BRAND FROM URL
   ========================================================= */

function getBrandFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return (
        params.get(
            "brand"
        ) || ""
    );
}


/* =========================================================
   62. ALL CARS BRAND URL FILTER
   ========================================================= */

function setupURLBrandFilter() {

    const container =
        document.querySelector(
            "[data-all-cars-container]"
        );


    if (!container) {

        return;
    }


    const brand =
        getBrandFromURL();


    if (!brand) {

        return;
    }


    const cars =
        filterCarsByBrand(
            getCarDatabase(),
            brand
        );


    renderCars(
        cars,
        container
    );


    const title =
        document.querySelector(
            "[data-brand-title]"
        );


    if (
        title
    ) {

        title.textContent =
            brand;
    }
}


/* =========================================================
   63. FOOTER YEAR
   ========================================================= */

function setCurrentYear() {

    const year =
        new Date()
            .getFullYear();


    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(
            function (
                element
            ) {

                element.textContent =
                    String(
                        year
                    );
            }
        );
}


/* =========================================================
   64. HTML ESCAPE
   ========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );
}


/* =========================================================
   65. SMOOTH ANCHOR LINKS
   ========================================================= */

function setupSmoothLinks() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            function (
                link
            ) {

                link.addEventListener(
                    "click",
                    function (
                        event
                    ) {

                        const id =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !id ||
                            id === "#"
                        ) {

                            return;
                        }


                        const target =
                            document.querySelector(
                                id
                            );


                        if (
                            !target
                        ) {

                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView(
                            {
                                behavior:
                                    "smooth",
                                block:
                                    "start"
                            }
                        );
                    }
                );
            }
        );
}


/* =========================================================
   66. LOADING STATE
   ========================================================= */

function removePageLoading() {

    document.body.classList.add(
        "page-loaded"
    );


    document.body.classList.remove(
        "page-loading"
    );
}


/* =========================================================
   67. INITIALIZE EVERYTHING
   ========================================================= */

function initializeGadiFinder() {

    try {

        setupMobileMenu();

        setActiveNavigation();

        setupImageFallbacks();

        setupFindCarForm();

        setupResultsPage();

        setupAllCarsPage();

        setupBrandFilter();

        setupURLBrandFilter();

        setupCarSearch();

        setupCarDetailPage();

        setupContactForm();

        setupPromoteForm();

        setupAdvertisementBoxes();

        setupPartnerSections();

        setupNumericInputs();

        setupScrollReveal();

        setupFounderCurve();

        setupBackToTop();

        setupSearchEnter();

        loadSavedSearch();

        setupFilterReset();

        setupBrandButtons();

        updateCompareCounter();

        setupComparePage();

        setCurrentYear();

        setupSmoothLinks();

        removePageLoading();

    } catch (error) {

        console.error(
            "GadiFinder initialization error:",
            error
        );

        removePageLoading();
    }
}


/* =========================================================
   68. START WEBSITE
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeGadiFinder
    );

} else {

    initializeGadiFinder();
}


/* =========================================================
   END OF PART 11
   ========================================================= */
