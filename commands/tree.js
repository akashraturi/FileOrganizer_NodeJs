
let fs = require("fs");
let path = require("path");

function treeFn(dirPath) {
  if (!fs.existsSync(dirPath)) {
    dirPath = process.cwd();
  }

  treeHelper(dirPath, "");
}

function treeHelper(dirPath, indent) {
  let isFile = fs.lstatSync(dirPath).isFile();
  if (isFile) {
    let fileName = path.basename(dirPath);
    console.log(indent + "├──" + fileName);
  } else {
    let dirName = path.basename(dirPath);
    console.log(indent + "└──" + dirName);
    let contents = fs.readdirSync(dirPath);
    contents.forEach((content) => {
      let contentPath = path.join(dirPath, content);
      treeHelper(contentPath, indent + "\t");
      // console.log(content);
    });
  }
}

module.exports = {
  treeKey: treeFn
}