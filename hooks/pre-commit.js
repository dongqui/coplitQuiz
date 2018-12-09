(async function() {
  const {classroomList, allQuizList, dockerimageList} = require('../FolderFairy/util/listFactory');
  let commitAddedData = process.argv.slice(2);
  let dataWithFlag = commitAddedData.filter(commit => commit.includes('flag'));
  console.log(dataWithFlag);
  for (let i = 0; i < dataWithFlag.length; i++) {
    let data = dataWithFlag[i].split('/');
    if (data.length === 5) {
      await checkIfQuizNameExist(data);
    }
  }


  async function checkIfQuizNameExist(data) {
    let [addedDockerImage, addedClassRoom, addedQuiz] = data.slice(1, 4);
    console.log(data);
    let dockerImageList = await dockerimageList();
    let dockerImageListWithOutAddedOne = dockerImageList.filter(dockerimage => dockerimage !== addedDockerImage);
    for (let i = 0; i < dockerImageListWithOutAddedOne.length; i++) {
      let dockerImage = dockerImageListWithOutAddedOne[i];
      let classRoomList = await classroomList(dockerImage);
      if (classRoomList.includes(addedClassRoom)) {
        let quizList = await allQuizList(dockerImage, addedClassRoom);
        console.log(dockerImage, addedClassRoom, addedQuiz);
        if (quizList.includes(addedQuiz)) {
          console.log('커밋 실패!')
          console.log(`${addedClassRoom}에 중복되는 문제가 존재합니다. 다시 확인해주세요`);
          process.exit(1);
        }
      }
    }

  }

})();


