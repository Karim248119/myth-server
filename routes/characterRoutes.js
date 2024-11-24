const express = require("express");
const characterController = require("../controllers/characterController");

const router = express.Router();

router.post("/:mythologyId/characters", characterController.addCharacter);

//updarte
router.put(
  "/:mythologyId/characters/:characterName",
  characterController.updateCharacter
);

// Delete a chapter
router.delete(
  "/:mythologyId/characters/:characterName",
  characterController.deleteCharacter
);

//get by name
router.get(
  "/:mythologyId/:characterName",
  characterController.getCharacterByName
);

module.exports = router;
