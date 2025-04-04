const fs = require("fs");
const path = require('path');

const getSlackParentText = async (input) => {

  const document = JSON.parse(
    fs.readFileSync(
      path.resolve(input)
    )
  );
  // get all threads where parent_user_id does not exist is not edited and text exists
  const parentThreads = document.filter(i => !(i.parent_user_id) && !(i.editor_id) && i.text);

  return parentThreads
}

const getSlackParentsFromFolder = async (input) => {
  const jsonsInDir = fs.readdirSync(input).filter(file => path.extname(file) === '.json');

  console.log(`Reading the following JSON files: ${jsonsInDir}`)

  let tempArr = [];

  jsonsInDir.forEach(file => {
    const document = JSON.parse(
      fs.readFileSync(
        path.join(input, file)
      )
    );
    const parentThreads = document.filter(i => !(i.parent_user_id) && !(i.editor_id) && i.text);
    tempArr = tempArr.concat(parentThreads)

  });


  return tempArr;
}



module.exports = {
  getSlackParentText,
  getSlackParentsFromFolder,
};
