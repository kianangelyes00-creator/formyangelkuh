$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var btn_music = $("#music-toggle");

  var musicPlaying = false;
  var musicEnabled = true;

  // Replace with your MP3 path (can be outside folder or online URL)
  var bgAudio = new Audio("papahiram.mp3"); // <-- update path if needed
  bgAudio.loop = true;
  bgAudio.volume = 0.15;

  function startMusic() {
    if (musicPlaying) return;
    musicPlaying = true;
    btn_music.addClass("active");
    if (musicEnabled) {
      bgAudio.play().catch(function (err) {
        console.warn("Audio playback failed:", err);
      });
    }
  }

  function stopMusic() {
    musicPlaying = false;
    btn_music.removeClass("active");
    bgAudio.pause();
    bgAudio.currentTime = 0;
  }

  // Music toggle button
  btn_music.click(function (e) {
    e.stopPropagation();
    musicEnabled = !musicEnabled;
    if (musicEnabled && envelope.hasClass("open")) {
      startMusic();
    } else {
      stopMusic();
    }
    btn_music.toggleClass("muted", !musicEnabled);
    btn_music.html(musicEnabled ? "&#9835; Music" : "&#9835; Muted");
  });

  // Envelope open/close
  envelope.click(open);
  btn_open.click(open);
  btn_reset.click(close);

  function open() {
    envelope.addClass("open").removeClass("close");
    if (musicEnabled) startMusic();
  }

  function close() {
    envelope.addClass("close").removeClass("open");
    stopMusic();
  }
});
