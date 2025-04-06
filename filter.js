let currentColorFilter = "all";
let currentStyleFilter = "all";
let currentPagesFilter = "all";
let currentSizeFilter = "all";

// Фильтр по Color
document.querySelectorAll(".color-layout-filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".color-layout-filter-btn").forEach(btn => btn.classList.remove("active-filter")); // Убираем активный класс
        button.classList.add("active-filter"); // Добавляем активный класс
        currentColorFilter = button.getAttribute("data-filter"); // Сохраняем выбранный цвет
        console.log("Фильтр (цвет) выбран:", currentColorFilter);
        applyFilters(currentColorFilter, currentStyleFilter, currentPagesFilter, currentSizeFilter);
    });
});

// Фильтр по Layout
document.querySelectorAll(".layout-filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".layout-filter-btn").forEach(btn => btn.classList.remove("active-filter")); // Убираем активный класс
        button.classList.add("active-filter"); // Добавляем активный класс
        currentStyleFilter = button.getAttribute("data-filter"); // Сохраняем выбранный стиль
        console.log("Фильтр (описание) выбран:", currentStyleFilter);
        applyFilters(currentColorFilter, currentStyleFilter, currentPagesFilter, currentSizeFilter);
    });
});

// Фильтр по Pages
document.querySelectorAll(".pages-filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".pages-filter-btn").forEach(btn => btn.classList.remove("active-filter")); // Убираем активный класс
        button.classList.add("active-filter"); // Добавляем активный класс
        currentPagesFilter = button.getAttribute("data-filter"); // Сохраняем выбранный стиль
        console.log("Фильтр (описание) выбран:", currentPagesFilter);
        applyFilters(currentColorFilter, currentStyleFilter, currentPagesFilter, currentSizeFilter);
    });
});

// Фильтр по Size
document.querySelectorAll(".size-filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".size-filter-btn").forEach(btn => btn.classList.remove("active-filter")); // Убираем активный класс
        button.classList.add("active-filter"); // Добавляем активный класс
        currentSizeFilter = button.getAttribute("data-filter"); // Сохраняем выбранный стиль
        console.log("Фильтр (описание) выбран:", currentSizeFilter);
        applyFilters(currentColorFilter, currentStyleFilter, currentPagesFilter, currentSizeFilter);
    });
});

function applyFilters(color, style, pages, size) {
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

    if (pages !== "all") {
        filteredItems = filteredItems.filter(item => item.pages.toLowerCase().includes(pages.toLowerCase()));
    }

    if (size !== "all") {
        filteredItems = filteredItems.filter(item => item.size.toLowerCase().includes(size.toLowerCase()));
    }

    console.log("Отфильтрованные товары:", filteredItems);
    renderItems(filteredItems);
}