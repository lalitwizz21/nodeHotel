const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// To create a new person record.
router.post("/", async (req, res) => {
  console.log("-------- person", req.body);
  try {
    const personData = new Person(req.body);
    const response = await personData.save();
    console.log("Person is saved in the records..");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error." });
  }
});

// to get all of the persons details.
router.get("/", async (req, res) => {
  try {
    const person = await Person.find();
    console.log("person: ", person);
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// To get a single person from the database.
// router.get("/:id", async (req, res) => {
//   try {
//     const id = req?.params?.id;
//     console.log("-----id: ", id);
//     const personDetails = await Person.findOne({ _id: id });
//     console.log("personDetails: ", personDetails);
//     res.status(200).json(personDetails);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error." });
//   }
// });

router.get("/:work", async (req, res) => {
  try {
    const work = req?.params?.work;
    if (["Chef", "Manager", "Waiter"].includes(work)) {
      const people = await Person.find({ work: work });
      res.status(200).json(people);
    } else {
      res.status(404).json({ message: "Wrong work type is entered." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// to update the person details.
router.put("/:id", async (req, res) => {
  const id = req?.params?.id;
  try {
    const updatedPerson = await Person.findOneAndUpdate({ _id: id }, req.body, {
      runValidators: true,
      new: true,
    });

    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found." });
    }

    res.status(200).json(updatedPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// to delete the person.
router.delete("/:id", async (req, res) => {
  const id = req?.params?.id;

  try {
    const deletedPerson = await Person.findByIdAndDelete(id);

    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found." });
    }

    res.status(200).json(deletedPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
