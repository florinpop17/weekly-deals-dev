const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");

const freeDealsEl = document.getElementById("free_deals");
const featuredDealsEl = document.getElementById("featured_deals");

const openBtn = document.getElementById("open_btn");
const closeBtn = document.getElementById("close_btn");
const modal = document.getElementById("modal");

let endTime = undefined;

countdown();

setInterval(countdown, 1000);

// Event Listeners
openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Getting the deals from the JSON
fetch("./deals.json")
    .then((body) => body.json())
    .then((data) => {
        const { featured, free, new_deals_date } = data;

        endTime = new Date(new_deals_date);
        featured.forEach((product) => createFeaturedProduct(product));
        free.forEach((product) => createFreeProduct(product));
    });

function countdown() {
    if (!endTime) return;

    const startTime = new Date();
    const diff = endTime - startTime;

    if (diff <= 0) {
        daysEl.innerHTML = 0;
        hoursEl.innerHTML = "00";
        minEl.innerHTML = "00";
        secEl.innerHTML = "00";
    } else {
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);
        const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
        const minutes = Math.floor(diff / 1000 / 60) % 60;
        const seconds = Math.floor(diff / 1000) % 60;
        daysEl.innerHTML = days;
        hoursEl.innerHTML = hours < 10 ? "0" + hours : hours;
        minEl.innerHTML = minutes < 10 ? "0" + minutes : minutes;
        secEl.innerHTML = seconds < 10 ? "0" + seconds : seconds;
    }
}

function createFreeProduct(product) {
    const wrapper = document.createElement("a");
    wrapper.innerHTML = `
        <div class="block w-full h-60 relative">
            <img
                class="w-full h-full object-cover"
                src="${product.image_url}"
                alt="${product.title}"
            />
            <span
                class="
                    text-2xl text-white
                    font-bold
                    absolute
                    bottom-0
                    left-0
                    bg-purple-700
                    py-2
                    px-3
                    rounded-tr-sm
                "
            >
                FREE
            </span>
        </div>
        <h3 class="text-white text-3xl text-center my-4">${product.title}</h3>
    `;

    wrapper.href = product.url;
    wrapper.target = "_blank";
    wrapper.className = `w-full max-w-sm transform transition hover:-translate-y-1 hover:shadow-xl`;

    freeDealsEl.appendChild(wrapper);
}

function createFeaturedProduct(product) {
    const wrapper = document.createElement("a");
    wrapper.innerHTML = `
        <div class="block w-full h-96 relative">
            <div
                class="
                    text-white text-3xl
                    font-bold
                    h-32
                    w-32
                    top-0
                    right-0
                    -mt-1
                    -mr-1
                    absolute
                    overflow-hidden
                "
                >
                    <div class="
                        
                        bg-red-500
                        text-white
                        w-60
                        py-4
                        text-center
                        transform
                        rotate-45
                        mt-2
                        -ml-8
                    ">
                    ${calculatePercentage(product.old_price, product.new_price)}
                    </div>
                </div
            >

            <img
                class="w-full h-full object-cover"
                src="${product.image_url}"
                alt="${product.title}"
            />
            <span
                class="
                    text-4xl text-white
                    absolute
                    bottom-0
                    left-0
                    bg-purple-700
                    py-2
                    px-3
                    rounded-tr-sm
                "
            >
                $${product.new_price}
                <del class="text-2xl">$${product.old_price}</del>
            </span>
        </div>
        <h3 class="text-white text-3xl text-center my-4">${product.title}</h3>
    `;

    wrapper.href = product.url;
    wrapper.target = "_blank";
    wrapper.className = `w-full md:max-w-xl transform transition hover:-translate-y-1 hover:shadow-xl`;

    featuredDealsEl.appendChild(wrapper);
}

function calculatePercentage(oldPrice, newPrice) {
    const percentage = ((oldPrice - newPrice) / oldPrice) * 100;
    return `-${percentage.toFixed(0)}%`;
}
