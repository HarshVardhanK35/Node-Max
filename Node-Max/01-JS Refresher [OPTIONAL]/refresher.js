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
const printName = ({ name }) => {
  console.log(name);
};
// printName(person);

// array destructuring
const hobbies = ["programming", "sports"];
const [hob1, hob2] = hobbies;
// console.log(hob1, hob2)

// nested async-calls
const fetchData = (callbackFn) => {
  setTimeout(() => {
    callbackFn("Done!");
  }, 2000);
};

setTimeout(() => {
  // console.log("inside setTimeout!");
  fetchData((text) => {
    // console.log(text)
  });
}, 2000);

// promise
const fetch = () => {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      res("Promises!");
    }, 1000);
  });
  return promise;
};

// resolving a promise
setTimeout(() => {
  // console.log("Inside Timeout");
  fetch().then((res) => {
    // console.log(res);
    return fetch();
  });
  // .then((data) => console.log(data));
}, 2000);

// 1.1 nested callbacks
const fetchWithCB = (callbackFn) => {
  setTimeout(() => {
    callbackFn("Done!");
  }, 2000);
};

// 1.2 async handle with callbacks
setTimeout(() => {
  fetchWithCB((text) => {
    console.log(text + " 120");
  });
}, 1000);
