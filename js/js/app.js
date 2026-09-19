/* ============================================================
   GADI FINDER
   MAIN WEBSITE JAVASCRIPT
   ============================================================ */


/* ============================================================
   DATABASE SAFETY
   ============================================================ */

const cars =
    Array.isArray(window.carDatabase)
        ? window.carDatabase
        : [];


/* ============================================================
   HELPERS
   ============================================================ */

function money(value) {

    if (
        value === undefined ||
        value === null ||
        value === "" ||
        Number.isNaN(Number(value))
    ) {

        return "Price unavailable";

    }

    return "₹" +
        Number(value).toLocaleString(
            "en-IN"
        );

}


function slug(value) {

    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(
            /[^a-z0-9]+/g,
            "-"
        )
        .replace(
            /^-+|-+$/g,
            ""
        );

}


function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function getCarId() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get("id");

}


function getBrand() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get("brand");

}


function findCar(id) {

    return cars.find(
        car =>
            String(car.id) === String(id)
    );

}


/* ============================================================
   CAR IMAGE
   ============================================================ */

function carImage(car) {

    if (
        car &&
        car.imageCard
    ) {

        return `
            <img
                src="${escapeHTML(car.imageCard)}"
                alt="${escapeHTML(
                    car.brand + " " + car.model
                )}"
                loading="lazy"
            >
        `;

    }

    return `
        <div class="image-placeholder">

            CAR IMAGE

            <small>
                IMAGE LOCATION NOT ADDED
            </small>

        </div>
    `;

}


/* ============================================================
   CAR CARD
   ============================================================ */

function createCarCard(car) {

    const title =
        [
            car.brand,
            car.model
        ]
        .filter(Boolean)
        .join(" ");


    const subtitle =
        car.variant ||
        "";


    return `

        <article class="car-card">


            <div class="car-card-image">

                ${carImage(car)}

            </div>


            <div class="car-card-content">


                <h3>
                    ${escapeHTML(title)}
                </h3>


                <p>
                    ${escapeHTML(subtitle)}
                </p>


                <div class="car-price">

                    ${money(car.price)}

                </div>


                <p>

                    ${escapeHTML(
                        car.fuel || "—"
                    )}

                    ·

                    ${escapeHTML(
                        car.transmission || "—"
                    )}

                    ·

                    ${escapeHTML(
                        car.seats || "—"
                    )}
                    seats

                </p>


                <div class="car-actions">

                    <a
                        href="car-profile.html?id=${encodeURIComponent(car.id)}"
                        class="btn btn-primary"
                    >
                        View Car
                    </a>


                    <button
                        type="button"
                        class="btn btn-outline"
                        onclick="addToCompare('${escapeHTML(car.id)}')"
                    >
                        Compare
                    </button>

                </div>


            </div>


        </article>

    `;

}


/* ============================================================
   HOME FEATURE CARDS
   ============================================================ */

function renderHomeFeatures() {

    const container =
        document.getElementById(
            "homeFeatures"
        );

    if (!container) return;


    const features = [

        {
            title:
                "Find Cars",

            text:
                "Choose your preferences and GadiFinder will filter the catalogue before showing matching cars.",

            link:
                "find-cars.html",

            icon:
                "⌕"
        },


        {
            title:
                "All Cars",

            text:
                "Browse the GadiFinder Indian-market catalogue by brand and model.",

            link:
                "all-cars.html",

            icon:
                "▦"
        },


        {
            title:
                "Compare Cars",

            text:
                "Select up to four vehicles and compare their important specifications.",

            link:
                "compare.html",

            icon:
                "⇄"
        },


        {
            title:
                "Promote with GadiFinder",

            text:
                "GadiFinder can provide a dedicated space for automotive advertising, promotions, collaborations and business opportunities.",

            link:
                "promote.html",

            icon:
                "★"
        },


        {
            title:
                "Insurance",

            text:
                "Insurance partner area. Company listings can be added here when insurance companies approach GadiFinder.",

            link:
                "insurance.html",

            icon:
                "◈"
        },


        {
            title:
                "EMI & Finance",

            text:
                "Calculate an estimated monthly EMI or explore finance-partner space.",

            link:
                "finance.html",

            icon:
                "₹"
        },


        {
            title:
                "Contact",

            text:
                "For questions, advertising, promotions, collaborations, creator collaborations and business enquiries, contact GadiFinder.",

            link:
                "contact.html",

            icon:
                "✉"
        }

    ];


    container.innerHTML =
        features.map(
            (item, index) => `

                <a
                    href="${item.link}"
                    class="feature-card"
                >

                    <div class="feature-number">
                        ${String(index + 1).padStart(2, "0")}
                    </div>

                    <div class="feature-icon">
                        ${item.icon}
                    </div>

                    <h3>
                        ${item.title}
                    </h3>

                    <p>
                        ${item.text}
                    </p>

                </a>

            `
        ).join("");

}


