// An array of lines from a text file
var lines;
// The Markov Generator object
var markov;
// An output element
var output;

var linesA = ["Now, fair Hippolyta, our nuptial hour Draws on apace; four happy days bring in Another moon; but, oh, methinks, how slow This old moon wanes! she lingers my desires,","Like to a step-dame or a dowager, Long withering out a young man's revenue. Four days will quickly steep themselves in nights;","Four nights will quickly dream away the time; And then the moon, like to a silver bow New bent in heaven, shall behold the night Of our solemnities. Go, Philostrate, Stir up the Athenian youth to merriments;","Awake the pert and nimble spirit of mirth; Turn melancholy forth to funerals The pale companion is not for our pomp. Hippolyta, I woo'd thee with my sword,","And won thy love doing thee injuries; But I will wed thee in another key, With pomp, with triumph, and with revelling. Happy be Theseus, our renowned duke! Thanks, good Egeus: what's the news with thee?","Full of vexation come I, with complaint Against my child, my daughter Hermia. Stand forth, Demetrius. My noble lord,","This man hath my consent to marry her: Stand forth, Lysander; and, my gracious duke, This man hath bewitch'd the bosom of my child.","Thou, thou, Lysander, thou hast given her rhymes, And interchang'd love-tokens with my child: Thou hast by moonlight at her window sung,","With feigning voice, verses of feigning love; And stol'n the impression of her fantasy With bracelets of thy hair, rings, gawds, conceits, Knacks, trifles, nosegays, sweetmeats, messengers","Of strong prevailment in unharden'd youth; With cunning hast thou filch'd my daughter's heart; Turned her obedience, which is due to me, To stubborn harshness. And, my gracious duke, Be it so she will not here before your grace","Consent to marry with Demetrius, I beg the ancient privilege of Athens, As she is mine I may dispose of her: Which shall be either to this gentleman Or to her death; according to our law","Immediately provided in that case. What say you, Hermia? be advis'd, fair maid: To you your father should be as a god;"]


var linesB = ["Finally the traffic clears. Morris is on his way! Morris slams on the accelerator, his foot practically touching the floor.","IKEA is in Morris’ sights. The big blue and gold signage looms ahead. Four letters. Infinite pronunciations. Morris skids into parking. The car is engulfed by darkness. He steps out and begins to briskly walk towards the entrance. He stomps along the walkways. Across the crossings. Into the lift. Up the escalator. Through the cafeteria. The coffee shop. The entrance.","The homewares section. One path, infinite routes. Time to look for Lexi. Morris ventures down the predestined path, indicated by the yellow arrows stenciled onto the floor. He shuffles past newlyweds, business assistants, couples, mothers, fathers, children. A gardener. A doctor. A teacher. None of them were Lexi. They were all looking at the same furniture. All seeing different things.","Morris walks. He walks past the variations of bed linen, the variations of alarm clock, the variations of faucet, the variations of mug, of spoon, of lamp. He notices a couple bickering about a style of curtain.","And then he finds her."]

// Slider to weight the data fed
var slider;

function setup() {

  // Make the output element
  output = select('#output');

  // Make the slider
  slider = select('#slider');
  // We could regenerate as the user moves the slider!
  // but unless it's very little data, we'd have to do it
  // a different way
  slider.input(tooSlow);

  noCanvas();
}

function tooSlow() {
  console.log('Too Slow Has Been Run')
   generate();
 }

function generate() {
  // Make the markov generator each time we generate text!
  markov = new MarkovGenerator(5, 2000);

  // How many times should we repeat input B
  var repeat = floor(slider.value() / 10);

  // Repeat A the inverse of B
  var totalA = 10 - repeat;
  var totalB = repeat;


  // Feed input A totalA times to the generator
  for (var n = 0; n < totalA; n++) {
    for (var i = 0; i < linesA.length; i++) {
      markov.feed(linesA[i]);
    }
  }

  // Feed input B totalB times to the generator
  for (var n = 0; n < totalB; n++) {
    for (var i = 0; i < linesB.length; i++) {
      markov.feed(linesB[i]);
    }
  }

  // Generate some text and show it
  var generated = markov.generate();
  output.html(generated);

}

// =========== //
// Markov Shit //
// =========== //

Array.prototype.choice = function() {
  var i = floor(random(this.length));
  return this[i];
}

// A MarkovGenerate object
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
    // Here's what we got!
    return output;
  }
}
