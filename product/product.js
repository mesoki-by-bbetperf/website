document.addEventListener("DOMContentLoaded", function () {
    let allProducts = []; // Храним все продукты
    let currentProduct = null; // Текущий отображаемый продукт
    
    const colorMap = {
        red: "var(--color-brand-red)",
        blue: "var(--color-brand-blue)",
        green: "var(--color-brand-green)",
        yellow: "var(--color-brand-yellow)"
    };

    // Получаем начальный ID из URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialProductId = urlParams.get("id");

    if (!initialProductId) {
        console.error("Ошибка: ID товара не найден!");
        return;
    }

    // Загружаем данные
    fetch("../data.json")
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            // Находим начальный продукт
            currentProduct = allProducts[initialProductId - 1];
            
            if (!currentProduct) {
                console.error("Ошибка: Товар не найден!");
                return;
            }

            updateProductDisplay(currentProduct);
            setupFilterListeners();
            updateFilterButtonsState(currentProduct);
        })
        .catch(error => console.error("Ошибка загрузки JSON:", error));

    // В начале файла после объявления переменных
    const domElements = {
        images: {
            front: document.getElementById("product-image-1"),
            inside: document.getElementById("product-image-2"),
            back: document.getElementById("product-image-3")
        },
        main: {
            title: document.getElementById("product-title-main"),
            style: document.getElementById("product-style-main"),
            price: document.getElementById("product-price-main"),
            color: document.getElementById("product-color-main"),
            size: document.getElementById("product-size-main"),
            pages: document.getElementById("product-pages-main")
        },
        floating: {
            title: document.getElementById("product-title-floating"),
            style: document.getElementById("product-style-floating"),
            price: document.getElementById("product-price-floating"),
            color: document.getElementById("product-color-floating"),
            size: document.getElementById("product-size-floating"),
            pages: document.getElementById("product-pages-floating")
        },
        buttons: {
            main: document.getElementById("add-to-cart-btn"),
            floating: document.getElementById("add-to-cart-btn-floating")
        }
    };

    function updateFilterButtonsState(product) {
        // Сбрасываем все кнопки
        document.querySelectorAll('.color-layout-filter-btn, .layout-filter-btn, .pages-filter-btn, .size-filter-btn')
            .forEach(btn => {
                btn.classList.remove('active-filter');
                btn.classList.add('inactive-filter');
                btn.style.backgroundColor = 'var(--background-primary)';
                btn.style.color = 'var(--text-primary)';
            });

        // Активируем соответствующие кнопки
        const selectors = {
            color: `.color-layout-filter-btn[data-filter="${product.color.toLowerCase()}"]`,
            layout: `.layout-filter-btn[data-filter="${product.style.toLowerCase()}"]`,
            pages: `.pages-filter-btn[data-filter="${product.pages}"]`,
            size: `.size-filter-btn[data-filter="${product.size.toLowerCase()}"]`
        };

        Object.entries(selectors).forEach(([type, selector]) => {
            const button = document.querySelector(selector);
            if (button) {
                button.classList.add('active-filter');
                button.classList.remove('inactive-filter');
                if (type === 'color') {
                    button.style.backgroundColor = colorMap[product.color.toLowerCase()] || 'var(--color-black)';
                    button.style.color = 'white';
                    
                    // Окрашиваем активные кнопки других фильтров в цвет выбранного цвета
                    document.querySelectorAll('.layout-filter-btn.active-filter, .pages-filter-btn.active-filter, .size-filter-btn.active-filter')
                        .forEach(btn => {
                            btn.style.backgroundColor = colorMap[product.color.toLowerCase()] || 'var(--color-black)';
                            btn.style.color = 'white';
                            btn.classList.remove('inactive-filter');
                        });
                } else {
                    button.style.backgroundColor = colorMap[product.color.toLowerCase()] || 'var(--color-black)';
                    button.style.color = 'white';
                }
            }
        });
    }

    function updateProductDisplay(product) {
        // Используем кэшированные элементы
        domElements.images.front.src = product.frontImage;
        domElements.images.inside.src = product.insideImage;
        domElements.images.back.src = product.backImage;

        domElements.main.title.textContent = product.title;
        domElements.main.style.textContent = product.style;
        domElements.main.price.textContent = `$${parseFloat(product.price).toFixed(2)}`;
        domElements.main.color.textContent = product.color;
        domElements.main.size.textContent = `${product.size} in`;
        domElements.main.pages.textContent = `${product.pages} pages`;

        domElements.floating.title.textContent = product.title;
        domElements.floating.style.textContent = product.style;
        domElements.floating.price.textContent = `$${parseFloat(product.price).toFixed(2)}`;
        domElements.floating.color.textContent = product.color;
        domElements.floating.size.textContent = `${product.size} in`;
        domElements.floating.pages.textContent = `${product.pages} pages`;

        // Обновляем ссылки на Amazon
        const mainButton = domElements.buttons.main;
        const floatingButton = domElements.buttons.floating;

        if (product.link) {
            mainButton.onclick = () => window.open(product.link, "_blank");
            floatingButton.onclick = () => window.open(product.link, "_blank");
        }

        // Добавляем отображение похожих товаров
        renderSimilarItems(allProducts, product);
    }

    function renderSimilarItems(allProducts, currentProduct) {
        const grid = document.getElementById("item_grid");
        const template = document.getElementById("item_template");

        if (!template || !grid) {
            console.error("Ошибка: Шаблон или грид не найден!");
            return;
        }

        grid.innerHTML = ""; // Очищаем контейнер

        // Группируем товары по коллекции и цвету и сразу фильтруем текущий товар
        const uniqueItems = allProducts.reduce((acc, item) => {
            const key = `${item.collection}_${item.color.toLowerCase()}`;
            // Проверяем не только цвет и коллекцию, но и минимальную цену для каждой группы
            if (!acc.has(key) || parseFloat(acc.get(key).price) > parseFloat(item.price)) {
                acc.set(key, item);
            }
            return acc;
        }, new Map());

        // Преобразуем Map обратно в массив, исключаем текущий товар и сортируем по цене
        const similarItems = Array.from(uniqueItems.values())
            .filter(item => item.color !== currentProduct.color)
            .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        similarItems.forEach((item) => {
            const clone = template.content.cloneNode(true);
            const itemElement = clone.querySelector(".item");
            const imageContainer = clone.querySelector(".item_image");

            itemElement.setAttribute("data-color", item.color.toLowerCase());
            imageContainer.style.backgroundImage = `url(${item.frontImage})`;

            clone.querySelector(".item_title").textContent = item.title;
            clone.querySelector(".item_price").textContent = `$${parseFloat(item.price).toFixed(2)}`;

            // Добавляем зоны наведения
            const hoverLeft = clone.querySelector(".image-hover-zone.left");
            const hoverCenter = clone.querySelector(".image-hover-zone.center");
            const hoverRight = clone.querySelector(".image-hover-zone.right");

            hoverLeft.addEventListener("mouseenter", () => {
                imageContainer.style.backgroundImage = `url(${item.frontImage})`;
            });

            hoverCenter.addEventListener("mouseenter", () => {
                imageContainer.style.backgroundImage = `url(${item.insideImage})`;
            });

            hoverRight.addEventListener("mouseenter", () => {
                imageContainer.style.backgroundImage = `url(${item.backImage})`;
            });

            imageContainer.addEventListener("mouseleave", () => {
                imageContainer.style.backgroundImage = `url(${item.frontImage})`;
            });

            itemElement.addEventListener("click", () => {
                // Ищем товар с минимальной ценой для данного цвета
                const cheapestVariant = allProducts
                    .filter(prod => prod.color === item.color)
                    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))[0];
                
                const originalIndex = allProducts.indexOf(cheapestVariant);
                window.location.href = `/product/?id=${originalIndex + 1}`;
            });

            grid.appendChild(clone);
        });
    }

    function setupFilterListeners() {
        const filterTypes = ['color', 'layout', 'pages', 'size'];
        const filterSelectors = {
            'color': '.color-layout-filter-btn',
            'layout': '.layout-filter-btn',
            'pages': '.pages-filter-btn',
            'size': '.size-filter-btn'
        };

        let currentFilters = {
            color: currentProduct.color.toLowerCase(),
            layout: currentProduct.style.toLowerCase(),
            pages: currentProduct.pages,
            size: currentProduct.size
        };

        // Добавляем слушатели для всех фильтров
        filterTypes.forEach(type => {
            document.querySelectorAll(filterSelectors[type]).forEach(button => {
                button.addEventListener('click', () => {
                    const filterValue = button.getAttribute('data-filter');
                    currentFilters[type] = filterValue;

                    const matchingProduct = allProducts.find(product => {
                        return product.color.toLowerCase() === currentFilters.color &&
                               product.style.toLowerCase() === currentFilters.layout &&
                               product.pages === currentFilters.pages &&
                               product.size.toLowerCase() === currentFilters.size.toLowerCase();
                    });

                    if (matchingProduct) {
                        currentProduct = matchingProduct;
                        updateProductDisplay(matchingProduct);
                        updateFilterButtonsState(matchingProduct);
                        
                        const newId = allProducts.indexOf(matchingProduct) + 1;
                        const newUrl = new URL(window.location.href);
                        newUrl.searchParams.set('id', newId);
                        window.history.replaceState(null, '', newUrl);
                    }
                });
            });
        });
    }

    // Логика появления и исчезновения плавающего блока
    const floatingBlock = document.querySelector(".fade-in-bottom");
    const footer = document.getElementById("footer-container");
    const triggerHeight = window.innerHeight;

    function handleScroll() {
        const footerRect = footer.getBoundingClientRect();
        const shouldHide = footerRect.top < window.innerHeight;

        if (window.scrollY > triggerHeight && !shouldHide) {
            floatingBlock.classList.add("visible");
        } else {
            floatingBlock.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", handleScroll);

    // При инициализации страницы
    window.onload = function() {
        // Добавляем обработчик события popstate
        window.addEventListener('popstate', function(event) {
            // Перенаправляем на главную страницу
            window.location.href = '/'; // Замените на ваш URL главной страницы
        });
    }
});