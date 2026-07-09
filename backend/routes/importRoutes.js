const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { importCSV } = require("../controllers/importController");

router.post("/import", upload.single("file"), importCSV);

module.exports = router;