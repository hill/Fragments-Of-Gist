var order = 6;
var ngrams = {};
var count = 0;
var second_count = 0;
var lines, markov;
var quotes = 'A smooth long journey! Great expectations.\nA soft voice may be awfully persuasive.\nA truly rich life contains love and art in abundance.\nAccept something that you cannot change, and you will feel better.\nAdventure can be real happiness.\nAdvice is like kissing. It costs nothing and is a pleasant thing to do.\nAdvice, when most needed, is least heeded.\nAll the effort you are making will ultimately pay off.\nAll the troubles you have will pass away very quickly.\nAll will go well with your new project.\nAll your hard work will soon pay off.\nAllow compassion to guide your decisions.\nAn agreeable romance might begin to take on the appearance.\nAn important person will offer you support.\nAn inch of time is an inch of gold.\nAny decision you have to make tomorrow is a good decision.\nAt the touch of love, everyone becomes a poet.\nBe careful or you could fall for some tricks today.\nBeauty in its various forms appeals to you.\nBecause you demand more from yourself, others respect you deeply.\nBelieve in yourself and others will too.\nBelieve it can be done.\n'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  console.log(Math.floor(Math.random() * (max - min)) + min)
  return Math.floor(Math.random() * (max - min)) + min;
}

function preload() {
  lines = quotes.split('\n');
}

function setup() {

  noCanvas()

  markov = new MarkovGenerator(order,100);

  for (var i = 0; i < lines.length; i++) {
    markov.feed(lines[i])
  }

}


function markovIt(displayElement) {

  count += 1;
  console.log(count);

  if (count == 5) {
    console.log('Called at five')
    nextMsg('.showLater');
  }

  var scratches = ['../../assets/sounds/pen_scratch/pen_scratch_1.mp3','../../assets/sounds/pen_scratch/pen_scratch_2.mp3','../../assets/sounds/pen_scratch/pen_scratch_3.mp3','../../assets/sounds/pen_scratch/pen_scratch_4.mp3','../../assets/sounds/pen_scratch/pen_scratch_5.mp3']

  var prev = ''

  function getRandomScratchNotBefore() {
    var scratch = scratches[Math.floor(Math.random()*scratches.length)]
    if (scratch == prev) {
      getRandomScratchNotBefore()
    }
    prev = scratch
    return scratch
  }

  new Howl({
    src: getRandomScratchNotBefore(),
    volume: '0.03'
  }).play();

  var result = markov.generate()

  var element = document.createElement("p");
  element.appendChild(document.createTextNode(result));

  $('.' + displayElement).append(element);



}

function unspecificMarkov() {

  second_count += 1;

  if (second_count >= 3) {
    nextMsg('.showLaterOther');
  }

  order = Number($('#fader').val())
  markov = new MarkovGenerator(order,100);
  for (var i = 0; i < lines.length; i++) {
    markov.feed(lines[i])
  }
  markovIt("unspecific")
}

function nextMsg(the_element) {
  console.log('Called for: ' + the_element)
  $(the_element).removeClass('hidden')
  $(the_element).addClass('showit')
}



// ================ //
// Markov Generator //
// ================ //


Array.prototype.choice = function() {
  var i = floor(random(this.length));
  return this[i];
}

function MarkovGenerator(n, max) {
  // Order (or length) of each ngram
  this.n = n;
  // What is the maximum amount we will generate?
  this.max = max;
  // An object as dictionary
  // each ngram is the key, a list of possible next elements are the values
  this.ngrams = {};
  // A separate array of possible beginnings to generated text
  this.beginnings = [];

  // A function to feed in text to the markov chain
  this.feed = function(text) {

    // Discard this line if it's too short
    if (text.length < this.n) {
      return false;
    }

    // Store the first ngram of this line
    var beginning = text.substring(0, this.n);
    this.beginnings.push(beginning);

    // Now let's go through everything and create the dictionary
    for (var i = 0; i < text.length - this.n; i++) {
      var gram = text.substring(i, i + this.n);
      var next = text.charAt(i + this.n);
      // Is this a new one?
      if (!this.ngrams.hasOwnProperty(gram)) {
        this.ngrams[gram] = [];
      }
      // Add to the list
      this.ngrams[gram].push(next);
    }
  }

  // Generate a text from the information ngrams
  this.generate = function() {

    // Get a random  beginning
    var current = this.beginnings.choice();
    var output = current;

    // Generate a new token max number of times
    for (var i = 0; i < this.max; i++) {
      // If this is a valid ngram
      if (this.ngrams.hasOwnProperty(current)) {
        // What are all the possible next tokens
        var possible_next = this.ngrams[current];
        // Pick one randomly
        var next = possible_next.choice();
        // Add to the output
        output += next;
        // Get the last N entries of the output; we'll use this to look up
        // an ngram in the next iteration of the loop
        current = output.substring(output.length - this.n, output.length);
      } else {
        break;
      }
    }
    return output;
  }
}
