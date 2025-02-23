document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-bg]").forEach(el => {
        const imageUrl = el.getAttribute("data-bg");
        if (imageUrl) {
            el.style.backgroundImage = `url(${imageUrl})`;
        }
    });
});