/* ============================================================
   ALL BRANDS
   ============================================================ */

function getUniqueBrands() {

    return [
        ...new Set(
            cars
                .map(car => car.brand)
                .filter(Boolean)
        )
    ].sort();

}


function renderBrands() {

    const grid =
        document.getElementById(
            "brandGrid"
        );

    if (!grid) return;


    const brands =
        getUniqueBrands();


    grid.innerHTML =
        brands.map(
            brand => {

                const count =
                    cars.filter(
                        car =>
                            car.brand === brand
                    ).length;


                return `

                    <a
                        class="brand-card"
                        href="brand.html?brand=${encodeURIComponent(brand)}"
                    >

                        <h3>
                            ${escapeHTML(brand)}
                        </h3>

                        <p>
                            ${count} catalogue record${count === 1 ? "" : "s"}
                        </p>

                        <br>

                        <span class="btn btn-outline">
                            View Cars →
                        </span>

                    </a>

                `;

            }
        ).join("");

}


/* ============================================================
   BRAND PAGE
   ============================================================ */

function renderBrandPage() {

    const title =
        document.getElementById(
            "brandTitle"
        );

    const text =
        document.getElementById(
            "brandText"
        );

    const grid =
        document.getElementById(
            "modelGrid"
        );


    if (!title || !grid) return;


    const brand =
        getBrand();


    if (!brand) {

        title.textContent =
            "Brand not selected";

        text.textContent =
            "Return to All Cars and select a brand.";

        return;

    }


    const brandCars =
        cars.filter(
            car =>
                String(car.brand).toLowerCase() ===
                String(brand).toLowerCase()
        );


    title.textContent =
        brand;


    text.textContent =
        `Browse ${brand} cars available in the GadiFinder catalogue.`;


    const models = [];


    brandCars.forEach(
        car => {

            const exists =
                models.some(
                    item =>
                        item.model === car.model
                );


            if (!exists) {

                models.push({
                    model: car.model,
                    car
                });

            }

        }
    );


    grid.innerHTML =
        models.map(
            item =>
                createCarCard(
                    item.car
                )
        ).join("");

}


/* ============================================================
   FIND CAR — BRANDS
   ============================================================ */

function populateFindBrands() {

    const select =
        document.getElementById(
            "filterBrand"
        );

    if (!select) return;


    const brands =
        getUniqueBrands();


    brands.forEach(
        brand => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                brand;

            option.textContent =
                brand;

            select.appendChild(
                option
            );

        }
    );


    select.addEventListener(
        "change",
        populateFindModels
    );

}


function populateFindModels() {

    const brandSelect =
        document.getElementById(
            "filterBrand"
        );

    const modelSelect =
        document.getElementById(
            "filterModel"
        );


    if (
        !brandSelect ||
        !modelSelect
    ) return;


    const brand =
        brandSelect.value;


    modelSelect.innerHTML =
        `<option value="">
            Any model
        </option>`;


    if (!brand) return;


    const models =
        [
            ...new Set(
                cars
                    .filter(
                        car =>
                            car.brand === brand
                    )
                    .map(
                        car =>
                            car.model
                    )
                    .filter(Boolean)
            )
        ]
        .sort();


    models.forEach(
        model => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                model;

            option.textContent =
                model;

            modelSelect.appendChild(
                option
            );

        }
    );

}


/* ============================================================
   FIND CAR FORM
   ============================================================ */

