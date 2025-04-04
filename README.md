# winkjs-csv-text-classify

## CSV Formats and Procedure
Training and input CSV files must have `category` and `comment` headers.
- Winkjs will first read through the training file to build a training model.
- The input csv/json values under the `comment` header will first be obfuscated.
- Afterwards, Winkjs will read the obfuscated comments and predict the categories.
- Then a results.csv will be generated in the data folder, where Winkjs has added a list of `category` against the input file's original `comment` list.


## Dependencies
Requires Node.js.

Run `npm install` (or if you have yarn `yarn install`) to install the following dependencies.
- comander
- csvtojson
- wink-naive-bayes-text-classifier
- decimal.js

## How to run

### Text Classify

### CSV edition
- Ensure you have a training file (e.g. training.csv) that has `comment` and `category` headers and an input file (input.csv) containing comments to be predicted under `comment` header.
- In the main directory where index.js sits, run:

`node index.js text-classify-csv -t ./data/training.csv -i ./data/input.csv -o ./data/results.csv`


- Or you can define your own file paths for the training, input, and output csv files.
- You can also review the odds or probabilities of each prediction by adding in the optional paramter -p at the end
- See index.js for more details.

### Slack edition
- Only reads the parent comment thread. See slackInput.json for examples. Probabilities are also available.

`node index.js text-classify-slack-json -t ./data/training.csv -i ./data/slackInput.json -o ./data/results.csv`

- for slack json folder
`node index.js text-classify-slack-json-folder -t ./data/training.csv -i ./data/ -o ./data/results.csv`

- for just exporting slack parent threads without obfuscation, use:
`node index.js export-slack-parent-json-batch -i ./data/ -o ./data/results.csv`

### Obfuscate CSV
- Run the following to obfuscate and output csv files:

`node index.js obfuscate-csv-comments -i ./data/input.csv -o ./data/results.csv`

- update paths where needed

## Results
results.csv will be in the data folder.