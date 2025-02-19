document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            itemsData = data.map((item, index) => ({ ...item, id: index + 1 })); // Добавляем уникальный ID
            console.log("Загруженные товары:", itemsData);
            renderItems(itemsData);
        })
        .catch(error => console.error("Ошибка загрузки JSON:", error));
});

function renderItems(items) {
    const grid = document.querySelector(".item_grid");
    const template = document.getElementById("item_template");

    if (!template) {
        console.error("Ошибка: Шаблон #item_template не найден!");
        return;
    }

    grid.innerHTML = ""; // Очищаем контейнер

    items.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const itemElement = clone.querySelector(".item");

        itemElement.setAttribute("data-color", item.color.toLowerCase());
        clone.querySelector("img").src = item.image;
        clone.querySelector("img").alt = item.title;
        clone.querySelector(".item_title").textContent = item.title;
        clone.querySelector(".item_style").textContent = item.style;
        clone.querySelector(".item_price").textContent = `$${parseFloat(item.price).toFixed(2)}`;
        clone.querySelector(".item_color").textContent = item.color;

        // Открываем товар в новом окне
        itemElement.addEventListener("click", () => {
            window.location.href = `product.html?id=${item.id}`;
        });

        grid.appendChild(clone);
    });
}