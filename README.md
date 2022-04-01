# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: **Charles Xu**

Time spent: **12** hours spent in total

Link to project: **https://gamy-quickest-cress.glitch.me**

## Required Functionality

The following **required** functionality is complete:

- [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [x] "Start" button toggles between "Start" and "Stop" when clicked.
- [x] Game buttons each light up and play a sound when clicked.
- [x] Computer plays back sequence of clues including sound and visual cue for each button
- [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [x] User wins the game after guessing a complete pattern
- [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [x] Buttons use a pitch (frequency) other than the ones in the tutorial
- [x] More than 4 functional game buttons
- [x] Playback speeds up on each turn (by 10% until a min value)
- [x] Computer picks a different pattern each time the game is played (select random!)
- [x] Player only loses after 3 mistakes (instead of on the first mistake)
- [x] Game button appearance change goes beyond color (resembles piano key shape)
- [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Memory game has a piano-learning theme with buttons from C4 to B4
- [x] Dropdown menu for user to select one of four songs to learn
- [x] Option for computer to choose a random song from the list
- [x] Notes To Go counter to show user how many notes are left in the song
- [x] Frequencies represent actual piano key frequencies

## Video Walkthrough (GIF)

GIF of a user winning at Rainbow Piano
<br>
<img src="https://github.com/charlesxu27/rainbow_piano/blob/main/win_walkthrough.gif?raw=true" width=600>
<br>
GIF of a user losing at Rainbow Piano
<br>
<img src="https://github.com/charlesxu27/rainbow_piano/blob/main/loss_walkthrough.gif?raw=true" width=600>
<br>
GIF of other features
<br>
<img src="https://github.com/charlesxu27/rainbow_piano/blob/main/misc_walkthrough.gif?raw=true" width=600>

## Reflection Questions

### 1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.
My sources are cited inline but here is the entire list:

* https://stackoverflow.com/questions/3518002/
  how-can-i-set-the-default-value-for-an-html-select-element
* https://stackoverflow.com/questions/36164514/putting-value-of-select-tag-into-javascript-variable
* Frequencies courtesy of https://en.wikipedia.org/wiki/Piano_key_frequencies
* https://stackoverflow.com/questions/16244860/top-align-text-within-button-element
* z-index css element inspired by https://www.youtube.com/watch?v=vjco5yKZpU8
* import font from https://www.w3docs.com/snippets/css/how-to-import-google-fonts-in-css-file.html
* css gradient from https://www.w3schools.com/css/css3_gradients.asp
* I have previously completed some of the HTML and CSS modules in The Odin Project, so I drew the majority of my existing web development knowledge from their curriculum. https://www.theodinproject.com

### 2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)

- Coming from a background in Python and Java, I found it challenging to visualize and connect the front-end view with the back-end logic. It's relatively simple to create HTML elements and style them with CSS, but it's much more complicated to, for example, update the playClueSequence() function in the backend to play a specific song the user selected via a dropdown menu. The most challenging problem in this sense was implementing a “random” option in the song-selection dropdown menu. When selected, the “random” menu would trigger a function in the javascript file that generates a random integer between 0 and 3 and then update the playClueSequence() function to play the corresponding song.
I didn’t have a clear idea where to start, so I reviewed what I knew about event handlers and accessing DOM elements by looking at the relevant Mozilla Developer Network documentation and then searching for specific commands on stackoverflow. 
- After spending a few hours researching event handlers and other "select" tag attributes, I narrowed my approaches to three actions: (1) implement an onchange event handler to call the randomGenerator function (2) access and modify the “random” HTML element via DOM methods, and (3) mirror the structure of the other select options and implement the logic in the javascript file. In the first approach, I ran into problems finding an appropriate element attribute to call a function from that didn’t involve using a javascript framework. I didn’t want to introduce another complication to the program, so I moved on to the second approach. While it was certainly possible to modify the DOM element and change the “random” option’s value, it didn’t make sense to grab the user’s input, invoke a backend function, update the front-end, and then invoke another backend function. In the end, I decided for the third approach, which kept my existing logic in place and just required me to add a few conditionals to catch a situation when the “random” option was selected and feed in a random integer to the playClueSequence() function. 
- One lesson I learned from overcoming this challenge is that before implementing a possible solution, I should visualize it and see if my mind can follow the logic. In this case, I sketched a rough diagram with arrows showing how data is passed and modified between the HTML and JS files.

### 3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)

- After implementing the memory game, I’m curious how web development teams work together to develop a full-stack application. From this project, it seems that wiring the front-end and the back-end involves complete understanding of how each end works. I’m hoping that as a SITE intern, I can learn more about the processes to get a project off the ground and the different ways to organize developers to make sure they are in constant communication with each other, especially if they specialize in only the front or back end.

- I’m also curious about how frameworks play a role in web development. I’ve tried to use React.js in creating a personal website, but I find that it almost feels like learning an entire new program and language. How do companies choose a framework to use for a specific process? What factors should be considered when committing to a framework and a tech stack?

- Finally, while implementing this game, I kept thinking about how this game involves both visual and auditory cues for the web experience and can be hard to navigate for people using screen readers or people who don’t have the right device. I wonder if all web developers and companies emphasize site accessibility and accessible features. In the industry, is accessibility discussed at every stage in the development process?

### 4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
I decided to transform the light and sound game from a competitive web experience to a didactic web experience. Using colors, lights, and sounds, my Rainbow Piano app tries to teach piano by making each key unique and making sure students are not overwhelmed by learning one step — or one key — at a time.

- If my objective was to mimic the sound of the piano, I would definitely upload audio files representing each key on an actual piano. Right now, the computer-generated frequencies can be harsh on the ear and do not capture the tune of songs as accurately as I would like. To implement this feature, I would use the HTML "audio" tag.

- I would also find a way to adjust the clueHoldTime and cluePauseTime variables according to the song that is played. Each song has a different tempo and there are long and short presses of keys, so ideally, my program can accurately reflect those musical factors in the clue playback sequence. One way I can implement this is to make my song collection an array of dictionaries so that each dictionary key points to a property like “tempo” or “long-press keys”. By parsing this object in my playClueSequence() function, the program can more accurately teach the song to users.

- Finally, I would like to make my site more accessible for users with visual or hearing impairments. One feature I would add is labeling the keys on the piano with the actual musical note (ex. C4, d#, etc.) Another feature I would add is mapping each piano key to key presses, so users do not have to navigate the site using a mouse. Mapping keys to the piano keys would most likely involve the use of an event handler like keydown and keyup.

## Interview Recording URL Link

[My 5-minute Interview Recording](https://youtu.be/9jGpBbPun8o)

## License

    Copyright [Charles Xu]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
