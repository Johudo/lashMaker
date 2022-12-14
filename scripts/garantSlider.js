(() => {
    const sliderItems = Array.from(document.getElementsByClassName("garant-slider__item"));
    const sliderItemCount = sliderItems.length;

    let counter = 1;

    const garantSliderGap = 40;

    const appElement = document.documentElement;

    const prevButton = document.getElementById("garant-slider-left-button");
    const nextButton = document.getElementById("garant-slider-right-button");

    const counterBlock = document.getElementById("garant-slider-status-counter");

    const getSliderItemWidth = () => {
        const rect = appElement.getBoundingClientRect();
        return rect.width - 20 > 680 ? 680 : rect.width - 20;
    };

    const updateSliderItemSize = () => {
        const itemWidth = getSliderItemWidth();
        const itemHeight = itemWidth * 0.5;

        sliderItems.forEach((item) => {
            item.style.width = itemWidth + "px";
            item.style.height = itemHeight + "px";
        });
    };

    window.addEventListener("resize", updateSliderItemSize);
    updateSliderItemSize();

    const changeSliderState = (countDifference) => {
        let newCounterValue = counter + countDifference;
        if (newCounterValue <= 0 || newCounterValue >= sliderItemCount + 1) return;

        counterBlock.innerText = "0" + newCounterValue;

        appElement.style.setProperty("--garant-slider-status-line-width", `${newCounterValue * 25}%`);

        appElement.style.setProperty(
            "--garant-slider-item-translate",
            `${-1 * ((newCounterValue - 1) * (getSliderItemWidth() + garantSliderGap))}px`
        );

        counter = newCounterValue;
    };

    nextButton.addEventListener("click", () => changeSliderState(1));
    prevButton.addEventListener("click", () => changeSliderState(-1));
})();
