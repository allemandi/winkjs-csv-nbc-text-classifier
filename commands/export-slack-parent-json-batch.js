const { getSlackParentsFromFolder } = require('../utils/get-slack-parent-thread.js')
const { writeFile } = require('fs/promises');
const { cleanText } = require('../utils/obfuscator.js');

const exportSlackParentCsv = async (slackInput, outputcsv) => {

  const csvHeaderStrings = [
    'timestamp',
    'comment'
  ];

  console.log("Now reading input file from Slack JSON files.")

  const parentThreads = await getSlackParentsFromFolder(slackInput);

  // get rid of line breaks per text

  outputArr = [
    `${csvHeaderStrings[0]},${csvHeaderStrings[1]}\n`
  ];

  let parentComments = parentThreads.map(i => i.text);
  let parentTimestamps = parentThreads.map(i =>
    new Date(Math.trunc(i.ts * 1000)).toLocaleDateString("en-GB"))

  let cleanedText = cleanText(parentComments);


  for (let i = 0; i < cleanedText.length; i++) {
    outputArr.push(`"${parentTimestamps[i]}","${cleanedText[i]}"\n`)
  }


  // write csv content to a results file
  writeFile(outputcsv, outputArr, 'utf8')
    .then(() => console.log("success: see your results in your output folder"))
    .catch((error) => console.log("error: could not write results file"))
};

module.exports = exportSlackParentCsv;


