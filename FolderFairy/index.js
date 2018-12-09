(async function() {
  try{
    const inquirer = require('inquirer');
    const fs = require('./util/asyncFs');
    const { CHANGE_THE_QUIZ_TITLE } = require('./store/constStore');
    const { dockerimageList, classroomWithDockerImageList, classroomList, allQuizList } = require('./util/listFactory');

    const dockerImages = await dockerimageList();

    let classRoomsPromises = [];
    for (let i = 0; i < dockerImages.length; i++) {
      classRoomsPromises.push(await classroomList(dockerImages[i]));
    };
    const classRooms = await Promise.all(classRoomsPromises);

    var allQuizObj = {};
    console.log(dockerImages);
    console.log(classRooms);
    for (let dockerIdx = 0; dockerIdx < dockerImages.length; dockerIdx++) {
      allQuizObj[dockerImages[dockerIdx]] = {};
      for (let classIdx = 0; classIdx < classRooms.length; classIdx++) {
        let quiz = await allQuizList(dockerImages[dockerIdx], classRooms[dockerIdx][classIdx]);
        allQuizObj[dockerImages[dockerIdx]][classRooms[classIdx]] = quiz;
      }
    }
    console.log(allQuizObj);
    // let classroomsWithDockerImagesPromises = dockerImages.map((image) => classroomWithDockerImageList(image));
    // let classroomsWithDockerImages = await Promise.all(classroomsWithDockerImagesPromises);
    // const quizPromises = [];
    // for (let dockerIdx = 0; dockerIdx < classroomsWithDockerImages.length; dockerIdx++) {
    //   for (let docker in classroomsWithDockerImages[dockerIdx]) {
    //     for (let classIdx in classroomsWithDockerImages[dockerIdx][docker]) {
    //       quizPromises.push(allQuizList(docker, classroomsWithDockerImages[dockerIdx][docker][classIdx]));
    //     }
    //   }
    // }
    // let allQuizArr = await Promise.all(quizPromises);
    // var allQuizObj = {};
    // allQuizArr.forEach((obj) => {
    //   allQuizObj[Object.keys(obj)[0]] = {};
    // });
    // allQuizArr.forEach(obj => {
    //   let imageName = Object.keys(obj)[0];
    //   allQuizObj[imageName] = Object.assign(obj[imageName], allQuizObj[imageName]);
    // });



    const { dockerQuestion, newDockerQuestion, classQuestion, newClassQuestion, newQuiz,
      checkAnswer, checkAnswerAgain } = require('./store/questions')(allQuizObj);
    let {dockerImage, classRoom, numberOfQuiz, check} = await inquirer.prompt([dockerQuestion, newDockerQuestion, classQuestion, newClassQuestion, newQuiz,
      checkAnswer, checkAnswerAgain]);

    if (!check) {
      console.log('다시 확인해주세요!');
      return;
    }
    let dockerImageFolder = `/volume/coplitQuiz/data/${dockerImage}/flag`;
    let classRoomFolder = `/volume/coplitQuiz/data/${dockerImage}/flag`;
    await fs.asyncWriteFile(dockerImageFolder);
    await fs.asyncWriteFile(classRoomFolder);
    for (let count = 0; count < numberOfQuiz; count++) {
      let quizFolder = `/volume/coplitQuiz/data/${dockerImage}/${classRoom}/${CHANGE_THE_QUIZ_TITLE}_${count}/flag`;
      let descriptionFile = `/volume/coplitQuiz/data/${dockerImage}/${classRoom}/${CHANGE_THE_QUIZ_TITLE}_${count}/description.md`;
      let testFile = `/volume/coplitQuiz/data/${dockerImage}/${classRoom}/${CHANGE_THE_QUIZ_TITLE}_${count}/test.js`;
      let quizCodeFolder = `/volume/coplitQuiz/data/${dockerImage}/${classRoom}/${CHANGE_THE_QUIZ_TITLE}_${count}/code/index.js`;
      await fs.asyncWriteFile(quizFolder);
      await fs.asyncWriteFile(descriptionFile);
      await fs.asyncWriteFile(testFile);
      await fs.asyncWriteFile(quizCodeFolder);
    }
  } catch (e) {
    console.log(e);
  }
})();
