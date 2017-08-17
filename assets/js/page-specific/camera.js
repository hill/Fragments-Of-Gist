const howler = require('howler');
const Mousetrap = require('mousetrap');

navigator.webkitGetUserMedia({video: true},
  function(stream) {
    document.getElementById('camera').src = URL.createObjectURL(stream);
  },
  function() {
    alert('could not connect stream');
  }
);

new Howl({
    src: ['../assets/sounds/psycho-theme.mp3'],
    volume: 1.5,
    loop: true,
}).play();

// Shortcuts (Not DRY but I don't give a shit...this is due in 1 day)

// Go to end [cmd-e]
Mousetrap.bind(['command+e', 'ctrl+e'], function() {
  location = remote.app.getAppPath() + '/pages/end.html';
});

// Go to start [cmd-g]
Mousetrap.bind(['command+g', 'ctrl+g'], function() {
  location = remote.app.getAppPath() + '/index.html';
});

// Go back one scene [cmd-b]
Mousetrap.bind(['command+b', 'ctrl+b'], function() {
  window.history.back();
});

// get time in console [cmd-t] DEBUG
Mousetrap.bind(['command+t', 'ctrl+t'], function() {
  console.log((Date.now() - localStorage.getItem('startTime')) / (1000*60))
});

// mute [cmd-shift-m]
var muted = false;
Mousetrap.bind(['command+shift+m', 'ctrl+shift+m'], function(){
  if (!muted) {
    Howler.mute(true)
    muted = true
  } else {
    Howler.mute(false)
    muted = false
  }
})
