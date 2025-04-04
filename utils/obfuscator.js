const obsfucateEmail = (input) => {
  // if email format, then return EMAIL
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
  const anonymizedEmail = input.replace(emailRegex, 'EMAIL');
  return anonymizedEmail;
};

const obfuscateUrls = (input) => {
  const urlRegex = /((http|ftp|https):\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/gi
  const urlString = input.replace(urlRegex, 'URL');
  return urlString;
};

const obfuscateId = (input) => {
  const slackIdRegex = /\<\@([a-zA-Z0-9]*)\>/g;
  const obfuscatedId = input.replace(slackIdRegex, 'userId');
  return obfuscatedId;
};


const obfuscateNumbers = (input) => {
  const numberRegex = /\d+/g;
  const obfuscatedNumbers = input.replace(numberRegex, 'NUMBER');
  return obfuscatedNumbers;
};

const removeSpecialCharacters = (input) => {
  const specialRegex = /[^A-zÀ-ú\s.,?!']/g;
  const commonString = input.replace(specialRegex, "");
  return commonString;
};

const obfuscateComments = (input) => {
  input = [...input];
  try {
    for (let i = 0; i < input.length; i++) {
      let emailDone = obsfucateEmail(input[i]);
      let urlsDone = obfuscateUrls(emailDone);
      let idsDone = obfuscateId(urlsDone);
      let numbersDone = obfuscateNumbers(idsDone);
      let specialCharactersDone = removeSpecialCharacters(numbersDone);

      input[i] = specialCharactersDone;
    };
    console.log(`Successfully obfuscated.`);
    return input;
  } catch (error) {
    console.log(error);
    console.log(`Failed to obfuscate.`);
    return;
  };
};

const trimSpace = (input) => {
  // if whitespace or new line break, then return space
  const trimRegex = /[\n\r]|\s\s+/g;
  const trimmedString = input.replace(trimRegex, ' ').trim();
  return trimmedString;
};

const trimComments = (input) => {
  for (let i = 0; i < input.length; i++) {
    input[i] = trimSpace(input[i]);
  };
  return input;
};

const replaceDoubleQuotes = (input) => {
  const doubleQuoteRegex = /"/g;
  for (let i = 0; i < input.length; i++) {
    input[i] = input[i].replace(doubleQuoteRegex, "'");
  };
  return input;
};

const cleanText = (input) => {
  let cleanText = trimComments(replaceDoubleQuotes(input));
  return cleanText;
};

module.exports = {
  obsfucateEmail,
  obfuscateUrls,
  obfuscateId,
  obfuscateNumbers,
  removeSpecialCharacters,
  obfuscateComments,
  trimSpace,
  trimComments,
  replaceDoubleQuotes,
  cleanText,
};
