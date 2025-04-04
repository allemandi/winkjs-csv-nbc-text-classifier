const { writeFile } = require('fs/promises');
const { obfuscateComments, cleanText } = require('../utils/obfuscator.js');
const { loadCsv } = require('../utils/read-csv.js');

const obfucateCsvComments = async (inputcsv, outputcsv) => {

  const csvHeaderStrings = [
    'comment'
  ];

  const csvData = await loadCsv(inputcsv)

  console.log(`Reading csv file`);

  let commentArr = csvData.map(i => i[csvHeaderStrings[0]])

  let cleanedText = cleanText(commentArr);
  let obfucatedText = obfuscateComments(cleanedText);

  outputArr = [
    `${csvHeaderStrings[0]}\n`
  ];

  for (let i = 0; i < obfucatedText.length; i++) {
    outputArr.push(`"${obfucatedText[i]}"\n`)
  };

  // write csv content to a results file
  writeFile(outputcsv, outputArr, 'utf8')
    .then(() => console.log("success: see your results in your output folder"))
    .catch((error) => console.log("error: could not write results file"))
};

module.exports = obfucateCsvComments;


