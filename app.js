(() => {
  const androidButton = document.getElementById("android-download");
  const iosButton = document.getElementById("ios-download");
  const primary = document.getElementById("primary-download");
  const note = document.getElementById("device-note");

  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isAndroid) {
    primary.textContent = "Download for Android";
    primary.href = androidButton.href;
    note.textContent = "Android detected. The app changes DNS only; normal traffic stays direct.";
  } else if (isIOS) {
    primary.textContent = "Install on iPhone / iPad";
    primary.href = iosButton.href;
    note.textContent = "iPhone or iPad detected. Installation uses a small configuration profile.";
  }
})();