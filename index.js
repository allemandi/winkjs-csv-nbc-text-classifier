const { program } = require('commander');

// Commands
const textClassifyCsv = require("./commands/text-classify-csv");
const textClassifySlackJson = require('./commands/text-classify-slack-json');
const textClassifySlackJsonFromFolder = require('./commands/text-classify-slack-json-folder');
const exportSlackParentCsv = require('./commands/export-slack-parent-json-batch');
const obfuscateCsvComments = require('./commands/obfuscate-csv-comments');

program
  .command("text-classify-csv")
  .description("classify text by category and sentiment")
  .requiredOption("-t, --trainingcsv <name>", "must have a training csv filepath")
  .requiredOption("-i, --inputcsv <name>", "must have an input csv filepath")
  .requiredOption("-o, --outputcsv <name>", "must have an output csv filepath")
  .option('-p, --probability <name>', 'set to true optional conversion from log2 odds to probability output')
  .action(async (cmdObj) => {
    await textClassifyCsv(cmdObj.trainingcsv, cmdObj.inputcsv, cmdObj.outputcsv, cmdObj.probability);
  });

program
  .command("text-classify-slack-json")
  .description("classify text by category and sentiment")
  .requiredOption("-t, --trainingcsv <name>", "must have a training csv filepath")
  .requiredOption("-i, --inputslack <name>", "must have an input filepath for slack json export")
  .requiredOption("-o, --outputcsv <name>", "must have an output csv filepath")
  .option('-p, --probability <name>', 'set to true optional conversion from log2 odds to probability output')
  .action(async (cmdObj) => {
    await textClassifySlackJson(cmdObj.trainingcsv, cmdObj.inputslack, cmdObj.outputcsv, cmdObj.probability);
  });

program
  .command("text-classify-slack-json-folder")
  .description("classify text by category and sentiment")
  .requiredOption("-t, --trainingcsv <name>", "must have a training csv filepath")
  .requiredOption("-i, --inputslack <name>", "must have an input filepath for slack json export")
  .requiredOption("-o, --outputcsv <name>", "must have an output csv filepath")
  .option('-p, --probability <name>', 'set to true for optional conversion from log2 odds to probability output')
  .action(async (cmdObj) => {
    await textClassifySlackJsonFromFolder(cmdObj.trainingcsv, cmdObj.inputslack, cmdObj.outputcsv, cmdObj.probability);
  });

program
  .command("export-slack-parent-json-batch")
  .description("classify text by category and sentiment")
  .requiredOption("-i, --inputslack <name>", "must have an input filepath for slack json export")
  .requiredOption("-o, --outputcsv <name>", "must have an output csv filepath")
  .action(async (cmdObj) => {
    await exportSlackParentCsv(cmdObj.inputslack, cmdObj.outputcsv);
  });

program
  .command("obfuscate-csv-comments")
  .description("output a csv with obfuscated comments from column")
  .requiredOption("-i, --inputcsv <name>", "must have an input csv filepath")
  .requiredOption("-o, --outputcsv <name>", "must have an output csv filepath")
  .action(async (cmdObj) => {
    await obfuscateCsvComments(cmdObj.inputcsv, cmdObj.outputcsv);
  });

program.parseAsync(process.argv);