function setupFindForm() {

    const form =
        document.getElementById(
            "findForm"
        );


    if (!form) return;


    populateFindBrands();


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const data =
                new FormData(form);


            const filters = {

                budget:
                    data.get("budget"),

                brand:
                    data.get("brand"),

                model:
                    data.get("model"),

                body:
                    data.get("body"),

                transmission:
                    data.get("transmission"),

                fuel:
                    data.get("fuel"),

                seats:
                    data.get("seats")

            };


            sessionStorage.setItem(
                "gadiFinderFilters",
                JSON.stringify(filters)
            );


            window.location.href =
                "find-results.html";

        }
    );


    const reset =
        document.getElementById(
            "resetFind"
        );


    if (reset) {

        reset.addEventListener(
            "click",
            () => {

                form.reset();

                populateFindModels();

                sessionStorage.removeItem(
                    "gadiFinderFilters"
                );

            }
        );

    }

}


/* ============================================================
   FILTER MATCHING
   ============================================================ */

function filterCars(filters) {

    return cars.filter(
        car => {

            if (
                filters.budget &&
                Number(car.price) >
                Number(filters.budget)
            ) {

                return false;

            }


            if (
                filters.brand &&
                car.brand !==
                filters.brand
            ) {

                return false;

            }


            if (
                filters.model &&
                car.model !==
                filters.model
            ) {

                return false;

            }


            if (
                filters.body &&
                car.bodyType !==
                filters.body
            ) {

                return false;

            }


            if (
                filters.transmission &&
                car.transmission !==
                filters.transmission
            ) {

                return false;

            }


            if (
                filters.fuel &&
                car.fuel !==
                filters.fuel
            ) {

                return false;

            }


            if (
                filters.seats &&
                String(car.seats) !==
                String(filters.seats)
            ) {

                return false;

            }


            return true;

        }
    );

}


/* ============================================================
   FIND RESULTS
   ============================================================ */

function renderResults() {

    const grid =
        document.getElementById(
            "resultGrid"
        );


    if (!grid) return;


    const summary =
        document.getElementById(
            "resultSummary"
        );


    const stored =
        sessionStorage.getItem(
            "gadiFinderFilters"
        );


    const filters =
        stored
            ? JSON.parse(stored)
            : {};


    const matches =
        filterCars(filters);


    if (summary) {

        summary.textContent =
            `${matches.length} matching car${matches.length === 1 ? "" : "s"} found.`;

    }


    if (!matches.length) {

        grid.innerHTML = `

            <div class="panel">

                <h2>
                    No matching cars found
                </h2>

                <p class="muted">

                    Try changing your budget,
                    fuel, body type, transmission
                    or other preferences.

                </p>

                <br>

                <a
                    href="find-cars.html"
                    class="btn btn-primary"
                >
                    Change Filters
                </a>

            </div>

        `;

        return;

    }


    grid.innerHTML =
        matches
            .map(
                createCarCard
            )
            .join("");


    const back =
        document.getElementById(
            "backFind"
        );


    if (back) {

        back.addEventListener(
            "click",
            () => {

                window.location.href =
                    "find-cars.html";

            }
        );

    }

}


/* ============================================================
   COMPARE
   ============================================================ */

function getCompareList() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "gadiFinderCompare"
            )
        ) || [];

    } catch {

        return [];

    }

}


function saveCompareList(list) {

    localStorage.setItem(
        "gadiFinderCompare",
        JSON.stringify(list)
    );

}


function addToCompare(id) {

    const list =
        getCompareList();


    if (
        list.includes(id)
    ) {

        alert(
            "This car is already in your comparison."
        );

        return;

    }


    if (
        list.length >= 4
    ) {

        alert(
            "You can compare up to 4 cars at a time."
        );

        return;

    }


    list.push(id);

    saveCompareList(list);


    alert(
        "Car added to comparison."
    );


    window.location.href =
        "compare.html";

}


window.addToCompare =
    addToCompare;


/* ============================================================
   COMPARE SELECTS
   ============================================================ */

function populateCompareSelects() {

    const container =
        document.getElementById(
            "compareSelects"
        );


    if (!container) return;


    const selects =
        [...container.querySelectorAll("select")];


    const options =
        cars.map(
            car => `

                <option
                    value="${escapeHTML(car.id)}"
                >
                    ${escapeHTML(
                        car.brand +
                        " " +
                        car.model +
                        (car.variant
                            ? " - " + car.variant
                            : "")
                    )}
                </option>

            `
        ).join("");


    selects.forEach(
        select => {

            select.innerHTML =
                `<option value="">
                    Select a car
                </option>` +
                options;

        }
    );


    const stored =
        getCompareList();


    stored.forEach(
        (id, index) => {

            if (selects[index]) {

                selects[index].value =
                    id;

            }

        }
    );

}


