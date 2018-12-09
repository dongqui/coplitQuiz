const { asyncReadDir, isDir } = require('./util/asyncFs');

class Tree {
  constructor(filePath, name) {
    this.filePath = filePath;
    this.name = name;
    this.children = [];
  }

  async addChildren() {
    if (isDir(this.filePath)) {
      let childrenWithGarbage = await asyncReadDir(this.filePath);
      this.children = childrenWithGarbage.filter(child => !(/(^|\/)\.[^\/\.]/g).test(child))
        .map(child => new Tree(`${this.filePath}/${child}`, child));
    }
  }

  dfs(cb) {
    this.children.forEach(child => {
      cb(child);
      child.dfs(cb);
    })
  }

}

module.exports = Tree;