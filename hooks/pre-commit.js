(async function() {
  const { makeQuizObj } = require('../FolderFairy/util/folderTreeHandler');
  let allQuizObj = await makeQuizObj();
  let commitAddedData = process.argv.slice(2);
  let dataWithFlag = commitAddedData.filter(commit => commit.includes('flag'));
  for (let i = 0; i < dataWithFlag.length; i++) {
    let data = dataWithFlag[i].split('/');
    if (data.length === 5) {
      await checkIfQuizNameExist(data, allQuizObj);
    }
  }

  async function checkIfQuizNameExist(data, allQuizObj) {

    let [addedDockerImage, addedClassRoom, addedQuiz] = data.slice(1, 4);
    let dockerImageListWithOutAddedOne = Object.keys(allQuizObj).filter(dockerimage => dockerimage !== addedDockerImage);
    let isDuplicated = dockerImageListWithOutAddedOne.some(dockerImage =>
      allQuizObj[dockerImage][addedClassRoom] && allQuizObj[dockerImage][addedClassRoom].includes(addedQuiz));
    if (isDuplicated) {
      console.log(`
          커밋 실패!
          ${addedClassRoom}에 중복되는 문제가 존재합니다. 다시 확인해주세요
          `);
    }
    process.exit(1);
  }

})();


