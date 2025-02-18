document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html") // Загружаем header.html
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data; // Вставляем в `#header-container`
        })
        .catch(error => console.error("Ошибка загрузки header:", error));
});