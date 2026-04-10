const { test, describe } = require('node:test');
const assert = require('node:assert');
const {
  obsfucateEmail,
  obfuscateUrls,
  obfuscateId,
  obfuscateNumbers,
  removeSpecialCharacters,
  trimSpace
} = require('../utils/obfuscator.js');
const { log2OddsToProbability } = require('../utils/probability-organisation.js');

describe('Obfuscator Utility', () => {
  test('obsfucateEmail should replace email with EMAIL', () => {
    assert.strictEqual(obsfucateEmail('contact@example.com'), 'EMAIL');
    assert.strictEqual(obsfucateEmail('hello contact@example.com world'), 'hello EMAIL world');
  });

  test('obfuscateUrls should replace URLs with URL', () => {
    assert.strictEqual(obfuscateUrls('https://google.com'), 'URL');
    assert.strictEqual(obfuscateUrls('Visit http://example.com/path for more'), 'Visit URL for more');
  });

  test('obfuscateId should replace Slack IDs with userId', () => {
    assert.strictEqual(obfuscateId('<@U123456>'), 'userId');
    assert.strictEqual(obfuscateId('Hello <@W987654>, how are you?'), 'Hello userId, how are you?');
  });

  test('obfuscateNumbers should replace digits with NUMBER', () => {
    assert.strictEqual(obfuscateNumbers('There are 123 apples'), 'There are NUMBER apples');
  });

  test('removeSpecialCharacters should remove non-alphanumeric (mostly) characters', () => {
    // specialRegex = /[^A-zÀ-ú\s.,?!']/g;
    assert.strictEqual(removeSpecialCharacters('Hello! @#$ World.'), 'Hello!  World.');
  });

  test('trimSpace should collapse whitespace and trim', () => {
    assert.strictEqual(trimSpace('  too   many    spaces  '), 'too many spaces');
    assert.strictEqual(trimSpace('line\nbreak'), 'line break');
  });
});

describe('Probability Organisation Utility', () => {
  test('log2OddsToProbability should correctly convert log2 odds to probability', () => {
    // log2(1) = 0 => prob = 1/(1+2^0) = 0.5
    assert.strictEqual(log2OddsToProbability(0), 0.5);
    // log2 odds = 1 => prob = 1/(1+2^-1) = 1/(1+0.5) = 1/1.5 = 2/3 approx 0.666
    assert.ok(Math.abs(log2OddsToProbability(1) - 0.6666666666666666) < 1e-10);
  });
});
