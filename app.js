//jshint esversion:6

const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017';

mongoose.connect("mongodb://127.0.0.1:27017/mongoProject", { useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Why no name?"]
  },
  rating: {
    type: Number,
    min: [1, "We start at 1"],
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema); // creating a new collection according to a certain schema

const fruit = new Fruit ({
  name: "Pear",
  rating: 6,
  review: ""
});

const kiwi = new Fruit ({
  name: "kiwi",
  rating: 3,
  review: "Ugh"
});

const pineapple = new Fruit ({
  name: "Pineapple",
  rating: 9,
  review: "Great fruit"
});

// promise function to save multiple data objects (you can also use async/wait)

// Fruit.insertMany([kiwi, orange])
// .then(function(){
//     console.log("Succesfully saved all fruits")  // Success
// }).catch(function(err){
//     console.log(err)      // Failure
// });

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
  name: "Amy",
  age: 18,
  favouriteFruit: pineapple
});

//async/wait function to retrieve data (you can also use promise)

async function fetchFruit() {
  try {
    const fruits = await Fruit.find({})
    .select("name")
    .exec();

    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });

  } catch (error) {
    console.error(error);
  }
};

async function updateFruit() {
  try {
    const fruits = await Fruit.updateOne({_id: "64cb9d81481ec45042f11220" }, { review: "Pretty" })
    .exec();
  } catch (error) {
    console.error(error);
  }
};

async function deleteFruit() {
  try {
    const fruits = await Fruit.deleteOne({_id: "64cb6c29ad9c7154374e4262" })
    .exec();
    } catch (error) {
      console.error(error);
    }
};

async function deletePerson() {
  try {
    const people = await Person.deleteOne({_id: "64cb727c5e04ac9618065d6f" })
    .exec();
    } catch (error) {
      console.error(error);
    }
};

async function updatePerson() {
  try {
    const persons = await Person.updateOne({_id: "64cbac295bf5def612dcf5a0" }, { favouriteFruit: pineapple })
    .exec();
  } catch (error) {
    console.error(error);
  }
};

async function deletePeople() {
  try {
    const people = await Person.deleteMany({ name: /John/})
    .exec();
    } catch (error) {
      console.error(error);
    }
}

// Call async functions sequentially

(async () => {
  try {
    // await fruit.save();
    // await pineapple.save();
    // await person.save();
    // await updateFruit();
    // await deleteFruit();
    // await updatePerson();
    // await deletePerson();
    // await deletePeople();
    await fetchFruit();
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
})();
