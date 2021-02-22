(function () {
    //pause previous video when a new video is played
    const video = document.getElementsByTagName("video");
    const audio = document.getElementsByTagName("audio");
    for (let i = 0; i < video.length; i++) {
        if ((!video[i].paused) && (!video[i].muted)) {
            video[i].pause();
        }
    }
    for (let i = 0; i < audio.length; i++) {
        if ((!audio[i].paused) && (!audio[i].muted)) {
            audio[i].pause();
        }
    }
    function unmute() {
        chrome.runtime.sendMessage({ mute: false });
        window.removeEventListener("focus", unmute);
    }
    if (video.length == 0 && audio.length == 0) {
        chrome.runtime.sendMessage({ mute: true });
        window.addEventListener("focus", unmute);
    }
})();