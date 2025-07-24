// ! Asynchronous JavaScript: Promises and Async/Await
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/**
 * ! 1. The Problem with Callbacks: Callback Hell
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * - to demonstrate the effect of CALLBACK-HELL 
 *      - we read a DOG breed inside a text-file .. we do a HTTP req to get an image of that breed [use API] .. save that image to another text-file
 * 
 * - to fetch data from an API we are using a 3rd party package: "superagent"
 * 
 * - to install a package from NPM [we need package.json at 1st]
 *      - so, we have to 1st initialize the NPM! [using: npm init -y]
 * 
 * - now we can install that package "superagent" [using npm i superagent]
 * 
 * [example]
 * ---------
const fs = require("fs");
const superagent = require("superagent");

fs.readFile("./dog.txt", "utf-8", (err, breed) => {     // - callback #1
  console.log(breed);

  superagent.get(
    `https://dog.ceo/api/breed/${breed}/images/random`,
    (err, res) => {                                                     // - callback #2
      if (err) return console.log(err.message);
      console.log(res.body.message);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {          // - callback #3
        if (err) return console.log(err.message);       
        console.log(`${breed} image saved to the file`);
      });
    }
  );
});
 * 
 * - pattern of callback hell.. when we have callbacks inside of callbacks
 *      - having multiple levels of callbacks make harder to maintain code!
 * 
 * ? [PROBLEM]
 * - non-maintainable code and hard to read by having nested callbacks
 * 
 * >>> [solution]
 *      - avoiding callback hell using PROMISES
 * 
 * ! 2. From Callback Hell to Promises
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * - superagent supports PROMISES but core node module functions does not support PROMISES 
 *      - [so we have to build the promise ourselves]
 * 
 * * [PROMISE]
 * - implements a concept of future value
 *      - a value we are expecting to be received some time in future!     
 * 
 * - there are two stages with PROMISES
 *                            /       \
 * -                    PENDING       RESOLVED
 *                                    /       \
 * -                          FULFILLED       REJECTED
 * 
 * - initially every PROMISE will be in PENDING state
 * - after we consume it.. it comes with data.. so it will be a RESOLVED promise!
 *      - RESOLVED promise can either be FULFILLED or REJECTED 
 * 
 * - FULFILLED promise comes with the data from an API 
 * - REJECTED promise if there was an error 
 * 
 * >>> consuming promises
 * - as superagent.get() returns a promise and "then" is used to consume that promise
 * 
 * - promise().then() only handles fulfilled promises
 * - but promise().catch() only handles if there was an error 
 * 
 * [code]
 * ------
const fs = require("fs");
const superagent = require("superagent");

fs.readFile("./dog.txt", "utf-8", (err, breed) => {     // - callback #1
  console.log(breed);

  superagent
    .get(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {      // - callback #2
        if (err) return console.log(err.message);
        console.log(`${breed} image saved to the file`);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
 * 
 * - in above code we consumed a promise with "then" and "catch"
 * 
 * - superagent(url).get(`https://dog.ceo/api/breed/${breed}/images/random`)
 *      - this returns a promise.. so we used "then" to consume that promise
 * 
 * - even we used PROMISES here.. we have callbacks in the code 
 * 
 * 
 * ! 3. Building Promises
 * -=-=-=-=-=-=-=-=-=-=-=-
 * (promisify read-file and write-file node modules.. so that they will return PROMISES)
 * [code]
 * ------

const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file, encoding) => {       // - promisify "readFile" function 
  return new Promise((res, rej) => {
    fs.readFile(file, encoding, (err, data) => {
      if (err) rej("File not found!");
      res(data);
    });
  });
};

const writeFilePromise = (file, data) => {          // - promisify "writeFile" function 
  return new Promise((res, rej) => {
    fs.writeFile(file, data, (err) => {
      if (err) rej("Error in writing to a file!");
      res("success");
    });
  });
};

readFilePromise("./dog.txt", "utf-8")
  .then((data) => {
    console.log(data);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    writeFilePromise("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file!");
  })
  .catch((err) => {
    console.log(err);
  });
 * 
 * >>> readFilePromise 
 * - which is a function which runs "readFile" an asynchronous operation behind the scenes
 *      - but this fn returns a PROMISE
 * [so that we can use returned PROMISE instead of CALLBACK]
 * 
 * >>> [new Promise((res, rej) => {...})]
 * - Promise constructor takes an executer fn 
 *      - [this will be called immediately when promise was created]
 * 
 * - Promise again takes in args: RESOLVE and REJECT functions 
 *      - [resolve func:    calling this fn.. marks promise as successful]  >>> [return successful value from a PROMISE]
 *      - [reject func:     calling this fn.. marks promise as error]       >>> [return error from a PROMISE]
 * 
 * >>> resolve(data)
 * - whatever the argument that is passed into this func.. will be available as an argument inside.. 
 *      - "then" when consumed.. 
 * 
 * >>> reject(err)
 * - if there is an error..
 *      - this argument will be caught inside "catch" method when used with promise!
 * 
 * $ SUMMARY:
 * - we prevented the TRIANGULAR shaped pattern with "callback-hell"..
 *      - with FLAT shaped pattern of "promise-chaining"
 * 
 * 
 * ! 4. Consuming Promises with Async/Await
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (new feature that was introduced in ES8)
 * 
 * - to use ASYNC/AWAIT... we have to convert a normal fn into "asynchronous function"
 *      - that can be done as follows... 
 * [ex]
 * ----
// - function declaration:
    async function fnName(param1, param2) {...}

// - function expression:
    const fnName = async function(param1, param2) {...}

// - arrow function:
    const fnName = async(param1, param2) => {...}
 * 
 * - using async keyword before function keyword makes that function "asynchronous"
 *      - which keeps running in background! [while performing other code that was inside file]
 * [which will not block the rest of the code]
 * 
 * - we can have one or more await expressions inside an async function
 * ...
 * [ex]
 * ----
const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file, encoding) => {
  return new Promise((res, rej) => {
    fs.readFile(file, encoding, (err, data) => {
      if (err) rej("File not found!");
      res(data);
    });
  });
};
const writeFilePromise = (file, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(file, data, (err) => {
      if (err) rej("Error in writing to a file!");
      res("success");
    });
  });
};
const writingDogImg = async () => {
  const data = await readFilePromise("./dog.txt", "utf-8");     // - using await on "readFilePromise" promise
  // console.log(data);

  const res = await superagent.get(                         // - using await on "superagent.get" promise
    `https://dog.ceo/api/breed/${data}/images/random`
  );
  // console.log(res.body.message);

  await writeFilePromise("dog-img.txt", res.body.message);      // - using await on "writeFilePromise" promise
  console.log("Random dog image saved to file!");
};
writingDogImg();
 * 
 * 
 * - without having promise and "then" on that promise.. we can simply have async-function and await on a promise
 *      - [while promise in "PENDING" state] await on a promise stops the execution of that promise..
 *          - [stops the code until..] promise turns into FULFILLED state
 *          [that is "await" stops until it gets data from a promise]
 * 
 * >>> to handle errors:
 * [ex]
 * ----
const writingDogImg = async () => {
  try {
    const data = await readFilePromise("./dog.txt", "utf-8");
    // console.log(data);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    // console.log(res.body.message);

    await writeFilePromise("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file!");
    //
  } catch (err) {
    console.log(err);
  }
};
writingDogImg();
 * 
 * - used try-catch block a standard JS way of handling errors!
 * 
 * 
 * ! 5. Returning Values from Async Functions
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * - async functions work on background.. 
 *      - even though there are normal synchronous fns wrapping around async fns
 *          - as async fns work asynchronously it lets the synchronous code to get executed 1st!
 * 
 * - whenever we return a variable from an asynchronous fn..
 *      - which inturn returns a promise
 * 
 * * therefore an async function returns a promise - with "pending" state
 * Promise { <pending> }
 * 
 * - so we can chain use a "then" to consume again that promise from async-fn
 *      
 * [ex]
 * ----
const writingDogImg = async () => {
  try {
    const data = await readFilePromise("./dogg.txt", "utf-8");      // - even there is an error while reading the file name here
    ...
  } 
  catch (err) {
    console.log(err);
  }
  return "ready to serve";      // - consuming this async fn by attaching then method would resolve it [even there is an error]
};

writingDogImg()
    .then((res) => {
        console.log(res);
    })
    .catch(err => {
        console.log(err)    // - this will not work even there is an error in reading a file [so throw an error]
    })
 * 
 * - whenever we return a value from an asynchronous func. 
 *      - it still resolves as a successful promise and treats that there was no error!
 * [it still marks as successful.. so it resolves it!]
 * 
 * - we have to throw an error from async to mark it as unsuccessful.. 
 *      - so we have to use: throw new Error("")
 * 
 * >>> throw an error:
 * [ex]
 * ----
const writingDogImg = async () => {
  try {
    const data = await readFilePromise("./dogg.txt", "utf-8");      // - error here: file name was wrong!

    ...

  } catch (err) {
    console.log(err);
    throw err;              // - throwing an error here.. [throwing an error can make whole async-fn rejected].. 
  }
  return "ready to serve";
};

writingDogImg()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {         // - error thrown from async-fn caught here!
    console.log("Error");
  });
 * 
 * $ NOTE:
 * - throwing an error from async-fn makes async-fn as rejected-promise!
 * - that would be caught inside.. while catching that using "catch" method!
 * 
 * - but we are using then and catch blocks on asynchronous functions again
 *      - to again use async on async fns.. we have to use an IIFE..
 * [ex]
 * ----
(async () => {
  try {
    const x = await writingDogImg();
    console.log(x);
    //
  } catch (err) {
    console.log("Error");
  }
})();
 * 
 * * an IMMEDIATELY INVOKED FUNCTION EXPRESSION
 * - no need of function declaration again! 
 * 
 * $ SUMMARY:
 * - async fn automatically returns a promise and ..
 *      - whatever we return from that function will be result of that promise
 *      - we can handle it using then or we can use async again on that! 
 * 
 * - throw an error from that async-fn will make that function as rejected-promise
 *      - it has to be caught using catch method!
 * 
 * 
 * ! 6. Waiting for Multiple Promises Simultaneously
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (how we can run many promises all at same time!)
 * [ex]
 * ----
const writingDogImg = async () => {
  try {
    const data = await readFilePromise("./dog.txt", "utf-8");

    const res1 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`     |
    );
    const res2 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`     |   // - three promises 
    );
    const res3 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`     |
    );

    await writeFilePromise("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file!");
  } 
  catch (err) {
    console.log(err);
    throw err;
  }
  return "ready to serve";
};
 * 
 * $ NOTE:
 * - three promises wait for each other to complete.. 
 *      - one promise has to wait for previous promise to complete!
 * 
 * (here three promises had to wait for previous promises to complete)!
 * - from this lecture we would know how to run multiple promises in PARALLEL 
 * 
 * * PROMISE.ALL
 * >>> const result = await Promise.all([promise1, promise2, promise3])
 * [ex]
 * ----
const writingDogImg = async () => {
  try {
    const data = await readFilePromise("./dog.txt", "utf-8");
    // console.log(data);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);     // - an array of separate promises! into Promise.all([...])
    const images = all.map((el) => el.body.message);
    console.log(images);

    await writeFilePromise("dog-img.txt", images.join("\n"));       // - array from map fn.. returned an array of strings and joined using "\n" new-line! 
    console.log("Random dog image saved to file!");
    //
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "ready to serve";
};

(async () => {
  try {
    const x = await writingDogImg();
    console.log(x);
    //
  } catch (err) {
    console.log("Error");
  }
})();
 * 
 * 
 * ! COMPLETED !
 * => EXPRESS
 * 
 */
