(async ({
    document,
    setTimeout,
    clearTimeout,
    addEventListener,
    installFont,
    Fireworks,
    Math
}) => {
    const { body } = document;

    await installFont(
        "Noto Sans JP",
        "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap');"
    );

    const isMobile = "ontouchend" in window;

    const touchText = document.createElement("div");
    touchText.innerText = isMobile ? "touch to start" : "click to start";
    touchText.classList.add("start");

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    overlay.appendChild(touchText);
    body.appendChild(overlay);

    const triggerKey = isMobile ? "touchend" : "click";
    overlay.addEventListener(triggerKey, () => {
        body.removeChild(overlay);
        
        const get_rect = () => [
            Math.min(1200, window.innerWidth),
            Math.min(400, window.innerHeight)
        ];

        const fireworks = Fireworks.init();
        fireworks.amount(7);
        
        document.body.appendChild(fireworks.view);

        const resize = () => requestAnimationFrame(() => fireworks.resize(...get_rect()));
        resize();

        let id;
        window.addEventListener('resize', () => {
            clearTimeout(id);
            id = setTimeout(resize, 100);
        });
        
        fireworks.start();
    });
})(window);
