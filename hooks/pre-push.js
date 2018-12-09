(async function() {
  const { checkFlagExist } = require('../FolderFairy/util/folderTreeHandler');
  let checkMemo = await checkFlagExist();
  for (let filePath in checkMemo) {
    if (!checkMemo[filePath]) {
      console.log(`
      push 실패!
      ${filePath}에 flag를 확인해주세요!
      `);
      process.exit(1);
    }
  }
})();