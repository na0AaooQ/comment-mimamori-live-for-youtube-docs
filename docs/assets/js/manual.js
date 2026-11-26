"use strict";

function initializeImageLightbox() {
  const dialog = document.querySelector(".manual-lightbox");
  const instructions = document.querySelector(".manual-image-instructions");
  const closeButton = dialog?.querySelector(".manual-lightbox-close");
  const errorMessage = dialog?.querySelector(".manual-lightbox-error");
  if (typeof dialog?.showModal !== "function" || !instructions || !closeButton || !errorMessage) {
    return;
  }

  const image = document.createElement("img");
  image.className = "manual-lightbox-image";
  image.alt = "";
  image.hidden = true;
  errorMessage.before(image);

  const page = document.documentElement;
  let trigger = null;
  let scrollX = 0;
  let scrollY = 0;
  let backdropPointer = null;
  let backdropClick = false;

  function resetLightbox() {
    const previousTrigger = trigger;
    trigger = null;
    backdropPointer = null;
    backdropClick = false;
    image.removeAttribute("src");
    image.alt = "";
    image.hidden = true;
    errorMessage.hidden = true;
    page.classList.remove("manual-lightbox-open");
    if (previousTrigger) {
      window.scrollTo(scrollX, scrollY);
      previousTrigger.focus({ preventScroll: true });
    }
  }

  function closeLightbox() {
    dialog.close();
    resetLightbox();
  }

  function openLightbox(button, original) {
    if (trigger) return;

    trigger = button;
    scrollX = window.scrollX;
    scrollY = window.scrollY;
    try {
      dialog.showModal();
      page.classList.add("manual-lightbox-open");
      image.alt = original.alt;
      image.src = original.currentSrc || original.src;
      closeButton.focus();
    } catch {
      closeLightbox();
    }
  }

  function isBackdrop(event) {
    if (event.target !== dialog) return false;

    const bounds = dialog.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX >= bounds.right ||
      event.clientY < bounds.top || event.clientY >= bounds.bottom;
  }

  image.addEventListener("load", () => {
    if (dialog.open) image.hidden = false;
  });
  image.addEventListener("error", () => {
    if (!dialog.open) return;

    image.hidden = true;
    errorMessage.hidden = false;
  });
  closeButton.addEventListener("click", closeLightbox);
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeLightbox();
  });
  dialog.addEventListener("close", () => {
    if (!dialog.open && trigger) resetLightbox();
  });
  dialog.addEventListener("pointerdown", (event) => {
    backdropClick = false;
    backdropPointer = event.button === 0 && isBackdrop(event) ? event.pointerId : null;
  });
  dialog.addEventListener("pointerup", (event) => {
    backdropClick = backdropPointer === event.pointerId && isBackdrop(event);
    backdropPointer = null;
  });
  dialog.addEventListener("pointercancel", () => {
    backdropPointer = null;
    backdropClick = false;
  });
  dialog.addEventListener("click", (event) => {
    if (backdropClick && isBackdrop(event)) closeLightbox();
    backdropClick = false;
  });

  const figures = [...document.querySelectorAll(".manual-figure > img")];
  const controls = figures.map((original) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "manual-image-button";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-label", `${dialog.dataset.enlargeLabel} — ${original.alt}`);
    button.addEventListener("click", () => openLightbox(button, original));
    return { original, button };
  });

  try {
    for (const { original, button } of controls) {
      original.replaceWith(button);
      button.append(original);
    }
    instructions.hidden = false;
  } catch {
    for (const { original, button } of controls) {
      if (button.isConnected) button.replaceWith(original);
    }
  }
}

function initializeVideos() {
  if (location.protocol !== "https:" && location.protocol !== "http:") return;

  const approvedIds = new Set(["lO5F2GKgUY8", "ha44KRAgjh4", "zoMa8pCGfPg"]);
  for (const video of document.querySelectorAll(".manual-video")) {
    const id = video.dataset.videoId;
    const title = video.querySelector("h3")?.textContent.trim();
    const stage = video.querySelector(".manual-video-stage");
    const placeholder = stage?.querySelector(".manual-video-placeholder");
    const action = placeholder?.querySelector(".manual-video-action");
    const button = action?.querySelector(".manual-video-button");
    const directLink = video.querySelector(".manual-video-link a");
    if (!approvedIds.has(id) || !title || !button || !directLink) continue;

    button.addEventListener("click", () => {
      if (button.disabled) return;

      function showDirectLink() {
        action.hidden = true;
        directLink.focus();
      }

      if (stage.getBoundingClientRect().width < 200) {
        showDirectLink();
        return;
      }

      button.disabled = true;
      let player;
      try {
        const url = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
        url.searchParams.set("origin", location.origin);
        url.searchParams.set("autoplay", "0");
        url.searchParams.set("playsinline", "1");

        player = document.createElement("iframe");
        player.className = "manual-video-frame";
        player.title = title;
        player.referrerPolicy = "strict-origin-when-cross-origin";
        player.allowFullscreen = true;
        player.allow = "encrypted-media; picture-in-picture; fullscreen";
        player.src = url.href;
        stage.replaceChild(player, placeholder);
      } catch {
        showDirectLink();
        return;
      }
      player.focus({ preventScroll: true });
    });
    action.hidden = false;
  }
}

for (const initialize of [initializeImageLightbox, initializeVideos]) {
  try {
    initialize();
  } catch (error) {
    // A failed enhancement must not prevent the other one from starting.
    console.error(error);
  }
}
