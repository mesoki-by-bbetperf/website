document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id"); // Получаем ID из URL

    if (!productId) {
        console.error("Ошибка: ID товара не найден!");
        return;
    }

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const product = data[productId - 1]; // Находим товар по ID

            if (!product) {
                console.error("Ошибка: Товар не найден!");
                return;
            }

            document.getElementById("product-image").src = product.image;
            document.getElementById("product-title").textContent = product.title;
            document.getElementById("product-image").alt = product.title;
            document.getElementById("product-style").textContent = product.style;
            document.getElementById("product-price").textContent = `$${parseFloat(product.price).toFixed(2)}`;
            document.getElementById("product-color").textContent = product.color;
        })
        .catch(error => console.error("Ошибка загрузки JSON:", error));
});
