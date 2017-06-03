const remote = require("electron").remote;

document.addEventListener("keydown", function(event){

  switch (event.key) {
    case "Escape":
        if (remote.getCurrentWindow().isFullScreen()) {
            remote.getCurrentWindow().setFullScreen(false);
        }
        break;
     }
});

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
    triggerHook: 0.60
  })
  .on("enter", function(ev){
    $(ev.target.triggerElement()).removeClass('out');
  })
  .on("leave", function(ev){$(ev.target.triggerElement()).addClass('out');})
  .addIndicators()
  .addTo(controller);

});

// remove scroll hint on scroll

$(window).scroll(function(){
  $('.scrolldown').addClass('hide');
})

$('.container').removeClass('out');
