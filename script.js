// global constants
var clueHoldTime = 600; // how long to hold each clue's light/sound
var cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 500; //how long to wait before starting playback of the clue sequence

// Global Variables
var pattern = [
  [5, 3, 1, 3, 5, 5, 5, 3, 3, 3, 5, 8, 8, 5, 3, 1, 3, 5, 5, 5, 3, 3, 5, 3, 1],
  [10, 9, 10, 9, 10, 5, 8, 6, 3],
  [1, 5, 8, 7, 5, 12, 10, 7, 5, 8, 7, 4, 6, 1],
  [1, 1, 3, 1, 6, 5, 1, 1, 3, 1, 8, 6],
];
var option = document.getElementById("selectSong").value;
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; // between 0 - 1
var guessCounter = 0;
var strikes = 0;

function setSong(num) {
  // change song and reset strikes counter
  option = num;
  if (num == 4) {
    // random option
    const randomNum = generateRandom();
    option = randomNum;
  }
  strikes = 0;
  document.getElementById("strike-number").innerHTML = `Strikes: ${strikes}/3`;
  document.getElementById("to-go").innerHTML = `To Go: ${pattern[option].length} notes`;
}

function startGame() {
  // initialize game variables
  progress = 0;
  gamePlaying = true;
  // swap start and stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  strikes = 0;
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

// Sound Synthesis Functions
// Frequencies courtesy of https://en.wikipedia.org/wiki/Piano_key_frequencies
const freqMap = {
  // MAPPING: 1:C, 2:db, 3:D, 4:eb, 5:E, 6:F, 7:gb
  // cont'd:  8:G, 9:ab, 10:A, 11:bb, 12:B
  1: 261.63,
  2: 277.18,
  3: 293.66,
  4: 311.13,
  5: 329.63,
  6: 349.23,
  7: 369.99,
  8: 392,
  9: 415.3,
  10: 440,
  11: 466.16,
  12: 493.88,
};

function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  context.resume();
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log(
      "play single clue: " + pattern[option][i] + " in " + delay + "ms"
    );
    setTimeout(playSingleClue, delay, pattern[option][i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

function loseGame() {
  stopGame();
  alert("Game Over. You made too many mistakes, but try again soon!");
  strikes = 0;
  document.getElementById("strike-number").innerHTML = `Strikes: ${strikes}/3`;
}

function winGame() {
  stopGame();
  alert("Game Over. Great job! Now try playing it without any help :)");
}

function guess(btn) {
  console.log("user guessed: " + btn);

  if (!gamePlaying) {
    return;
  }

  if (pattern[option][guessCounter] == btn) {
    // Correct guess by user
    if (guessCounter == progress) {
      let notesLeft = (pattern[option].length - 1) - progress
      document.getElementById("to-go").innerHTML = `To Go: ${notesLeft} notes`;
      
      if (progress == pattern[option].length - 1) {
        winGame();
      } else {
        // Pattern correct so keep playing
        ++progress;

        if (cluePauseTime > 200) {
          // min of 100ms pause time
          cluePauseTime -= cluePauseTime * 0.1; // speed up playback time
        }
        playClueSequence();
      }
    } else {
      // Not at end so keep checking
      guessCounter++;
    }
  } else {
    // Add a strike bc guess was incorrect
    ++strikes;
    document.getElementById(
      "strike-number"
    ).innerHTML = `Strikes: ${strikes}/3`;
    if (strikes >= 3) {
      loseGame();
      return;
    }
    // resume sequence after adding strike
    playClueSequence();
  }
}

function generateRandom() {
  return Math.floor(Math.random() * (3 + 1) + 0);
}
