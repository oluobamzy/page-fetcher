/*
Implement a node app called fetcher.js.

It should take two command line arguments:

a URL
a local file path

It should download the resource at the URL to the local path on your machine. Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.
*/ 

//Pass a message and receive it from the commandline. 
//pass the input into request
//read the file with arguments from the request


const readline = require('readline'); //require readline
const fs = require('fs'); //require fs
const request = require('request');// require request

let argument1;
let argument2;
const rl = readline.createInterface({//create readline interface to receive user input
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name? ', (name) => {//capture input1
  argument1 = name;
  let newurl = `http://www.${argument1}/`;
  let url = newurl;

  rl.question('What files do you want to write?\n', (file) => {//capture input2
    argument2 = file;
    let path = `./${argument2}`;

    rl.close();

    request(url, (error, response, body) => {//send a request to the user specified address
      if (!error && response.statusCode === 200) {
        fs.writeFile(path, body, (err) => {//write to the file specified
          if (err) {
            console.error(err);
          } else {
            let length = body.length;
            console.log(`Downloaded and saved ${length} bytes to ${path}`);
          }
        });
      } else {
        console.log('Request failed with status code:', response.statusCode);
      }
    });
  });
});





