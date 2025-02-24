document.addEventListener("DOMContentLoaded", function () {
    const colorMap = {
        red: "var(--color-brand-red)",
        blue: "var(--color-brand-blue)",
        green: "var(--color-brand-green)",
        yellow: "var(--color-brand-yellow)",
        orange: "var(--color-brand-orange)",
        purple: "var(--color-brand-purple)",
        pink: "var(--color-brand-pink)"
    };

    let currentColor = "all";
    let currentLayout = "all";
    let currentPages = "all";
    let currentSize = "all";

    function updateActiveFilter(buttons, activeButton) {
        buttons.forEach(btn => {
            btn.classList.remove("active-filter");

            const filter = btn.getAttribute("data-filter");

            // Если это кнопка "All", она черная только если активна
            if (filter === "all") {
                btn.style.backgroundColor = currentColor === "all" ? "var(--color-black)" : "var(--background-primary)";
                btn.style.color = currentColor === "all" ? "white" : "var(--text-primary)";
            } else {
                btn.style.backgroundColor = "var(--background-primary)";
                btn.style.color = "var(--text-primary)";
            }
        });

        activeButton.classList.add("active-filter");

        const selectedFilter = activeButton.getAttribute("data-filter");
        if (selectedFilter !== "all" && colorMap[selectedFilter]) {
            activeButton.style.backgroundColor = colorMap[selectedFilter];
            activeButton.style.color = "white";
        }
    }

    function updateLayoutFilterColor() {
        document.querySelectorAll(".layout-filter-btn").forEach(btn => {
            if (btn.getAttribute("data-filter") === currentLayout) {
                btn.style.backgroundColor = currentColor !== "all" ? colorMap[currentColor] : "var(--color-black)";
                btn.style.color = "white";
            } else {
                btn.style.backgroundColor = "var(--background-primary)";
                btn.style.color = "var(--text-primary)";
            }
        });
    }

    function updatePagesFilterColor() {
        document.querySelectorAll(".pages-filter-btn").forEach(btn => {
            if (btn.getAttribute("data-filter") === currentPages) {
                btn.style.backgroundColor = currentColor !== "all" ? colorMap[currentColor] : "var(--color-black)";
                btn.style.color = "white";
            } else {
                btn.style.backgroundColor = "var(--background-primary)";
                btn.style.color = "var(--text-primary)";
            }
        });
    }

    function updateSizeFilterColor() {
        document.querySelectorAll(".size-filter-btn").forEach(btn => {
            if (btn.getAttribute("data-filter") === currentSize) {
                btn.style.backgroundColor = currentColor !== "all" ? colorMap[currentColor] : "var(--color-black)";
                btn.style.color = "white";
            } else {
                btn.style.backgroundColor = "var(--background-primary)";
                btn.style.color = "var(--text-primary)";
            }
        });
    }

    // Фильтр по цвету
    document.querySelectorAll(".color-layout-filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            currentColor = button.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".color-layout-filter-btn"), button);
            updateLayoutFilterColor();
            updatePagesFilterColor();
            updateSizeFilterColor();
        });
    });

    // Фильтр по Layout
    document.querySelectorAll(".layout-filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            currentLayout = button.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".layout-filter-btn"), button);
            updateLayoutFilterColor();
            updatePagesFilterColor();
            updateSizeFilterColor();
        });
    });

    // Фильтр по Pages
    document.querySelectorAll(".pages-filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            currentPages = button.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".pages-filter-btn"), button);
            updateLayoutFilterColor();
            updatePagesFilterColor();
            updateSizeFilterColor();
        });
    });

    // Фильтр по Size
    document.querySelectorAll(".size-filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            currentSize = button.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".size-filter-btn"), button);
            updateLayoutFilterColor();
            updatePagesFilterColor();
            updateSizeFilterColor();
        });
    });

    // ✅ Обновление при загрузке
    window.addEventListener("load", function () {
        const activeColorBtn = document.querySelector(".color-layout-filter-btn.active-filter") || document.querySelector(".color-layout-filter-btn[data-filter='all']");
        const activeLayoutBtn = document.querySelector(".layout-filter-btn.active-filter") || document.querySelector(".layout-filter-btn[data-filter='all']");
        const activePagesBtn = document.querySelector(".pages-filter-btn.active-filter") || document.querySelector(".pages-filter-btn[data-filter='all']");
        const activeSizeBtn = document.querySelector(".size-filter-btn.active-filter") || document.querySelector(".size-filter-btn[data-filter='all']");

        if (activeColorBtn) {
            currentColor = activeColorBtn.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".color-layout-filter-btn"), activeColorBtn);
        }

        if (activeLayoutBtn) {
            currentLayout = activeLayoutBtn.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".layout-filter-btn"), activeLayoutBtn);
        }

        if (activePagesBtn) {
            currentLayout = activePagesBtn.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".pages-filter-btn"), activePagesBtn);
        }

        if (activeSizeBtn) {
            currentLayout = activeSizeBtn.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".size-filter-btn"), activeSizeBtn);
        }

        updateLayoutFilterColor();
        updatePagesFilterColor();
        updateSizeFilterColor();
    });
});