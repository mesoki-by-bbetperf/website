document.addEventListener("DOMContentLoaded", function () {
    fetch("footer.html") // Загружаем footer.html
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data; // Вставляем в `#footer-container`
        })
        .catch(error => console.error("Ошибка загрузки footer:", error));
});