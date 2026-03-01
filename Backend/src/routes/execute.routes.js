const express = require("express");
const executeController = require("../controllers/execute.controller");

const router = express.Router();

router.post("/", executeController.executeCode);

module.exports = router; 