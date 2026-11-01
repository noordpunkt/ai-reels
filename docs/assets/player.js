(function () {
  const video = document.querySelector(".player video");
  if (!video) {
    return;
  }

  const next = video.getAttribute("data-next");
  video.addEventListener("ended", function () {
    if (next) {
      const url = new URL(next, window.location.href);
      url.searchParams.set("autoplay", "1");
      window.location.href = url.href;
    }
  });

  const params = new URLSearchParams(window.location.search);
  if (params.has("autoplay")) {
    const play = function () {
      const attempt = video.play();
      if (attempt && attempt.catch) {
        attempt.catch(function () {});
      }
    };
    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener("canplay", play, { once: true });
    }
  }
})();
