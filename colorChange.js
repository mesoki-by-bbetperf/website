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
        document.querySelectorAll(".filter-btn").forEach(btn => {
            if (btn.getAttribute("data-filter") === currentLayout) {
                btn.style.backgroundColor = currentColor !== "all" ? colorMap[currentColor] : "var(--color-black)";
                btn.style.color = "white";
            } else {
                btn.style.backgroundColor = "var(--background-primary)";
                btn.style.color = "var(--text-primary)";
            }
        });
    }

    // Фильтр по цвету
    document.querySelectorAll(".color-filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            currentColor = button.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".color-filter-btn"), button);
            updateLayoutFilterColor();
        });
    });

    // Фильтр по Layout
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            currentLayout = button.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".filter-btn"), button);
            updateLayoutFilterColor();
        });
    });

    // ✅ Обновление при загрузке
    window.addEventListener("load", function () {
        const activeColorBtn = document.querySelector(".color-filter-btn.active-filter") || document.querySelector(".color-filter-btn[data-filter='all']");
        const activeLayoutBtn = document.querySelector(".filter-btn.active-filter") || document.querySelector(".filter-btn[data-filter='all']");

        if (activeColorBtn) {
            currentColor = activeColorBtn.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".color-filter-btn"), activeColorBtn);
        }

        if (activeLayoutBtn) {
            currentLayout = activeLayoutBtn.getAttribute("data-filter");
            updateActiveFilter(document.querySelectorAll(".filter-btn"), activeLayoutBtn);
        }

        updateLayoutFilterColor();
    });
});