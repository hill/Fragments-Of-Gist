const remote = require("electron").remote;
const $ = require('jquery');
const ScrollMagic = require('scrollmagic');
require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators');
const howler = require('howler');
const Moment = require('moment');
const Mousetrap = require('mousetrap');

// prevent zooming
require('electron').webFrame.setZoomLevelLimits(1, 1);

// Shortcuts

// Escape from full-screen mode [esc]
Mousetrap.bind(['esc'], function() {
  if (remote.getCurrentWindow().isFullScreen()) {
      remote.getCurrentWindow().setFullScreen(false);
  }
});

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

// ------- //

// Change to final scene if time = 18 minutes
const completeTime = 18 * 60 * 1000 // ms

setInterval(function(){
  if (Date.now() - localStorage.getItem('startTime') >= completeTime) {
    console.log('COMPLETED')
    location = remote.app.getAppPath() + '/pages/end.html'
  }
}, 5000)

// Page turns
function playPageTurn() {
  var sounds = ['../../assets/sounds/paper_turn.mp3', '../../assets/sounds/page_turn_2.mp3', '../../assets/sounds/page_turn_3.mp3']
  new Howl({
      src: sounds[Math.floor(Math.random()*sounds.length)],
      volume: 0.1,
  }).play()
}


// init controller
var controller = new ScrollMagic.Controller();

//flow
$(".flow").each(function(){
  $(this).addClass('out');
  new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook: 0.2, // pos of triggerHook on screen
    duration: 400
  })
  .on("enter", function(ev){$(ev.target.triggerElement()).removeClass('out');})
  .on("leave", function(ev){$(ev.target.triggerElement()).addClass('out');})
  //.addIndicators()
  .addTo(controller);
});

//fade
$(".fade").each(function(){
  $(this).addClass('out');
  new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook: 0.55
  })
  .on("enter", function(ev){
    $(ev.target.triggerElement()).removeClass('out');
  })
  .on("leave", function(ev){$(ev.target.triggerElement()).addClass('out');})
  //.addIndicators()
  .addTo(controller);

});

// remove scroll hint on scroll

$(window).scroll(function(){
  $('.scrolldown').addClass('hide');
})

$('.container').removeClass('out');

// check if scene is completed in localStorage
// TODO: Check if scenename is actually available at all (hitchcock intro)
if (localStorage.getItem(sceneName)) {
  // if this scene is completed, append a notification to start of sections, asking if they would like to skip.
  console.log('SCENE IS COMPLETED')
  showSkip(sceneProgression)
} else {
  // if not, set scene as completed once seen
  localStorage.setItem(sceneName, true)
}

function showSkip(buttons) {
  var the_body = "<div class='skip_dialogue narration'><p>Oh, It seems like you've alread read this part of my magnificent fiction.</p><p>I know how awfully deprived you people are of attention these days, so why don't we continue on the story. Unless, of course, you would like to read on?</p><div class='choice_container'>" + buttons + "</div></div>"

  $('.container').prepend(the_body);

}
