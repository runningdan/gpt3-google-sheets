/*
This is a simple Google sheets function that allows one to use gpt-3 in spreadsheets

to use it is very simple just call the function GPT3(arg1, arg2, ...)

Example:

C4=1 and D4=1
=GPT3("add", C4, "and", D4, "together")
the output will be 2

*/


var API_KEY = "<OPENAI_API_KEY>"; // add your api key here
var NUM_TOKENS = 64;
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
  prompt = Array.prototype.slice.call(arguments, 0).join(' ')
  var response = callAPI(prompt)
  return response
}