const { MarkovMachine } = require("./markov");

describe("Generates correct chain", function () {

  test("'The cat in the hat.' chain", function () {
    const machine = new MarkovMachine("The cat in the hat.");
    expect(machine.chains).toEqual({
      'The': ['cat'],
      'cat': ['in'],
      'in': ['the'],
      'the': ['hat.'],
      'hat.': [null]
    });
  });

  test('Ensure duplication does not override key', function () {
    const machine = new MarkovMachine(`the bird flew in the window with the
      other bird`);
    expect(machine.chains).toEqual({
      'the': ['bird', 'window', 'other'],
      'bird': ['flew', null],
      'flew': ['in'],
      'in': ['the'],
      'window': ['with'],
      'with': ['the'],
      'other': ['bird'],
    });
  });
});



describe("Randomly generated text", function () {

  test('Checking for words that can potentially be randomized', function () {
    const machine = new MarkovMachine("The cat in the hat");
    expect(machine.getText()).toEqual('The cat in the hat');
  });

  test('Checking for first word, and following words are random', function () {
    const machine2 = new MarkovMachine(`The bird flew in the window with the
    other bird`);
    expect(machine2.getText()).toContain('The');
    expect(machine2.getText()).toEqual(expect.any(String));
  });
});