/* ============================================================
   COMPARE TABLE
   ============================================================ */

function renderCompareTable(selectedIds) {

    const wrapper =
        document.getElementById(
            "compareTableWrap"
        );


    if (!wrapper) return;


    const selectedCars =
        selectedIds
            .filter(Boolean)
            .map(findCar)
            .filter(Boolean);


    if (
        selectedCars.length < 2
    ) {

        wrapper.innerHTML = `

            <div class="panel">

                <h3>
                    Select at least 2 cars
                </h3>

                <p class="muted">
                    Choose vehicles above to compare
                    their specifications.
                </p>

            </div>

        `;

        return;

    }


    const fields = [

        ["Brand", "brand"],

        ["Model", "model"],

        ["Variant", "variant"],

        ["Price", "price"],

        ["Fuel", "fuel"],

        ["Transmission", "transmission"],

        ["Body Type", "bodyType"],

        ["Seats", "seats"],

        ["Engine", "engine"],

        ["Power", "power"],

        ["Torque", "torque"],

        ["Mileage", "mileage"],

        ["Boot Space", "bootSpace"],

        ["Ground Clearance", "groundClearance"]

    ];


    let html = `

        <div class="spec-table">

            <div class="spec-row">

                <div>
                    Specification
                </div>

                ${selectedCars
                    .map(
                        car =>
                            `<div>
                                ${escapeHTML(
                                    car.brand +
                                    " " +
                                    car.model
                                )}
                            </div>`
                    )
                    .join("")}

            </div>

    `;


    fields.forEach(
        ([label, key]) => {

            html += `

                <div class="spec-row">

                    <div>
                        ${label}
                    </div>

                    ${selectedCars
                        .map(
                            car => {

                                const value =
                                    key === "price"
                                        ? money(car[key])
                                        : (
                                            car[key] ??
                                            "—"
                                        );

                                return `
                                    <div>
                                        ${escapeHTML(value)}
                                    </div>
                                `;

                            }
                        )
                        .join("")}

                </div>

            `;

        }
    );


    html += `
        </div>
    `;


    wrapper.innerHTML =
        html;

}


/* ============================================================
   COMPARE FORM
   ============================================================ */

function setupCompare() {

    const form =
        document.getElementById(
            "compareForm"
        );


    if (!form) return;


    populateCompareSelects();


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const selects =
                [
                    ...document.querySelectorAll(
                        "#compareSelects select"
                    )
                ];


            const ids =
                selects.map(
                    select =>
                        select.value
                )
                .filter(Boolean);


            if (
                ids.length < 2
            ) {

                document.getElementById(
                    "compareMessage"
                ).textContent =
                    "Please select at least 2 cars.";

                return;

            }


            saveCompareList(
                ids
            );


            document.getElementById(
                "compareMessage"
            ).textContent =
                `${ids.length} cars selected for comparison.`;


            renderCompareTable(
                ids
            );

        }
    );


    const reset =
        document.getElementById(
            "resetCompare"
        );


    if (reset) {

        reset.addEventListener(
            "click",
            () => {

                saveCompareList([]);

                form.reset();

                document.getElementById(
                    "compareMessage"
                ).textContent = "";

                document.getElementById(
                    "compareTableWrap"
                ).innerHTML = "";

            }
        );

    }


    renderCompareTable(
        getCompareList()
    );

}


/* ============================================================
   EMI
   ============================================================ */

function populateEMIBrands() {

    const select =
        document.getElementById(
            "emiBrand"
        );


    if (!select) return;


    getUniqueBrands()
        .forEach(
            brand => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    brand;

                option.textContent =
                    brand;

                select.appendChild(
                    option
                );

            }
        );


    select.addEventListener(
        "change",
        populateEMICars
    );

}


