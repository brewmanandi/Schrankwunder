const comparisonSliders = document.querySelectorAll("[data-comparison]");

comparisonSliders.forEach((slider) => {
  const range = slider.querySelector("[data-comparison-range]");

  const setPosition = (value) => {
    const position = Math.max(0, Math.min(100, Number(value)));
    slider.style.setProperty("--position", `${position}%`);
    range.value = String(position);
  };

  const positionFromPointer = (event) => {
    const rect = slider.getBoundingClientRect();
    const x = event.clientX - rect.left;
    return (x / rect.width) * 100;
  };

  const onPointerMove = (event) => {
    if (event.buttons === 0 && event.type === "pointermove") return;
    setPosition(positionFromPointer(event));
  };

  range.addEventListener("input", () => setPosition(range.value));

  slider.addEventListener("pointerdown", (event) => {
    slider.setPointerCapture(event.pointerId);
    onPointerMove(event);
  });

  slider.addEventListener("pointermove", onPointerMove);
  slider.addEventListener("pointerup", (event) => {
    if (slider.hasPointerCapture(event.pointerId)) {
      slider.releasePointerCapture(event.pointerId);
    }
  });

  setPosition(range.value);
});
