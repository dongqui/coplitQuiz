const Tree = require('../Tree');
const { asyncReadDir, isDir } = require('./asyncFs');

module.exports = { makeQuizObj, checkFlagExist };

async function makeQuizObj() {
  let allQuizObj = {};
  let rootTree = new Tree(`/volume/coplitQuiz/data`, 'root');
  await rootTree.makeFolderTree();
  await rootTree.dfs(makeQuizObjCB(allQuizObj));

  return allQuizObj
}

function makeQuizObjCB(obj) {
  let quizObj = obj;
  return function (tree) {
    let filePathArr = tree.filePath.split('/');
    if (filePathArr.length === 8 && tree.name === 'flag') {
      let [dockerImage, classRoom, quiz] = filePathArr.slice(4, 7);
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

async function checkFlagExist() {
  let checkMemo = {};
  let rootTree = new Tree(`/volume/coplitQuiz/data`, 'root');
  await rootTree.makeFolderTree();
  await rootTree.dfs(checkFlagExistCB(checkMemo));

  return checkMemo
}


function checkFlagExistCB(memo) {
  let checkMemo = memo;
  return async function(tree) {
    let basement = tree.filePath.split('/').slice(0, 4).join('/');
    let filePath = tree.filePath.split('/').slice(4, 7).join('/');
    if (!checkMemo[filePath] && isDir(`${basement}/${filePath}`)) {
      let files = await asyncReadDir(`${basement}/${filePath}`);
      if (files.includes('flag')) {
        checkMemo[filePath] = true;
      } else {
        checkMemo[filePath] = false;
      }
    }
  }
}
