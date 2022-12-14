(() => {
    const appHeight = () => {
        const doc = document.documentElement;

        console.log(window.innerWidth);
        doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };

    window.addEventListener("resize", appHeight);
    appHeight();
})();
