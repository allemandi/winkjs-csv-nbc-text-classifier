// Load wink-nlp package & helpers.
const winkNLP = require('wink-nlp');
const its = require('wink-nlp/src/its.js');
const model = require('wink-eng-lite-web-model');
const nlp = winkNLP(model);

const getSentimentScore = async (commentInput) => {
  let doc = nlp.readDoc(commentInput);
  let score = doc.out(its.sentiment);

  let category = "Neutral";

  if (score < -0.05) {
    category = "Negative";
  }
  if (score > 0.05) {
    category = "Positive";
  }

  const sentiment = {
    category: category,
    score: score,
  };

  return sentiment

};

module.exports = {
  getSentimentScore,
};
