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
 * >>> Arrays, Objects & Reference Types
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
 * >>> Understanding Spread & Rest Operators
 * [spread]
 *      - when we add a new element inside an array, by not editing original array 
 *          - but we create a new array with all old values and the new value that we wanted to store
 * 
 * * IMMUTABILITY
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
 * >>> destructuring
 * [problem]
const person = {
  name: "Harsha",
};
const printName = (personData) => {
  console.log(personData.name);         // - 
};
printName(person);
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