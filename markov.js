/** Textual markov chain generator. */


let { sample } = require('lodash');

class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
    this.random = this.getText();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    const chains = {};
    for (let i = 0; i < this.words.length; i++) {
      const currentWord = this.words[i];
      const nextWord = this.words[i + 1];

      // if (!currentWord) {   Seemingly not needed
      //   continue;
      // }

      const arr = chains[currentWord] || [];
      arr.push(nextWord || null);
      chains[currentWord] = arr;
    }
    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    const words = [];

    let currentWord = this.words[0];

    while (currentWord !== null) {
      words.push(currentWord);
      currentWord = sample(this.chains[currentWord]);
    }
    return words.join(' ');
  }
}

module.exports = {
  MarkovMachine,
};