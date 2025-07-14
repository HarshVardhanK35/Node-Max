// anonymous functions
const anonymous = function (param1, param2) {
  return "param1, param2";
};
// console.log(anonymous("anonymous", 1));

// arrow functions
const arrow = (param1, param2) => {
  return "param1, param2";
};
// console.log(anonymous("arrow", 2));

// shorter syntax: arrow fns
const addWithArrow = (a, b) => a + b;
// console.log(addWithArrow(1, 2));

// arrow fns - when no need of parameters
const noParams = () => 1 + 2;
// console.log(noParams());

// object: {key: value}
const objPerson = {
  name: "Harsha",
  age: 24,
};

// object with arrow fn and fn expression
const objArrow = {
  name: "Harsha",
  freeze: () => {
    return `this is ${this.name}`;
  },

  greet: function () {
    return `this is ${this.name}`;
  },
  hi() {
    return `hi👋 this is ${this.name}`;
  },
};
// console.log(objArrow.hi());

// arrays and for-const-of
const hobbyArr = ["watching movies", "sports"];
const upperHobbyArr = hobbyArr.map((hobby) => {
  return hobby.at(0).toUpperCase() + hobby.slice(1, hobby.length);
});
// console.log(upperHobbyArr)

// spread
const copyWithSlice = hobbyArr.slice();
const copyWithSpread = [...hobbyArr];

// rest
const arrWithRest = (...args) => {
  return args;
  // return [...args];
};
// console.log(arrWithRest(1, 2, 3, 4));

// destructuring
const person = {
  name: "Harsha",
};
const printName = (personData) => {
  console.log(personData.name);
};
printName(person);
