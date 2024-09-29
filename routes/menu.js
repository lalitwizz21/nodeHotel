const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// To create the item in  menu.
router.post("/", async (req, res) => {
  try {
    const menuData = new Menu(req?.body);
    const response = await menuData.save();
    console.log("item is saved in the menu..");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// To get the menu items.
router.get("/", async (req, res) => {
  try {
    const menuItems = await Menu.find(req.body);
    res.status(200).json(menuItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

router.get("/:taste", async (req, res) => {
  const taste = req?.params?.taste;
  try {
    if (["sweet", "spicy", "sour"].includes(taste)) {
      const menu = await Menu.find({ taste: taste });
      res.status(200).json(menu);
    } else {
      res.status(400).json({ message: "Please enter a valid taste." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// to update the Menu details.
router.put("/:id", async (req, res) => {
  const id = req?.params?.id;
  try {
    const updatedMenu = await Menu.findOneAndUpdate({ _id: id }, req?.body, {
      runValidators: true,
      new: true,
    });

    if (!updatedMenu) {
      return res.status(400).json({ message: "Menu not found." });
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// to delete the Menu.
router.delete("/:id", async (req, res) => {
  const id = req?.params?.id;
  try {
    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(400).json({ message: "Menu not found." });
    }

    console.log(deletedMenu);
    res.status(200).json(deletedMenu);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
