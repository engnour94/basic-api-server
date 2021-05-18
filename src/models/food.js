'use strict';
const uuid = require('uuid').v4;

class Food {
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
    const food = {
      id: uuid(),
      data: obj,
    };
    this.db.push(food);
    return food;
  }

  delete(id) {
    console.log(id);

    this.db = this.db.filter((food) => food.id !== id);
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

module.exports = Food;