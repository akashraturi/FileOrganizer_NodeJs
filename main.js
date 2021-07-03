#!/usr/bin/env node

let input = require("process").argv.slice(2);

let command = input[0];
let dirPath = input[1];

let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");

switch(command) {
  case "help":
    helpObj.helpKey();
    console.log(`help command executed.`);
    break;
  
  case "tree":
    treeObj.treeKey(dirPath);
    console.log(`tree command executed.`);
    break;
  
  case "organize":
    organizeObj.organizeKey(dirPath);
    console.log(`organize command executed.`);
    break;

  default:
    console.log(`Please input valid command.`);
    break;
}