/* Simple Google Docs GPT3 integration created by Dan White */

// Attach your api-key
var API_KEY = "<OPENAI_API_KEY>";

// Set max num tokens for response
const NUM_TOKENS = 64;

// function which we can call gpt-3 api
function callAPI(prompt) {
  var data = {
    "model": "text-davinci-003",
    "prompt": prompt,
    "temperature": 0.7,
    "max_tokens": NUM_TOKENS,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
  };

  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data),
    'headers': {
      Authorization: 'Bearer ' + API_KEY,
    },
  };

  response = UrlFetchApp.fetch(
    'https://api.openai.com/v1/completions',
    options,
  );
  
  return JSON.parse(response.getContentText())['choices'][0]['text']
}


function GPT3() {

  // create prompt for gpt-3
  var prompt = Array.prototype.slice.call(arguments, 0).join(' ').trim()
  if (prompt == "") {
    return "#Error Empty Input"
  }

  // call open-ai with prompt
  var response = callAPI(prompt)

  // return gpt-3 response
  return response
}