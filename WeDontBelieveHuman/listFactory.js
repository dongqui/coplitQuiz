const {MAKE_NEW_CLASS_CHOICE} = require('./constStore');
const fs = require('./asyncFs');

module.exports = {
  dockerimageList: async function() {
    return await fs.asyncReadDir(`/volume/coplitQuiz/data`);
  },
  classroomWithDockerImageList: async function(dockerImage) {
    let classesWithGarbage = await fs.asyncReadDir(`/volume/coplitQuiz/data/${dockerImage}`);
    let classRooms = util_purifyChoices(classesWithGarbage);
    return {[dockerImage]: classRooms}
  },
  allQuizList: async function(dockerImage, classRoom) {
    let quizWithGarbage = await fs.asyncReadDir(`/volume/coplitQuiz/data/${dockerImage}/${classRoom}`);
    let quiz = util_purifyChoices(quizWithGarbage);
    return {[dockerImage]: {[classRoom] :quiz }}
  },
};

function util_purifyChoices(choices) {
  return choices.filter(fileName => !(/(^|\/)\.[^\/\.]/g).test(fileName) && fileName !== 'flag');
}