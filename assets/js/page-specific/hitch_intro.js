var playing = false
// Audio
var hitchcock = new Howl({
    src: ['../assets/sounds/Hitchcock_presents.mp3'],
    volume: 0.4,
    onplay: function() {
      playing = true
    },
    onend: function() {
      console.log('Finished hitchcock!');
      playing = false
    }
});

new ScrollMagic.Scene({
  triggerElement: '.trigger-ambient'
})
.on('enter', function(){
  console.log('PLAYED HITCHCOCK THEME')
  if (playing == false) {
    hitchcock.play()
  }
})
//.addIndicators()
.addTo(controller)
