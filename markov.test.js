const { MarkovMachine } = require("./markov");

describe("Generates correct chain", function() {

  test("'The cat in the hat.' chain", function() {
    const machine = new MarkovMachine("The cat in the hat.");
    expect(machine.chains).toEqual({
      'The': [ 'cat' ],
      'cat': [ 'in' ],
      'in': [ 'the' ],
      'the': [ 'hat.' ],
      'hat.': [ null ]
    })
  })

  test('Ensure duplication does not override key', function() {
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
    })
  })
})