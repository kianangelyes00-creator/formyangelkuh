$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var btn_music = $("#music-toggle");

  var musicPlaying = false;
  var musicEnabled = true;

  // MP3 background music
  var bgAudio = new Audio("assets/music/background.mp3");
  bgAudio.loop = true;
  bgAudio.volume = 0.15;

  function startMusic() {
    if (musicPlaying) return;
    musicPlaying = true;
    btn_music.addClass("active");
    if (musicEnabled) {
      bgAudio.play().catch(function(err){
        console.log("Audio play blocked by browser:", err);
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
    } else if (!musicEnabled) {
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
