(() => {
  const galleryImages = Array.from(
    document.querySelectorAll("[data-animated][data-poster]")
  );
  const motionButton = document.querySelector("#motion-toggle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setMotion = (paused) => {
    galleryImages.forEach((image) => {
      const target = paused ? image.dataset.poster : image.dataset.animated;
      if (target && image.getAttribute("src") !== target) {
        image.setAttribute("src", target);
      }
    });

    if (motionButton) {
      motionButton.setAttribute("aria-pressed", String(paused));
      motionButton.textContent = paused ? "Play animations" : "Pause animations";
    }
  };

  galleryImages.forEach((image) => {
    image.addEventListener("error", () => {
      const poster = image.dataset.poster;
      if (poster && !image.src.endsWith(poster)) {
        image.src = poster;
      }
    });
  });

  let paused = reducedMotion.matches;
  setMotion(paused);

  motionButton?.addEventListener("click", () => {
    paused = !paused;
    setMotion(paused);
  });

  reducedMotion.addEventListener?.("change", (event) => {
    if (event.matches) {
      paused = true;
      setMotion(true);
    }
  });

  const copyButton = document.querySelector("#copy-citation");
  const citation = document.querySelector("#bibtex");
  const copyStatus = document.querySelector("#copy-status");

  copyButton?.addEventListener("click", async () => {
    if (!citation || !copyStatus) return;

    try {
      await navigator.clipboard.writeText(citation.textContent.trim());
      copyStatus.textContent = "BibTeX copied.";
      window.setTimeout(() => {
        copyStatus.textContent = "";
      }, 2400);
    } catch {
      copyStatus.textContent = "Select the citation text and copy it manually.";
    }
  });
})();
