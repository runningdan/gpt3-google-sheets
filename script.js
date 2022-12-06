/* Simple Google Docs GPT3 integration created by Dan White */

// Attach your api-key
var OPENAI_API_KEY = "<OPENAI_API_KEY>";

// Set max num tokens for response
const MAX_TOKENS = 64;

// function which we can call gpt-3 api
function callAPI(prompt) {
  var data = {
    "model": "text-davinci-003",
    "prompt": prompt,
    "temperature": 0.7,
    "max_tokens": MAX_TOKENS,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
  };

  var payload = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data),
    'headers': {
      Authorization: 'Bearer ' + OPENAI_API_KEY,
    },
  };

  var response = UrlFetchApp.fetch(
    'https://api.openai.com/v1/completions',
    payload,
  );
    
  var choice = JSON.parse(response.getContentText())['choices'][0]['text']

  return choice
}

// function GPT3(arg1, arg2, ...) can be called within your spread sheet
// The function concatenates the inputs to create a prompt which is sent to GPT3
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