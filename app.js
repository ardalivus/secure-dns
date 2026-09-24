(() => {
  const androidButton = document.getElementById("android-download");
  const iosButton = document.getElementById("ios-download");
  const primary = document.getElementById("primary-download");
  const note = document.getElementById("device-note");
  const meta = document.getElementById("android-release-meta");

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

  fetch("https://api.github.com/repos/ardalivus/secure-dns/releases/latest", {
    headers: { "Accept": "application/vnd.github+json" }
  })
    .then((r) => {
      if (!r.ok) throw new Error("No published release");
      return r.json();
    })
    .then((release) => {
      const apk = (release.assets || []).find((asset) =>
        /\.apk$/i.test(asset.name)
      );
      if (!apk) throw new Error("Release has no APK");
      androidButton.href = apk.browser_download_url;
      meta.textContent = `${release.name || release.tag_name} · ${formatBytes(apk.size)}`;
      if (isAndroid) primary.href = apk.browser_download_url;
    })
    .catch(() => {
      meta.textContent = "APK release is not published yet. The button opens the Releases page.";
    });

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return "APK";
    const units = ["B", "KB", "MB", "GB"];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / Math.pow(1024, i)).toFixed(i > 1 ? 1 : 0)} ${units[i]}`;
  }
})();