function populateEMICars() {

    const brand =
        document.getElementById(
            "emiBrand"
        )?.value;


    const carSelect =
        document.getElementById(
            "emiCar"
        );


    if (!carSelect) return;


    carSelect.innerHTML =
        `<option value="">
            Select car
        </option>`;


    if (!brand) return;


    const uniqueModels =
        [
            ...new Set(
                cars
                    .filter(
                        car =>
                            car.brand === brand
                    )
                    .map(
                        car =>
                            car.model
                    )
            )
        ]
        .filter(Boolean)
        .sort();


    uniqueModels.forEach(
        model => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                model;

            option.textContent =
                model;

            carSelect.appendChild(
                option
            );

        }
    );


    carSelect.onchange =
        populateEMIVariants;

}


function populateEMIVariants() {

    const brand =
        document.getElementById(
            "emiBrand"
        )?.value;


    const model =
        document.getElementById(
            "emiCar"
        )?.value;


    const variantSelect =
        document.getElementById(
            "emiVariant"
        );


    if (!variantSelect) return;


    variantSelect.innerHTML =
        `<option value="">
            Select variant
        </option>`;


    if (
        !brand ||
        !model
    ) return;


    const variants =
        cars.filter(
            car =>
                car.brand === brand &&
                car.model === model
        );


    variants.forEach(
        car => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                car.id;

            option.textContent =
                car.variant ||
                "Standard";

            variantSelect.appendChild(
                option
            );

        }
    );


    variantSelect.onchange =
        loadEMIVariant;

}


function loadEMIVariant() {

    const id =
        document.getElementById(
            "emiVariant"
        )?.value;


    const car =
        findCar(id);


    if (!car) return;


    const price =
        Number(car.price) || 0;


    const minimumDown =
        Math.round(
            price * 0.10
        );


    const priceInput =
        document.getElementById(
            "emiPrice"
        );


    const downInput =
        document.getElementById(
            "emiDownPayment"
        );


    const minimumText =
        document.getElementById(
            "minimumDownPayment"
        );


    if (priceInput) {

        priceInput.value =
            price;

    }


    if (downInput) {

        downInput.min =
            minimumDown;

        downInput.value =
            minimumDown;

    }


    if (minimumText) {

        minimumText.textContent =
            `Minimum suggested down payment: ${money(minimumDown)}`;

    }


    const minimumInterest =
        document.getElementById(
            "minimumInterest"
        );


    if (minimumInterest) {

        minimumInterest.textContent =
            "Default reference interest rate: 8.5%";

    }

}


/* ============================================================
   EMI CALCULATION
   ============================================================ */

function calculateEMI(
    principal,
    annualRate,
    years
) {

    const months =
        years * 12;


    const monthlyRate =
        annualRate /
        12 /
        100;


    if (
        monthlyRate === 0
    ) {

        return principal /
            months;

    }


    return (
        principal *
        monthlyRate *
        Math.pow(
            1 + monthlyRate,
            months
        )
    ) /
    (
        Math.pow(
            1 + monthlyRate,
            months
        ) - 1
    );

}


function setupEMI() {

    const form =
        document.getElementById(
            "emiForm"
        );


    if (!form) return;


    populateEMIBrands();


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const price =
                Number(
                    document.getElementById(
                        "emiPrice"
                    ).value
                );


            const down =
                Number(
                    document.getElementById(
                        "emiDownPayment"
                    ).value
                );


            const interest =
                Number(
                    document.getElementById(
                        "emiInterest"
                    ).value
                );


            const years =
                Number(
                    document.getElementById(
                        "emiPeriod"
                    ).value
                );


            const principal =
                price - down;


            if (
                price <= 0 ||
                principal <= 0 ||
                years <= 0
            ) {

                alert(
                    "Please enter valid loan details."
                );

                return;

            }


            const emi =
                calculateEMI(
                    principal,
                    interest,
                    years
                );


            const totalPayment =
                emi *
                years *
                12;


            const totalInterest =
                totalPayment -
                principal;


            const result =
                document.getElementById(
                    "emiResult"
                );


            if (result) {

                result.innerHTML = `

                    <span class="eyebrow">
                        ESTIMATED MONTHLY EMI
                    </span>


                    <div class="emi-number">
                        ${money(
                            Math.round(emi)
                        )}
                    </div>


                    <p>

                        Loan amount:
                        <strong>
                            ${money(principal)}
                        </strong>

                    </p>


                    <p>

                        Total interest:
                        <strong>
                            ${money(
                                Math.round(
                                    totalInterest
                                )
                            )}
                        </strong>

                    </p>


                    <p>

                        Total repayment:
                        <strong>
                            ${money(
                                Math.round(
                                    totalPayment
                                )
                            )}
                        </strong>

                    </p>

                `;

            }

        }
    );


    const reset =
        document.getElementById(
            "resetEmi"
        );


    if (reset) {

        reset.addEventListener(
            "click",
            () => {

                form.reset();

                const result =
                    document.getElementById(
                        "emiResult"
                    );


                if (result) {

                    result.innerHTML = `

                        <span class="eyebrow">
                            ESTIMATED EMI
                        </span>

                        <div class="emi-number">
                            ₹0
                        </div>

                        <p>
                            Select your vehicle and
                            enter your loan details
                            to calculate an estimated
                            monthly EMI.
                        </p>

                    `;

                }

            }
        );

    }

}


