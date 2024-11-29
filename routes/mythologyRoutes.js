const express = require("express");
const mythologyController = require("../controllers/mythologyController");

const router = express.Router();

router.post("/", mythologyController.addMythology);
router.get("/", mythologyController.getAllMythologies);
router.get("/:mythologyId", mythologyController.getMythologyById);
router.get("/:mythologyName", mythologyController.getMythologyByName);
router.put("/:mythologyId", mythologyController.updateMythology);
router.delete("/:mythologyId", mythologyController.deleteMythology);

module.exports = router;
