const howler = require('howler');
const Mousetrap = require('mousetrap');
const $ = require('jquery');
const ScrollMagic = require('scrollmagic');
require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators');
$(document).ready(function ($) {

navigator.webkitGetUserMedia({video: true},
  function(stream) {
    document.getElementById('camera').src = URL.createObjectURL(stream);
  },
  function() {
    alert("You don't have a camera! :( ");
  }
);



var controller = new ScrollMagic.Controller();

var shower = new Howl({
    src: ['../assets/sounds/shower.mp3'],
    volume: 0.8,
    loop: true,
})

shower.play()


var playing = false
// Audio
var psycho = new Howl({
    src: ['../assets/sounds/psycho-theme.mp3'],
    volume: 1.5,
    loop: true,
    onplay: function() {
      playing = true
    },
    onend: function() {
      console.log('Finished hitchcock!');
      playing = false
    }
});

new ScrollMagic.Scene({
  triggerElement: '#psy'
})
.on('enter', function(){
  console.log('Entered psycho');
  shower.fade(0.5, 0, 1000);
  psycho.volume(1);
  psycho.play();
})
.on("leave", function(ev){
  console.log('Left Meaning')
  shower.fade(0,0.8,1000);
  //chorale.stop();
  psycho.fade(1, 0, 1000);
  psycho.stop();
})
//.addIndicators()
.addTo(controller)

});

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
