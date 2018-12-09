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
  async makeFolderTree() {
    await this.addChildren();
    for (let i = 0; i < this.children.length; i++) {
      let childTree = this.children[i];
      await childTree.makeFolderTree();
    }
  }


  async dfs(cb) {
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i];
      await cb(child);
      await child.dfs(cb);
    }
  }

}

module.exports = Tree;