const express = require("express");
const sectionController = require("../controllers/sectionController");

const router = express.Router();

router.post(
  "/:mythologyId/characters/:characterName/sections",
  sectionController.addSection
);
// Update a section
router.put(
  "/:mythologyId/characters/:characterName/sections/:sectionId",
  sectionController.updateSection
);

// Delete a section
router.delete(
  "/:mythologyId/characters/:characterName/sections/:sectionId",
  sectionController.deleteSection
);

// DELETE /mythologies/:mythologyId/characters/:characterName/sections
router.delete(
  "/:mythologyId/characters/:characterName/sections",
  sectionController.deleteAllSections
);

module.exports = router;
