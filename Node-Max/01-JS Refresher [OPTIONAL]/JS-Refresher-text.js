// ! JavaScript Refresher !
// ------------------------
/**
 * ! [this section is optional] !
 * 
 * 
 * ! 1. JavaScript in a Nutshell
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * * JavaScript
 *   
 * >>> weakly typed: 
 *      - no explicit type assignment
 *      - data types can be switched dynamically 
 * 
 * >>> object-oriented language
 *      - data can be organized in logical objects
 *      - diff primitive and reference types
 * 
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * [code]
 * ------
// >>> anonymous functions
const anonymous = function (param1, param2) {
    return "param1, param2"
}
console.log(anonymous())
 * 
 * - as there is no fn name after "function" keyword
 * - so we store inside a constant
 * 
// >>> arrow functions
const arrow = (param1, param2) => {     // - here arrow => indicates this as an arrow function
  return "param1, param2";
};
console.log(anonymous("arrow", 2));
 * 
 * - remove fn-keyword from anonymous fn and replace it with an ARROW: "=>"
 * 
// >>> shorter syntax: arrow fns
const addWithArrow = (a, b) => a + b;
console.log(addWithArrow(1, 2));
 * 
 * - this is used when there is only one return statement  
 * 
// >>> arrow fns - when no need of parameters
const noParams = () => 1 + 2;
console.log(noParams());
 * 
 * - when no parameters are needed we have to specify empty parenthesis
 * 
// >>> object: {key: value}
const objPerson = {
    name: "Harsha", 
    age: 24,
}
 * 
 * - key: value combined called "PROPERTY" OR "FIELD" of that object
 * 
// >>> object with "arrow fn" || "anonymous fn" || "ES6- modern fns"
const objArrow = {
  name: "Harsha",
  freeze: () => {
    return `this is ${this.name}`;
  },

  greet: function () {
    return `this is ${this.name}`; 
  },

  hi() {
    return `hi 👋 this is ${this.name}`
  }
};
console.log(objArrow.freeze());     //=> this is undefined 
console.log(objArrow.greet());      //=> this is Harsha 
console.log(objArrow.hi());         //=> hi👋 this is Harsha
 * 
 * - inside arrow fns this refers to "GLOBAL NODE RUN-TIME SCOPE"
 * - to refer to the same object that function was defined in >>> we have to use: "function-expression"
 * 
hi() {
    return `hi 👋 this is ${this.name}`
}   
 * 
 * - ES6 way of defining functions inside objects
 * 
 * ? Arrays
// >>> arrays and for-const-of
const hobbyArr = ["watching movies", "sports"];
for (const hobby of hobbyArr) {
  console.log(hobby.at(0).toUpperCase() + hobby.slice(1, hobby.length));
}
res: 
    Watching movies
    Sports

// >>> arrays with .map()
const hobbyArr = ["watching movies", "sports"];
const upperHobbyArr = hobbyArr.map((hobby) => {
  return hobby.at(0).toUpperCase() + hobby.slice(1, hobby.length);
});
console.log(upperHobbyArr)

res:
    [ 'Watching movies', 'Sports' ]
 * 
 * - map fn transforms an array and return a new array 
 * - which provides a new array but does not manipulate the old array
 * 
 * * Arrays, Objects & Reference Types
 * - objects and arrays are reference type
 * - even the array is defined with "const" that means value does not change [but arrays and objects are reference types]
 *      - so arrays and objects are still be manipulated!
 * (we can apply .push() and .pop() methods on an array of elements)!
 * [cause]
 *      - reference types only store an address pointing a place inside memory 
 *      - even we change elements inside that array.. pointed address does not change
 * [ex]
const hobbyArr = ["watching movies", "sports"];

hobbyArr = ["likes"];
console.log(hobbyArr);      // => TypeError: Assignment to constant variable.
 * 
 * - so, we can change inside of a value.. but cannot change the value that was assigned to that variable totally! 
 * - simply, we are not really editing / changing the value that is inside that constant but we are editing the value that array const is pointing at! 
 * 
 * * Understanding Spread & Rest Operators
 * [spread]
 *      - when we add a new element inside an array, by not editing original array 
 *          - but we create a new array with all old values and the new value that we wanted to store
 * 
 * ? IMMUTABILITY
 *      - where we never edit existing values but we replace them with COPIES that we create plus the changes that we want to made!
 * (copy original array and edit the copied array)
 * 
 * [step #1]
 * ? copy an array: 
 * (this creates a new array with same elements but different reference value)
 *      - use slice()
 *      - use spread operator 
 * [ex]
const copyWithSlice = hobbyArr.slice();
const copyWithSpread = [...hobbyArr];       
 * 
 * (pull elements / objects out of an array / object) >>> SPREAD
 * * SPREAD:
 * - this takes an array and pulls out all elements or properties of that respective arr or obj and puts into whatever it is surrounded with  
 * [if it is surrounded with an array, and pulls out of an existing array and adds it to new array]
 * 
 * * REST:
 * - opposite of SPREAD >>> which takes in values and pack / bundle them into specified array or object
 * 
 * [problem]
const arrWithRest = (ar1, ar2, ar3, ar4) => {
  return [ar1, ar2, ar3, ar4];
};
console.log(arrWithRest(1, 2, 3, 4));
 * 
 * - what if we have 100 elements that we shall pass into above function and to make an array out of those arguments(arN)
 * (so we use rest operator)
 * [code]
 * ------
const arrWithRest = (...args) => {
    return args         // - [1, 2, 3, 4]
    // return [...args];        // - we spread already made array into a new array here!
};
console.log(arrWithRest(1, 2, 3, 4));     
 * 
 * $ NOTE:
 * - REST is similar to SPREAD.. it makes a diff where we use it defines it!
 * (merge multiple elements / properties into an array / object and using as an argument list of a fn) >>> REST
 * 
 * * DESTRUCTURING:
 * - pulls out values from an array OR an object and creates a new variable on the name of property-key 
 *      - two types: array and object destructuring
 * [problem]
 * ---------
const person = { name: "Harsha" }

const printName = (personData) => {
  console.log(personData.name);         // - without getting every property from an object we can use: "destructuring"
};
printName(person);
 * 
 * [solution]
 * ----------
// >>> destructure inside function
const person = { name: "Harsha" };      // - just have to destructure only the property-key that we are interested in!

const printName = ({ name }) => {
  console.log(name);
};
printName(person);

// >>> destructure within a variable
const { personName } = personObj
 * 
 * $ NOTE
 * - [key must match with the key that we are pulling out of an object] 
 * 
// >>> array destructuring
const hobbies = ["programming", "sports"]
const [hob1, hob2] = hobbies
console.log(hob1, hob2)         // - here we are logging off two variables that were created upon destructuring!

res:
programming sports      // - these are not wrapped around '[]' as we are logging off two variables
 * 
 * $ SUMMARY:
 * - we can provide variable names that whatever we want inside ARRAY-DESTRUCTURING 
 *      - but variable names upon OBJECT-DESTRUCTURING must match the keys of that object
 * 
 * * Async Code & Promises 
 * - code that executes after a certain time.. [case: when ever we fetch data from an API]
 * 
 * >>> setTimeout:
 * - in-built inside JS which executes a callback-fn (1st arg) after user-specified time (2nd arg)
 *    - callback-fn will be executed after some time in future [so it will be called later in time]
 * [syn]
 * setTimeout(function () {}, 2000)
 * 
 * [ex]
 * ----
setTimeout(function () {
    console.log("Hello")        // - executed after 2000 milliseconds that is 2 seconds!
}, 2000)
 * 
 * - even though we specified 0 milliseconds inside 2nd arg.. fn inside 1st arg will execute "ASYNCHRONOUSLY"
 * [ex]
 * ----
setTimeout(function () {
    console.log("Hello")
}, 0)                           // - even though 0 sec were specified.. "Hi" & "From JS!" 1st executed! 
console.log("Hi")   
console.log("From JS!")     // - synchronous (line-by-line) execution [even these are below async code with 0 ms.. these executed 1st]

res:
    Hi
    From JS!
    Hello
 * 
 * * ASYNCHRONOUS:
 *       - where this type of code does not block the other [opposite to SYNCHRONOUS]!
 * 
 * >>> ways to handle asynchronous-code
 * [callback-fn]
 *    - this is the oldest way of handling asynchronous code 
 *    - may face problems if we have depending async operations
 * 
 * PROBLEM #1 [nested async-calls]
 * ----------
// >>> nested async-calls
const fetchData = (callbackFn) => {
  setTimeout(() => {
    callbackFn("Done!");
  }, 2000);
};

setTimeout(() => {
  console.log("inside setTimeout!");
  fetchData((text) => {
    console.log(text)
  })
}, 2000);
 * 
 * - it gets deeper into callbacks.. to avoid confusion [we use PROMISES]
 * 
 * SOLUTION [promises]
 * --------
// >>> promises
const fetchDataWithPromise = () => {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      res("Fetched!");
    }, 2000);
  });
  return promise;
};

// >>> promise-chaining
setTimeout(() => {
  console.log("promises");
  fetchDataWithPromise()
    .then((data) => {
      console.log(data);            // - if promise here is not resolved yet.. then return same function
      return fetchDataWithPromise();  
    })
    .then((data2) => console.log(data2));   // - resolve it here using again attaching another "then" 
}, 2000);
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */