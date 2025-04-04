const { writeFile } = require('fs/promises');
const Classifier = require('wink-naive-bayes-text-classifier');
const { returnProbabilityOddsArr } = require('../utils/probability-organisation.js');
const prepText = require('../utils/prep-text-task.js');
const { cleanText, obfuscateComments } = require('../utils/obfuscator.js');
const { loadCsv, loadTrainingCsv, trainModel, evaluateTrainingData } = require('../utils/read-csv.js');

const textClassifyCsv = async (trainingcsv, inputcsv, outputcsv, probability) => {
  // csv strings
  const csvHeaderStrings = {
    category: 'category',
    comment: 'comment',
  };
  let categoryHeader = csvHeaderStrings.category;
  let commentHeader = csvHeaderStrings.comment;

  // Naive Bayes Text Classifier
  const nbc = Classifier();

  // helper util, only words (no numbers, punctuation, etc.)
  nbc.definePrepTasks([prepText]);

  // Configure behavior
  // considerOnlyPresence true indicates a binarized model.
  // additive smoothing factor between 0 (strict results, results more unknowns) and 1.
  nbc.defineConfig({ considerOnlyPresence: false, smoothingFactor: 0.1 });
  // split array into custom percentage, with remaining as training evaluation
  const trainingPercentage = 90;

  const { uniqueCategories, trainingArr, evaluateArr } = await loadTrainingCsv(trainingcsv, commentHeader, categoryHeader, trainingPercentage);
  // learning samples
  trainModel(trainingArr, commentHeader, categoryHeader, nbc);
  // evaluate record
  evaluateTrainingData(evaluateArr, commentHeader, categoryHeader, trainingPercentage, nbc);

  console.log("Now reading input file.")
  const inputData = await loadCsv(inputcsv);
  const parentText = inputData.map(i => i[commentHeader]);
  const cleanedText = cleanText(parentText);
  const obfuscatedText = obfuscateComments(cleanedText);
  console.log(`The input file contains ${obfuscatedText.length} entries.`);
  console.log(`Now predicting input comments based off training model.`);

  const probabilityHeaders = (probability) ? `,${uniqueCategories}` : '';

  const outputHeaders = [
    `${categoryHeader},${commentHeader}${probabilityHeaders}\n`
  ];

  const predictedCategoryArr = obfuscatedText.map(i => nbc.predict(i));
  const probabilityArr = obfuscatedText.map(i => (probability) ? `,${returnProbabilityOddsArr(nbc, uniqueCategories, i, probability)}` : '');
  console.log('Results predicted.');

  let outputArr = cleanedText.map((originalComment, i) => `${predictedCategoryArr[i]},"${originalComment}"${probabilityArr[i]}\n`);
  outputArr.unshift(...outputHeaders);

  // write csv content to a results file
  writeFile(outputcsv, outputArr, 'utf8')
    .then(() => console.log("success: see your results in your output folder"))
    .catch((error) => console.log("error: could not write results file"))
};

module.exports = textClassifyCsv;


