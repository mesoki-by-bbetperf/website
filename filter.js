let currentColorFilter = "all";
let currentStyleFilter = "all";

// Фильтр по цвету
document.querySelectorAll(".color-filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        currentColorFilter = button.getAttribute("data-filter"); // Сохраняем выбранный цвет
        console.log("Фильтр (цвет) выбран:", currentColorFilter);
        applyFilters(currentColorFilter, currentStyleFilter);
    });
});

// Фильтр по описанию (Line, Grid, Dot)
document.querySelectorAll(".style-filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        currentStyleFilter = button.getAttribute("data-filter"); // Сохраняем выбранное описание
        console.log("Фильтр (описание) выбран:", currentStyleFilter);
        applyFilters(currentColorFilter, currentStyleFilter);
    });
});

function applyFilters(color, style) {
    if (!itemsData || itemsData.length === 0) {
        console.error("Ошибка: itemsData пуст или не загружен.");
        return;
    }

    let filteredItems = itemsData;

    if (color !== "all") {
        filteredItems = filteredItems.filter(item => item.color.toLowerCase() === color.toLowerCase());
    }

    if (style !== "all") {
        filteredItems = filteredItems.filter(item => item.style.toLowerCase().includes(style.toLowerCase()));
    }

    console.log("Отфильтрованные товары:", filteredItems);
    renderItems(filteredItems);
}