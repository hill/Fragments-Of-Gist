const remote = require("electron").remote;
const $ = require('jquery');
const ScrollMagic = require('scrollmagic');
require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators');
const howler = require('howler');
const Moment = require('moment');

// prevent zooming
require('electron').webFrame.setZoomLevelLimits(1, 1);

// Shortcuts
document.addEventListener("keydown", function(event){

  switch (event.key) {
    case "Escape":
        if (remote.getCurrentWindow().isFullScreen()) {
            remote.getCurrentWindow().setFullScreen(false);
        }
        break;
     }
});

// Change to final scene if time = 18 minutes
const completeTime = 18 * 60 * 1000 // ms

setInterval(function(){
  console.log((Date.now() - localStorage.getItem('startTime')) / (1000*60))
  if (Date.now() - localStorage.getItem('startTime') >= completeTime) {
    console.log('COMPLETED')
    location = '../end.html'
  }
},5000)

// init controller
var controller = new ScrollMagic.Controller();

//flow
$(".flow").each(function(){
  $(this).addClass('out');
  new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook: 0, // pos of triggerHook on screen
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
