let currentColorFilter = "all";
let currentStyleFilter = "all";

// Фильтр по цвету
document.querySelectorAll(".color-filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".color-filter-btn").forEach(btn => btn.classList.remove("active-filter")); // Убираем активный класс
        button.classList.add("active-filter"); // Добавляем активный класс
        currentColorFilter = button.getAttribute("data-filter"); // Сохраняем выбранный цвет
        console.log("Фильтр (цвет) выбран:", currentColorFilter);
        applyFilters(currentColorFilter, currentStyleFilter);
    });
});

// Фильтр по описанию (Line, Grid, Dot)
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active-filter")); // Убираем активный класс
        button.classList.add("active-filter"); // Добавляем активный класс
        currentStyleFilter = button.getAttribute("data-filter"); // Сохраняем выбранный стиль
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