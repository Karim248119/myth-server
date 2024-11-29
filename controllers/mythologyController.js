const Mythology = require("../models/Mythology");

const addMythology = async (req, res) => {
  try {
    const mythology = new Mythology({
      name: req.body.name,
      chapters: req.body.chapters || [], // Default to empty array if not provided
    });

    // Save the mythology to the database
    await mythology.save();

    // Send the response
    res.status(201).json(mythology);
  } catch (error) {
    console.error("Error adding mythology:", error);
    res
      .status(500)
      .json({ message: "Error adding mythology", error: error.message });
  }
};

//delete
const deleteMythology = async (req, res) => {
  const { mythologyId } = req.params;

  try {
    const deletedMythology = await Mythology.findByIdAndDelete(mythologyId);
    if (!deletedMythology) {
      return res.status(404).json({ message: "Mythology not found" });
    }

    res.status(200).json({
      message: "Mythology deleted successfully",
      deletedMythology,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting mythology", error: error.message });
  }
};

//update

const updateMythology = async (req, res) => {
  const { mythologyId } = req.params;

  try {
    const updatedMythology = await Mythology.findByIdAndUpdate(
      mythologyId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMythology) {
      return res.status(404).json({ message: "Mythology not found" });
    }

    res.status(200).json({
      message: "Mythology updated successfully",
      updatedMythology,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating mythology", error: error.message });
  }
};

// Get all mythologies
const getAllMythologies = async (req, res) => {
  try {
    const mythologies = await Mythology.find();
    res.status(200).json(mythologies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching mythologies", error: error.message });
  }
};

// Get a single mythology by ID
const getMythologyById = async (req, res) => {
  const { mythologyId } = req.params;

  try {
    const mythology = await Mythology.findById(mythologyId);
    if (!mythology) {
      return res.status(404).json({ message: "Mythology not found" });
    }

    res.status(200).json(mythology);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching mythology", error: error.message });
  }
};

// Get a single mythology by Name

const getMythologyByName = async (req, res) => {
  try {
    const { name } = req.params;
    const mythology = await Mythology.findOne({ name: name });
    if (!mythology) {
      return res.status(404).json({ message: "Mythology not found" });
    }
    res.status(200).json(mythology);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching mythology", error: error.message });
  }
};

module.exports = {
  addMythology,
  getAllMythologies,
  getMythologyById,
  getMythologyByName,
  deleteMythology,
  updateMythology,
};
