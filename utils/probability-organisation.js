const Decimal = require('decimal.js');

const log2OddsToProbability = (input) => {
  const probability = 1 / (1 + Math.pow(2, -input));
  return probability;
};

const returnProbabilityOddsArr = (nbc, uniqueCategories, obfuscatedComment, probability) => {
  let logOdds = nbc.computeOdds(obfuscatedComment);
  let probabilityArr = [];

  for (let j = 0; j < logOdds.length; j++) {
    let log2odds = logOdds[j][1];
    let likelihood = log2odds;
    if (probability === 'true') {
      let convertLog2Probabability = log2OddsToProbability(log2odds);
      likelihood = `${(Decimal(convertLog2Probabability).toDecimalPlaces(4, Decimal.ROUND_DOWN)).toNumber()}`;
    }
    let oddsCategory = logOdds[j][0];
    let uniqueCategoryIndex = uniqueCategories.indexOf(oddsCategory);
    if (uniqueCategoryIndex != -1) {
      probabilityArr[uniqueCategoryIndex] = likelihood;
    };
  };

  return probabilityArr;

};


module.exports = {
  log2OddsToProbability,
  returnProbabilityOddsArr,
};
