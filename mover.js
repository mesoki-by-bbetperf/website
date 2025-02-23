document.addEventListener("DOMContentLoaded", function () {
    function updateLayout() {
        setTimeout(() => {
            const header = document.querySelector("header");
            if (header) {
                const headerHeight = header.getBoundingClientRect().height; // Точная высота хедера

                // Устанавливаем `padding-top` для body
                document.body.style.paddingTop = `${headerHeight}px`;
                document.body.style.minHeight = `calc(100vh - ${headerHeight}px)`;

                // Обновляем `scroll-margin-top` для элементов с `data-scroll-target`
                document.querySelectorAll("[data-scroll-target]").forEach(target => {
                    target.style.scrollMarginTop = `${headerHeight}px`; // Чуть больше для удобства
                });

                console.log("Обновлена высота хедера:", headerHeight);
            }
        }, 10); // Минимальная задержка для корректного расчёта в Safari
    }

    // Следим за изменением размеров экрана
    window.addEventListener("resize", updateLayout);

    // Следим за изменением размеров хедера (лучше, чем MutationObserver)
    const resizeObserver = new ResizeObserver(updateLayout);
    const header = document.querySelector("header");
    if (header) resizeObserver.observe(header);

    // Вызываем `updateLayout` после полной загрузки страницы
    window.addEventListener("load", updateLayout);
});