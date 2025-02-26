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

    function updateFilterButtonsState(product) {
        // Сбрасываем все кнопки
        document.querySelectorAll('.color-layout-filter-btn, .layout-filter-btn, .pages-filter-btn, .size-filter-btn')
            .forEach(btn => {
                btn.classList.remove('active-filter');
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
                if (type === 'color') {
                    button.style.backgroundColor = colorMap[product.color.toLowerCase()] || 'var(--color-black)';
                    button.style.color = 'white';
                    
                    // Окрашиваем активные кнопки других фильтров в цвет выбранного цвета
                    document.querySelectorAll('.layout-filter-btn.active-filter, .pages-filter-btn.active-filter, .size-filter-btn.active-filter')
                        .forEach(btn => {
                            btn.style.backgroundColor = colorMap[product.color.toLowerCase()] || 'var(--color-black)';
                            btn.style.color = 'white';
                        });
                } else {
                    button.style.backgroundColor = colorMap[product.color.toLowerCase()] || 'var(--color-black)';
                    button.style.color = 'white';
                }
            }
        });
    }

    function updateProductDisplay(product) {
        // Обновляем изображения
        document.getElementById("product-image-1").src = product.frontImage;
        document.getElementById("product-image-2").src = product.insideImage;
        document.getElementById("product-image-3").src = product.backImage;

        // Обновляем основной блок
        document.getElementById("product-title-main").textContent = product.title;
        document.getElementById("product-style-main").textContent = product.style;
        document.getElementById("product-price-main").textContent = `$${parseFloat(product.price).toFixed(2)}`;
        document.getElementById("product-color-main").textContent = product.color;
        document.getElementById("product-size-main").textContent = `${product.size} in`;
        document.getElementById("product-pages-main").textContent = `${product.pages} pages`;

        // Обновляем плавающий блок
        document.getElementById("product-title-floating").textContent = product.title;
        document.getElementById("product-style-floating").textContent = product.style;
        document.getElementById("product-price-floating").textContent = `$${parseFloat(product.price).toFixed(2)}`;
        document.getElementById("product-color-floating").textContent = product.color;
        document.getElementById("product-size-floating").textContent = `${product.size} in`;
        document.getElementById("product-pages-floating").textContent = `${product.pages} pages`;

        // Обновляем ссылки на Amazon
        const mainButton = document.getElementById("add-to-cart-btn");
        const floatingButton = document.getElementById("add-to-cart-btn-floating");

        if (product.link) {
            mainButton.onclick = () => window.open(product.link, "_blank");
            floatingButton.onclick = () => window.open(product.link, "_blank");
        }
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
                        window.history.pushState({}, '', newUrl);
                    }
                });
            });
        });
    }

    // Логика появления и исчезновения плавающего блока
    const floatingBlock = document.querySelector(".fade-in-bottom");
    const footer = document.getElementById("footer-container");
    const triggerHeight = window.innerHeight / 2;

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
});