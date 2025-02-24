document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        console.error("Ошибка: ID товара не найден!");
        return;
    }

    fetch("../data.json")
        .then(response => response.json())
        .then(data => {
            const product = data[productId - 1];

            if (!product) {
                console.error("Ошибка: Товар не найден!");
                return;
            }

            // **Обновляем данные основного блока**
            document.getElementById("product-image-1").src = product.frontImage;
            document.getElementById("product-image-2").src = product.insideImage;
            document.getElementById("product-image-3").src = product.backImage;
            document.getElementById("product-title-main").textContent = product.title;
            document.getElementById("product-style-main").textContent = product.style;
            document.getElementById("product-price-main").textContent = `$${parseFloat(product.price).toFixed(2)}`;
            document.getElementById("product-color-main").textContent = product.color;

            // **Обновляем данные плавающего блока**
            document.getElementById("product-title-floating").textContent = product.title;
            document.getElementById("product-style-floating").textContent = product.style;
            document.getElementById("product-price-floating").textContent = `$${parseFloat(product.price).toFixed(2)}`;
            document.getElementById("product-color-floating").textContent = product.color;

            // **Устанавливаем ссылку на Amazon**
            const mainButton = document.getElementById("add-to-cart-btn");
            const floatingButton = document.getElementById("add-to-cart-btn-floating");

            if (product.link) {
                mainButton.addEventListener("click", () => {
                    window.open(product.link, "_blank");
                });

                floatingButton.addEventListener("click", () => {
                    window.open(product.link, "_blank");
                });
            }
        })
        .catch(error => console.error("Ошибка загрузки JSON:", error));

    // **Логика появления и исчезновения плавающего блока**
    const floatingBlock = document.querySelector(".fade-in-bottom");
    const footer = document.getElementById("footer-container"); // Получаем футер
    const triggerHeight = window.innerHeight / 2; // Высота, при которой показывается блок

    function handleScroll() {
        const footerRect = footer.getBoundingClientRect();
        const shouldHide = footerRect.top < window.innerHeight; // Если футер виден

        if (window.scrollY > triggerHeight && !shouldHide) {
            floatingBlock.classList.add("visible");
        } else {
            floatingBlock.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", handleScroll);
});