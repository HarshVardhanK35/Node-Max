// we read a DOG breed inside a text-file .. we do a HTTP req to get an image of that breed .. save that image to another text-file
// URL: "https://dog.ceo/api/breed/hound/images/random"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const images = all.map((el) => el.body.message);
    console.log(images);

    await writeFilePromise("dog-img.txt", images.join("\n"));
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

// writingDogImg()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("Error");
//   });

// readFilePromise("./dog.txt", "utf-8")
//   .then((data) => {
//     console.log(data);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     writeFilePromise("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog image saved to file!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
