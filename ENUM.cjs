// require syntax
// DO NOT work on this file directly. Make changes in the ENUM.mjs file, then copy them over

module.exports = class ENUM {
  constructor(key) {
    this[filter(key)] = true;
  }

  setKey(key) {
    this[filter(key)] = false;
  }

  setKeys(keyArray) {
    keyArray.forEach((key) => {
      this[filter(key)] = false;
    });
  }

  selectKey(key) {
    const keys = Object.keys(this);
    key = filter(key);

    if (this[key] != true && this[key] != false) {
      throw new Error("InvalidKey Error: specified key is not present");
    } else {
      keys.forEach((element) => {
        this[element] = false;
      });

      this[key] = true;
    }
  }

  toString() {
    const keys = Object.keys(this);
    let result = "";
    let index = 0;
    let length = keys.length;

    keys.forEach((key, index) => {
      if (index === 0) {
        result += `ENUM {\n    {${key}: ${this[key]}},\n`;
      } else if (index >= keys.length - 1) {
        result += `    {${key}: ${this[key]}}\n}`;
        return result;
      } else {
        result += `    {${key}: ${this[key]}},\n`;
      }

      index++;
    });

    return result;
  }

  valueOf() {
    let array = Object.keys(this);
    for (let i = 0; i < array.length; i++) {
      if (this[array[i]]) {
        return array[i];
      }
    }
  }
};

function filter(key) {
  if (typeof key == "string") {
    key = key.toUpperCase();
  }
  return key;
}
