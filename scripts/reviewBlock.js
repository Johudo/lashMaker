(() => {
    const changeBlockStyles = (event) => {
        const womanImage = document.getElementById("fifth-section-woman");
        const button = document.getElementById("review-block-button");
        const reviewBlock = document.getElementById("review-block");
        const sectionBlock = document.getElementById("fifth-section");

        if (window.innerWidth < 1300) {
            button.style.height = "unset";
            sectionBlock.style.marginTop = "unset";
            return;
        }

        button.style.height = reviewBlock.getBoundingClientRect().height / 2 + "px";
        sectionBlock.style.marginTop =
            womanImage.getBoundingClientRect().height - reviewBlock.getBoundingClientRect().height / 2 + "px";
    };

    window.addEventListener("resize", changeBlockStyles);

    changeBlockStyles();

    // Fix position sometimes
    setTimeout(changeBlockStyles, 300);
})();
