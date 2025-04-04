// Load wink nlp and its model
const winkNLP = require('wink-nlp');
// Load language model
const model = require('wink-eng-lite-web-model');
const nlp = winkNLP(model);
const its = nlp.its;

const prepText = function (text) {
  const tokens = [];
  const doc = nlp.readDoc(text);

  doc.tokens()
    // Use only words ignoring punctuations etc and from them remove stop words
    .filter((t) => (t.out(its.type) === 'word' && !t.out(its.stopWordFlag)))
    // Handle negation and extract stem of the word
    .each((t) => tokens.push((t.out(its.negationFlag)) ? '!' + t.out(its.stem) : t.out(its.stem)));

  // Add bigrams, word pairs that can help with sentiment analysis
  let i, imax;
  for (i = 0, imax = tokens.length - 1; i < imax; i += 1) {
    tokens.push(tokens[i] + '_' + tokens[i + 1]);
  }

  // Inject sentiment from winkNLP.
  const sentiment = doc.out(its.sentiment);

  let sentimentToken = '$neutral'

  if (sentiment > 0.05) {
    sentimentToken = '$positive';
  };
  if (sentiment < -0.05) {
    sentimentToken = '$negative';
  };

  tokens.push(sentimentToken, sentiment);

  return tokens;
};

module.exports = prepText;
