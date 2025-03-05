document.addEventListener("DOMContentLoaded", function () {
    fetch("../data.json")
        .then(response => response.json())
        .then(data => {
            // Фильтруем элементы, оставляя только первый для каждого цвета
            const uniqueColorItems = data.reduce((acc, current) => {
                const color = current.color.toLowerCase();
                if (!acc.some(item => item.color.toLowerCase() === color)) {
                    // Сохраняем оригинальный индекс товара
                    const originalIndex = data.findIndex(item => 
                        item.color === current.color &&
                        item.style === current.style &&
                        item.pages === current.pages &&
                        item.size === current.size
                    );
                    acc.push({
                        ...current,
                        id: originalIndex + 1 // Используем оригинальный индекс + 1 как ID
                    });
                }
                return acc;
            }, []);
            
            itemsData = uniqueColorItems; // Больше не переназначаем ID
            console.log("Загруженные товары:", itemsData);
            renderItems(itemsData);
        })
        .catch(error => console.error("Ошибка загрузки JSON:", error));
});

function renderItems(items) {
    const grid = document.getElementById("item_grid");
    const template = document.getElementById("item_template");

    if (!template) {
        console.error("Ошибка: Шаблон #item_template не найден!");
        return;
    }

    grid.innerHTML = ""; // Очищаем контейнер

    items.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const itemElement = clone.querySelector(".item");
        const imageContainer = clone.querySelector(".item_image");

        itemElement.setAttribute("data-color", item.color.toLowerCase());
        imageContainer.style.backgroundImage = `url(${item.frontImage})`; // Дефолтное изображение (передняя сторона)

        clone.querySelector(".item_title").textContent = item.title;
        clone.querySelector(".item_price").textContent = `$${parseFloat(item.price).toFixed(2)}`;

        // **Получаем зоны наведения**
        const hoverLeft = clone.querySelector(".image-hover-zone.left");
        const hoverCenter = clone.querySelector(".image-hover-zone.center");
        const hoverRight = clone.querySelector(".image-hover-zone.right");

        // **Добавляем события наведения**
        hoverLeft.addEventListener("mouseenter", () => {
            imageContainer.style.backgroundImage = `url(${item.frontImage})`; // Внешняя сторона
        });

        // **Добавляем события наведения**
        hoverCenter.addEventListener("mouseenter", () => {
            imageContainer.style.backgroundImage = `url(${item.insideImage})`; // Внутренняя сторона
        });

        hoverRight.addEventListener("mouseenter", () => {
            imageContainer.style.backgroundImage = `url(${item.backImage})`; // Задняя сторона
        });

        // **При уходе мыши возвращаем стандартное изображение**
        imageContainer.addEventListener("mouseleave", () => {
            imageContainer.style.backgroundImage = `url(${item.frontImage})`;
        });

        // **Открываем товар в новом окне**
        itemElement.addEventListener("click", () => {
            window.location.href = `/product/?id=${item.id}`;
        });

        grid.appendChild(clone);
    });
}