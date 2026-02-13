$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var btn_music = $("#music-toggle");

  var musicPlaying = false;
  var musicEnabled = true;

  // ADD YOUR MP3 HERE
  var audio = new Audio("assets/music/background.mp3");
  audio.loop = true;
  audio.volume = 0.15;

  function startMusic() {
    if (musicPlaying) return;
    musicPlaying = true;
    btn_music.addClass("active");
    audio.play();
  }

  function stopMusic() {
    musicPlaying = false;
    btn_music.removeClass("active");
    audio.pause();
    audio.currentTime = 0;
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

  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close();
  });

  function open() {
    envelope.addClass("open").removeClass("close");
    if (musicEnabled) {
      startMusic();
    }
  }
  function close() {
    envelope.addClass("close").removeClass("open");
    stopMusic();
  }
});