/* ============================================================
   CAR PROFILE
   ============================================================ */

function renderCarProfile() {

    const name =
        document.getElementById(
            "profileName"
        );


    if (!name) return;


    const id =
        getCarId();


    const car =
        findCar(id);


    if (!car) {

        name.textContent =
            "Car not found";

        return;

    }


    const brand =
        document.getElementById(
            "profileBrand"
        );


    const variant =
        document.getElementById(
            "profileVariant"
        );


    const price =
        document.getElementById(
            "profilePrice"
        );


    const description =
        document.getElementById(
            "profileDescription"
        );


    if (brand)
        brand.textContent =
            car.brand || "";


    name.textContent =
        `${car.brand || ""} ${car.model || ""}`;


    if (variant)
        variant.textContent =
            car.variant || "";


    if (price)
        price.textContent =
            money(car.price);


    if (description)
        description.textContent =
            car.description ||
            "Detailed information about this vehicle.";


    document.title =
        `${car.brand} ${car.model} | Gadi Finder`;


    renderProfileSpecs(
        car
    );


    renderProfileDetails(
        car
    );


    const compareButton =
        document.getElementById(
            "profileCompareButton"
        );


    if (compareButton) {

        compareButton.onclick =
            () => {

                addToCompare(
                    car.id
                );

            };

    }

}


function renderProfileSpecs(car) {

    const container =
        document.getElementById(
            "profileSpecs"
        );


    if (!container) return;


    const specs = [

        ["Fuel", car.fuel],

        ["Transmission", car.transmission],

        ["Seats", car.seats],

        ["Engine", car.engine],

        ["Power", car.power],

        ["Torque", car.torque],

        ["Mileage", car.mileage],

        ["Body Type", car.bodyType]

    ];


    container.innerHTML =
        specs.map(
            ([label, value]) => `

                <div class="spec-card">

                    <small>
                        ${escapeHTML(label)}
                    </small>

                    <strong>
                        ${escapeHTML(
                            value ?? "—"
                        )}
                    </strong>

                </div>

            `
        ).join("");

}


function renderProfileDetails(car) {

    const container =
        document.getElementById(
            "profileDetails"
        );


    if (!container) return;


    const ignored =
        new Set([
            "id",
            "imageCard",
            "imageProfile",
            "imageFront",
            "imageRear",
            "imageSide",
            "imageInterior",
            "imageDashboard",
            "imageExtra",
            "description"
        ]);


    let html = "";


    Object.entries(car)
        .forEach(
            ([key, value]) => {

                if (
                    ignored.has(key) ||
                    value === undefined ||
                    value === null ||
                    value === ""
                ) {

                    return;

                }


                const label =
                    key
                        .replace(
                            /([A-Z])/g,
                            " $1"
                        )
                        .replace(
                            /^./,
                            character =>
                                character.toUpperCase()
                        );


                const displayValue =
                    key === "price"
                        ? money(value)
                        : value;


                html += `

                    <div class="spec-row">

                        <div>
                            ${escapeHTML(label)}
                        </div>

                        <div>
                            ${escapeHTML(
                                displayValue
                            )}
                        </div>

                    </div>

                `;

            }
        );


    container.innerHTML =
        html;

}


/* ============================================================
   INITIALIZE
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderHomeFeatures();

        renderBrands();

        renderBrandPage();

        setupFindForm();

        renderResults();

        setupCompare();

        setupEMI();

        renderCarProfile();

    }
);
