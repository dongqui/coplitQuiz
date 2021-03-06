(async function() {
  try{
    const { makeQuizObj } = require('./util/folderTreeHandler');
    const inquirer = require('inquirer');
    const fs = require('./util/asyncFs');
    const { CHANGE_THE_QUIZ_TITLE } = require('./store/constStore');

    let allQuizObj = await makeQuizObj();

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

      console.log('생성 완료!')
    }
  } catch (e) {
    console.log(e);
  }
})();
