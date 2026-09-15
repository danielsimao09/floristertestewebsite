/* ==========================================
   MENU MOBILE
========================================== */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Fechar menu quando clicar num link */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ==========================================
   CARRINHO
========================================== */

const cart = document.getElementById("cart");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartOverlay = document.getElementById("cartOverlay");

const cartItemsContainer =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


let cartItems = [];


/* Abrir carrinho */

cartBtn.addEventListener("click", () => {

    cart.classList.add("active");
    cartOverlay.classList.add("active");

});


/* Fechar carrinho */

function closeCartFunction() {

    cart.classList.remove("active");
    cartOverlay.classList.remove("active");

}

closeCart.addEventListener("click", closeCartFunction);

cartOverlay.addEventListener("click", closeCartFunction);


/* ==========================================
   ADICIONAR PRODUTO
========================================== */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const product =
            button.closest(".product-card");

        const name =
            product.dataset.name;

        const price =
            parseFloat(product.dataset.price);

        const image =
            product.querySelector("img").src;


        const existing =
            cartItems.find(item => item.name === name);


        if (existing) {

            existing.quantity++;

        } else {

            cartItems.push({

                name: name,
                price: price,
                image: image,
                quantity: 1

            });

        }


        updateCart();

        cart.classList.add("active");
        cartOverlay.classList.add("active");

    });

});


/* ==========================================
   ATUALIZAR CARRINHO
========================================== */

function updateCart() {

    cartItemsContainer.innerHTML = "";

    let total = 0;
    let quantityTotal = 0;


    if (cartItems.length === 0) {

        cartItemsContainer.innerHTML = `
            <p class="empty-cart">
                O carrinho está vazio.
            </p>
        `;

    }


    cartItems.forEach((item, index) => {

        total += item.price * item.quantity;

        quantityTotal += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>
                    ${item.price.toFixed(2).replace(".", ",")}€
                    × ${item.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                onclick="removeItem(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>
        `;


        cartItemsContainer.appendChild(cartItem);

    });


    cartCount.textContent = quantityTotal;

    cartTotal.textContent =
        total.toFixed(2).replace(".", ",") + "€";

}


/* ==========================================
   REMOVER PRODUTO
========================================== */

function removeItem(index) {

    cartItems.splice(index, 1);

    updateCart();

}


/* ==========================================
   FAVORITOS
========================================== */

const favoriteButtons =
    document.querySelectorAll(".favorite");

const favoriteCount =
    document.getElementById("favoriteCount");

let favorites = 0;


favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        const icon =
            button.querySelector("i");


        if (button.classList.contains("active")) {

            button.classList.remove("active");

            icon.style.color = "";

            favorites--;

        } else {

            button.classList.add("active");

            icon.style.color = "#fff";

            favorites++;

        }


        favoriteCount.textContent = favorites;

    });

});


/* ==========================================
   BOTÃO FAVORITOS DO HEADER
========================================== */

document.getElementById("favoriteBtn")
    .addEventListener("click", () => {

        const firstFavorite =
            document.querySelector(".favorite.active");

        if (firstFavorite) {

            firstFavorite
                .closest(".product-card")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        } else {

            alert("Ainda não adicionaste nenhum favorito.");

        }

    });


/* ==========================================
   SHARE
========================================== */

document.querySelectorAll(".share").forEach(button => {

    button.addEventListener("click", async () => {

        const product =
            button.closest(".product-card");

        const name =
            product.dataset.name;


        if (navigator.share) {

            try {

                await navigator.share({
                    title: name,
                    text: `Vê este bouquet: ${name}`
                });

            } catch (error) {

                console.log("Partilha cancelada.");

            }

        } else {

            alert(
                `Partilha este produto: ${name}`
            );

        }

    });

});


/* ==========================================
   FORMULÁRIO DE CONTACTO
========================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value;


    alert(
        `Obrigado, ${name}! A tua mensagem foi enviada.`
    );


    contactForm.reset();

});


/* ==========================================
   CHECKOUT
========================================== */

document.getElementById("checkout")
    .addEventListener("click", () => {

        if (cartItems.length === 0) {

            alert(
                "O teu carrinho está vazio."
            );

            return;

        }


        alert(
            "Obrigado pela tua compra! " +
            "O checkout seria processado aqui."
        );

    });


/* ==========================================
   ANIMAÇÃO AO FAZER SCROLL
========================================== */

const cards =
    document.querySelectorAll(
        ".product-card, .review-card, .feature-box"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(30px)";

    card.style.transition =
        "opacity .6s ease, transform .6s ease";

    observer.observe(card);

});
