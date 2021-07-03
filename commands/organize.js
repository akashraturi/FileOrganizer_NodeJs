let fs = require("fs");
let path = require("path");

let types = {
  media: ["mp4", "mkv", "ts"],
  pictures: ["jpeg", "jpg", "png"],
  archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
  documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
  app: ['exe', 'dmg', 'pkg', "deb"]
}

function organizeFn(dirPath) {
  if (!fs.existsSync(dirPath)) {
    dirPath = process.cwd();
  }
  let destPath = path.join(dirPath, "organized_files");
  if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);

  let files = fs.readdirSync(dirPath);

  organizeHelper(files, dirPath, destPath);
}

function organizeHelper(files, dirPath, destPath) {
  files.forEach((file) => {
    let filePath = path.join(dirPath, file);
    let isFile = fs.lstatSync(filePath).isFile();
    if (isFile) {
      let category = getCategory(file);

      console.log(file + "  --------->  " + category);

      sendFile(filePath, destPath, category);
    }
    // console.log(file);
  });
}

function getCategory(file) {
  let extName = path.extname(file).slice(1);

  for (let type in types) {
    for (let i = 0; i < type.length; i++) {
      // console.log(types[type][i] + "  ----------->  " + type);
      if (types[type][i] == extName) {
        return type;
      }
    }
  }

  return "others";
}

function sendFile(filePath, destPath, category) {
  let categoryPath = path.join(destPath, category);

  if (!fs.existsSync(categoryPath)) fs.mkdirSync(categoryPath);

  // console.log(destPath);

  let fileName = path.basename(filePath);
  let destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(filePath, destFilePath);
  fs.unlinkSync(filePath); // cut
}

module.exports = {
  organizeKey: organizeFn
}