let api = "https://6ac63fd4bea0e72cf5c8c181.mockapi.io/Product";
let products_wrapper = document.querySelector("#products");
let search_filter = document.querySelector("#search");
let price_filter = document.querySelector("#price");

let category_select = document.querySelector("#category");
let rating_select = document.querySelector("#rating");
let price_select = document.querySelector("#price");

let btn_modal = document.querySelector("#btn_modal");
let wrapper_modal = document.querySelector("#wrapper_modal");
let close_modal_x = document.querySelector("#close_modal_x");
let cancel_modal = document.querySelector("#cancel_modal");
let submit_modal = document.querySelector("#submit_modal");

fetch(api)
  .then((response) => response.json())
  .then((result) => getData(result))
  .catch((err) => console.log(err));

function getData(data) {
  render(data);
  filter(data);
  post_product(data);
}

function render(data) {
  products_wrapper.innerHTML = "";

  data?.map((e) => {
    let card = document.createElement("div");
    card.setAttribute(
      "class",
      "bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-xl transition duration-300",
    );
    card.innerHTML = `

          <!-- IMAGE -->
          <div class="h-[280px] p-8 flex justify-center items-center bg-white">
            <img
              src=${e?.image}
              alt=${e?.title}
              class="w-full h-full object-contain"
            />
          </div>

          <!-- CONTENT -->
          <div class="p-5">
            <!-- CATEGORY -->
            <span
class="${
      e?.category === "men's clothing"
        ? "inline-block bg-gray-200 text-gray-900 px-3 py-1.5 rounded-full text-xs capitalize mb-3"
        : e?.category === "jewelery"
          ? "inline-block bg-[#FFD700] text-white px-3 py-1.5 rounded-full text-xs capitalize mb-3"
          : e?.category === "electronics"
            ? "inline-block bg-blue-200 text-black px-3 py-1.5 rounded-full text-xs capitalize mb-3"
            : e?.category === "women's clothing"
              ? "inline-block bg-red-200 text-red-900 px-3 py-1.5 rounded-full text-xs capitalize mb-3"
              : "inline-block bg-green-50 text-green-900 px-3 py-1.5 rounded-full text-xs capitalize mb-3"
    }"
          }
            >
             ${e?.category}
            </span>

            <!-- TITLE -->
            <h2 class="text-lg font-semibold leading-6 mb-3">
      ${e?.title}
            </h2>

            <!-- DESCRIPTION -->
            <p class="text-gray-500 text-sm leading-6 mb-4">
${e?.description.length < 200 ? e?.description : `${e?.description.slice(0, 200)}...`}

            </p>

            <!-- price -->
            <div class="flex justify-between items-center text-sm mb-5">
              <span class='text-[#E6BE8A]'> ⭐ ${e?.rating.rate} </span>

              <span class="text-gray-400"> ${e?.rating?.count} count </span>
            </div>

            <!-- BOTTOM -->
            <div class="flex justify-between items-center">
              <h3 class="text-2xl font-bold text-green-600">$${e?.price}</h3>

              <button
                class="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 active:scale-95 transition cursor-pointer"
              >
                View Product
              </button>
            </div>
          </div>
        `;

    products_wrapper.appendChild(card);
  });
}

function filter(data) {
  search_filter.addEventListener("input", () => {
    let input_data = data?.filter((e) => {
      return e?.title
        ?.toLowerCase()
        .includes(search_filter.value.trim().toLowerCase());
    });
    if (search_filter.value.trim() == "") {
      render(data);
    } else {
      render(input_data);
    }
  });

  category_select.addEventListener("change", () => {
    console.log(category_select.value);
    let category_filter = data?.filter((e) => {
      return e.category == category_select.value;
    });
    if (category_filter) {
      render(category_filter);
    }
  });
  rating_select.addEventListener("change", () => {
    let rating_value = Number(rating_select.value);
    let filter = data?.filter((e) => {
      return (
        e?.rating.rate >= rating_value && e?.rating.rate <= rating_value + 1
      );
    });
    if (rating_select.value == "all") {
      render(data);
    } else {
      render(filter);
    }
  });
}

btn_modal.addEventListener("click", () => {
  wrapper_modal.classList.remove("hidden");
});
close_modal_x.addEventListener("click", () => {
  wrapper_modal.classList.add("hidden");
});
cancel_modal.addEventListener("click", () => {
  wrapper_modal.classList.add("hidden");
});

let titleInput = document.querySelector("#title");
let priceInput = document.querySelector("#Modal_price");
let categorySelect = document.querySelector("#category");
let descriptionInput = document.querySelector("#description");
let imageInput = document.querySelector("#image");
let rateInput = document.querySelector("#rate");
let countInput = document.querySelector("#count");


function post_product(data) {
  submit_modal.addEventListener("click", (e) => {
    // e.preventDefault();

    let new_product = {
      id: data.length,
      title: titleInput.value,
      price: Number(priceInput.value),
      description: descriptionInput.value,
      category: categorySelect.value,
      image: imageInput.value,
      rating: {
        rate: rateInput.value,
        count: countInput.value,
      },
    };

    console.log(priceInput.value);

    fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_product),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

    wrapper_modal.classList.add("hidden");
  });
}
