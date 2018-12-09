const Tree = require('../Tree');

module.exports = folderTreeFactory;

async function folderTreeFactory() {
  let allQuizObj = {};
  let rootTree = new Tree(`/volume/coplitQuiz/data`, 'root');
  await makeFolderTree(rootTree);
  rootTree.dfs(makeQuizObj(allQuizObj));

  return allQuizObj
}

async function makeFolderTree(tree) {
  await tree.addChildren();
  for (let i = 0; i < tree.children.length; i++) {
    let childTree = tree.children[i];
    await makeFolderTree(childTree);
  }
}

function makeQuizObj(obj) {
  let quizObj = obj;
  return function(tree) {
    let filePathArr = tree.filePath.split('/');
    if (filePathArr.length === 8 && tree.name === 'flag') {
      let[dockerImage, classRoom, quiz]  = filePathArr.slice(4, 7);
      if (!quizObj[dockerImage]) {
        quizObj[dockerImage] = {}
      }
      if (!quizObj[dockerImage][classRoom]) {
        quizObj[dockerImage][classRoom] = [];
      }
      quizObj[dockerImage][classRoom].push(quiz);
    }
  }
}
