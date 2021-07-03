function helpFn() {
  console.log(`
  List of Commands :
    -> tree : gives the tree structure of the current directory.      
    -> organise : organises the files in folders based on category.
    -> help : lists all the commands available.
  `);
}

module.exports = {
  helpKey: helpFn
}