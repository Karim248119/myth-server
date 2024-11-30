const express = require("express");
const characterController = require("../controllers/characterController");

const router = express.Router();

// Add character to mythology
router.post("/:mythologyName/characters", characterController.addCharacter);

// Update character
router.put(
  "/:mythologyName/characters/:characterName",
  characterController.updateCharacter
);

// Delete character
router.delete(
  "/:mythologyName/characters/:characterName",
  characterController.deleteCharacter
);

// Get character by name
router.get(
  "/:mythologyName/characters/:characterName",
  characterController.getCharacterByName
);

module.exports = router;
