document.addEventListener("DOMContentLoaded", function () {
    function updatePadding() {
        const header = document.querySelector("header");
        if (header) {
            document.body.style.paddingTop = `${header.offsetHeight}px`;
            document.body.style.transition = `padding-top 0.3s ease`;
            document.body.style.minHeight = `calc(100vh - ${header.offsetHeight}px)`;
            console.log("Обновлена высота хедера:", header.offsetHeight);
        }
    }

    // Следим за изменением размеров экрана
    window.addEventListener("resize", updatePadding);

    // Следим за появлением хедера в DOM
    const observer = new MutationObserver(() => {
        if (document.querySelector("header")) {
            updatePadding();
            observer.disconnect(); // Остановить наблюдение после загрузки хедера
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});