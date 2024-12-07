(() => {
    const openMenuButton = document.getElementById("header-mobile-open-button");
    const closeMenuButton = document.getElementById("header-mobile-close-button");
    const headerDesktop = document.getElementById("header-desktop");
    const linksList = document.getElementsByClassName("header-desktop__nav-list-item");

    openMenuButton.addEventListener("click", () => headerDesktop.classList.remove("hidden"));
    closeMenuButton.addEventListener("click", () => headerDesktop.classList.add("hidden"));

    Array.from(linksList).forEach((item) =>
        item.addEventListener("click", () => headerDesktop.classList.add("hidden"))
    );

    // Disable scroll
    const wheelOpt = window.supportsPassive ? { passive: false } : false;

    // older FF
    headerDesktop.addEventListener("DOMMouseScroll", (e) => e.preventDefault(), false);
    // modern desktop
    headerDesktop.addEventListener("wheel", (e) => e.preventDefault(), wheelOpt);
    // modern desktop
    headerDesktop.addEventListener("mousewheel", (e) => e.preventDefault(), wheelOpt);
    // mobile
    headerDesktop.addEventListener("touchmove", (e) => e.preventDefault(), wheelOpt);
    headerDesktop.addEventListener("keydown", (e) => e.preventDefault(), false);
})();
