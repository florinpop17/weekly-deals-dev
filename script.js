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
        <div class="block w-full h-60 relative group bg-gray-800">
            <img
                class="w-auto mx-auto h-full object-fit"
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
            ${createSocialButtons(product.title, 100)}
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
    const discount = calculatePercentage(product.old_price, product.new_price);
    wrapper.innerHTML = `
        <div class="block w-full h-96 relative group bg-gray-800">
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
                    -${discount}%
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
            ${createSocialButtons(product.title, discount)}
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
    return percentage.toFixed(0);
}

function createSocialButtons(title, discount) {
    const html = `
        <div class="absolute top-0 left-0 flex flex-col space-y-1 -z-10 transform transition group-hover:-translate-x-10">
            <a
                target="_blank"
                href="https://twitter.com/intent/tweet?text=This%20week%20you%20can%20get%20%22${title}%22%20on%20https%3A//WeeklyDeals.dev%20for%20${
        discount < 100 ? `${discount}%25%20off` : "FREE"
    }!%0A%0ACheck%20it%20out!%20%F0%9F%91%87"
                rel="noreferrer"
                class="
                    bg-twitter
                    text-white
                    font-semibold
                    rounded-l
                    p-2
                "
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-twitter"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#ffffff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                        d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"
                    />
                </svg>
            </a>
        </div>
    `;

    return html;
}
