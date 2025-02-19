document.addEventListener("DOMContentLoaded", function () {
    function updatePadding() {
        const header = document.querySelector("header");
        if (header) {
            document.body.style.paddingTop = `${header.offsetHeight}px`;
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