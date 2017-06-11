const howler = require('howler')

navigator.webkitGetUserMedia({video: true},
  function(stream) {
    document.getElementById('camera').src = URL.createObjectURL(stream);
  },
  function() {
    alert('could not connect stream');
  }
);

new Howl({
    src: ['../assets/sounds/orchestra_warmup.mp3'],
    volume: 0.4,
}).play();
