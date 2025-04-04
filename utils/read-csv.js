const path = require('path');
const csv = require('csvtojson');

const loadCsv = async (input) => {
  const csvFile = path.resolve(input);
  const csvData = await csv().fromFile(csvFile);
  return csvData;
};

const loadTrainingCsv = async (trainingcsv, commentHeader, categoryHeader, trainingPercentage) => {
  const csvData = await loadCsv(trainingcsv);
  console.log(`Reading training file`);
  const csvArr = csvData.filter(i => (i[categoryHeader] && i[commentHeader])).map(i => ({ category: i[categoryHeader], comment: i[commentHeader] }));
  const categoryArr = csvData.map(i => i[categoryHeader]);
  const uniqueCategories = [...new Set(categoryArr)].sort().filter(i => i);

  const majorityIndex = Math.floor((csvArr.length - 1) * (trainingPercentage / 100))
  const trainingArr = csvArr.slice(0, majorityIndex);
  const evaluateArr = csvArr.slice(majorityIndex);
  console.log(`Using first ${trainingPercentage}% of samples (${trainingArr.length}) from training data set (${csvArr.length}) to build model.`);

  return { uniqueCategories, trainingArr, evaluateArr };
};

const trainModel = (trainingArr, commentHeader, categoryHeader, nbc) => {


  for (let i = 0; i < trainingArr.length; i++) {
    let learnComment = trainingArr[i][commentHeader];
    let learnCategory = trainingArr[i][categoryHeader];
    nbc.learn(learnComment, learnCategory);
  };

  nbc.consolidate();
  console.log("Training model consolidated.");
};

const evaluateTrainingData = (evaluateArr, commentHeader, categoryHeader, trainingPercentage, nbc) => {
  console.log(`Now evaluating the last ${100 - trainingPercentage}% (${evaluateArr.length}) of dataset against model`);
  let evaluateCount = 0;
  for (let i = 0; i < evaluateArr.length; i++) {
    if (nbc.predict(evaluateArr[i][commentHeader]) === evaluateArr[i][categoryHeader]) {
      evaluateCount++;
    };
  };
  console.log(`Predicted precision of last ${evaluateArr.length} samples = ${(evaluateCount * 100 / evaluateArr.length).toFixed(2)}%`);
};






module.exports = {
  loadCsv,
  loadTrainingCsv,
  trainModel,
  evaluateTrainingData,
};
