var playing = false
// Audio
var hitchcock = new Howl({
    src: ['../assets/sounds/Hitchcock_presents.mp3'],
    volume: 0.6,
    onplay: function() {
      playing = true
    },
    onend: function() {
      console.log('Finished hitchcock!');
      playing = false
    }
});

var chorale = new Howl({
  src: ['../assets/sounds/chorale.mp3']
})

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

new ScrollMagic.Scene({
  triggerElement: '.the_meaning'
})
.on('enter', function(){
  console.log('Entered Meaning');
  hitchcock.fade(0.6, 0, 1000);
  chorale.volume(1);
  chorale.play();
})
.on("leave", function(ev){
  console.log('Left Meaning')
  chorale.fade(1,0,1000);
  //chorale.stop();
  hitchcock.fade(0, 0.6, 1000);
})
//.addIndicators()
.addTo(controller)

new ScrollMagic.Scene({
  triggerElement: '#meaning_finish'
})
.on('enter', function() {
  console.log('Left Meaning')
  chorale.fade(1,0,1000);
  //chorale.stop();
  hitchcock.fade(0, 0.6, 1000);
})
.addTo(controller)

function getGreetingTime (m) {

	var g = null; //return g

	if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

	var split_afternoon = 12 //24hr time to split the afternoon
	var split_evening = 17 //24hr time to split the evening
	var currentHour = parseFloat(m.format("HH"));

	if(currentHour >= split_afternoon && currentHour <= split_evening) {
		g = "afternoon";
	} else if(currentHour >= split_evening) {
		g = "evening";
	} else {
		g = "morning";
	}

	return g;
}

$(".time").text(getGreetingTime(Moment()))
