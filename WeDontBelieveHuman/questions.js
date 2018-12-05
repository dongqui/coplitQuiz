const {MAKE_NEW_CLASS_CHOICE, MAKE_NEW_IMAGE_CHOICE} = require('./constStore');


module.exports = function(quizObj) {
  return {
    dockerQuestion: {
      name: 'dockerImage',
      type: 'rawlist',
      message: '어떤 도커이미지에서 돌릴건가요? \n',
      choices: [... Object.keys(quizObj), MAKE_NEW_IMAGE_CHOICE]
    },

    newDockerQuestion: {
      name: 'dockerImage',
      type: 'input',
      message: '새로 만들려는 도커이미지 이름뭔가요? \n',
      validate: function (answer) {
        return !answer.includes('/');
      },
      when: function (answer) {
        let { dockerImage} = answer;
        if (dockerImage === MAKE_NEW_IMAGE_CHOICE)
          return true;
        return false
      }
    },

    classQuestion: {
      name: 'classRoom',
      type: 'rawlist',
      message: '누구를 위한 테스트인가요? \n',
      choices: function (answer) {
        let {dockerImage} = answer;
        return [...Object.keys(quizObj[dockerImage]), MAKE_NEW_CLASS_CHOICE];
      },
      when: function (answer) {
        let { dockerImage } = answer;
        if (Object.keys(quizObj).includes(dockerImage))
          return true;
        return false
      }
    },

    newClassQuestion: {
      name: 'classRoom',
      type: 'input',
      message: '새로 만들려는 classRoom(?) 이름이 뭔가요? \n',
      validate: function (answer) {
        return !answer.includes('/');
      },
      when: function (answer) {
        let {dockerImage, classRoom} = answer;
        if (classRoom === MAKE_NEW_CLASS_CHOICE || !Object.keys(quizObj).includes(dockerImage))
          return true;
        return false
      }
    },

    newQuiz: {
      name: 'numberOfQuiz',
      type: 'input',
      message: '몇 문제 만드실거예요? \n',
      validate: function (answer) {
        return !(/[^0-9]/g).test(answer);
      }
    },

    checkAnswer: {
      name: 'check',
      type: 'confirm',
      message: function(answer) {
        const checkMessage =
          `
         도커이미지 이름: ${answer.dockerImage}
         클래스(?) 이름: ${answer.classRoom}
         만들 문제 갯 수: ${answer.numberOfQuiz}`;

        return `정확하게 기입 하셨나요?? 확인해주세요!
        ${checkMessage}
        
        `;
      },
      validate: function (answer) {
        let { check } = answer;
        check = check.toLowerCase();
        return check === 'y' || check === 'n';
      }
    },

    checkAnswerAgain: {
      name: 'check',
      type: 'confirm',
      message: function(answer) {
        const checkMessage =
          `
         도커이미지 이름: ${answer.dockerImage}
         클래스(?) 이름: ${answer.classRoom} 
         만들 문제 갯 수: ${answer.numberOfQuiz}`;

        return `한 번 더 확인해봅시다!
        ${checkMessage}
         
        `

      },
      when: function (answer) {
        let {check} = answer;
        if (check)
          return true;
        return false
      },
      validate: function (answer) {
        let { check } = answer;
        check = check.toLowerCase();
        return check === 'y' || check === 'n';
      }
    }
  }
};
