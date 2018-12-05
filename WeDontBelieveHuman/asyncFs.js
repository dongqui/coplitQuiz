const {dirname} = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = {
  asyncReadDir: (fileName) => new Promise((resolve, reject) => {
    fs.readdir(fileName, 'utf8', (err, data) => {
      if (err) reject('readDir ' + err);
      resolve(data);
    })
  }),

  asyncMkdirp: (filePath) => new Promise((resolve, reject) => {
    mkdirp(filePath, (err) => {
      if (err) reject(err);
      resolve('complete!');
    })
  }),

  asyncWriteFile: (fileName, data) => new Promise((resolve, reject) => {
    mkdirp(dirname(fileName), function (err) {
      if (err) reject(err);
      fs.writeFile(fileName, data, 'utf8', err => {
        if (err) reject(err);
        resolve('write ' + fileName + ' done');
      })
    });
  })
};
