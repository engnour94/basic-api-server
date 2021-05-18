'use strict';
const uuid = require('uuid').v4;

class Clothes {
  constructor() {
    this.db = [];
    // [{id:, data: {name, type, ...}}]
  }

  read(id) {
    if (id) {
      return this.db.find((record) => record.id === id);
    } else {
      return this.db;
    }
  }

  create(obj) {
    const clothes = {
      id: uuid(),
      data: obj,
    };
    this.db.push(clothes);
    return clothes;
  }

  delete(id) {
    console.log(id);
    this.db = this.db.filter((clothes) => clothes.id !== id);
    return this.db;
  }

  update(id, obj) {
    for (let i = 0; i < this.db.length; i++) {
      let record = this.db[i];
      if(record.id === id) {
        this.db[i].data = obj;
        return this.db[i];
      } 
    }
  }
}

module.exports = Clothes;