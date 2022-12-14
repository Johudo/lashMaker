(() => {
    const counterBlock = document.getElementById("results-slider-current-count");

    const prevButton = document.getElementById("results-slider-left-button");
    const nextButton = document.getElementById("results-slider-right-button");

    const imagesCount = 8;
    const animationDuration = 300;
    let counter = 1;

    const changeSliderState = (countDifference) => {
        let newCounterValue = (imagesCount + (counter + countDifference)) % imagesCount;
        if (newCounterValue === 0) newCounterValue = imagesCount;

        counterBlock.innerText = "0" + newCounterValue;

        const prevImage = document.getElementById("results-slider-image-" + counter);
        const newImage = document.getElementById("results-slider-image-" + newCounterValue);

        newImage.style.zIndex = "2";
        newImage.style.visibility = "visible";
        newImage.style.opacity = "1";

        setTimeout(() => {
            prevImage.style.visibility = "hidden";
            prevImage.style.opacity = "0";

            setTimeout(() => {
                newImage.style.zIndex = "1";
            }, animationDuration);
        }, animationDuration);

        counter = newCounterValue;
    };

    nextButton.addEventListener("click", () => changeSliderState(1));
    prevButton.addEventListener("click", () => changeSliderState(-1));
})();
