document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loaded"); // Добавляет класс после загрузки
});

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("hidden"); // Добавляем класс для плавного исчезновения
        setTimeout(() => {
            loader.style.display = "none"; // Убираем из DOM после анимации
        }, 600); // Должно совпадать с `transition: opacity 0.6s`
    }
});