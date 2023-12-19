const express = require('express');
let router = express.Router();
let CommonApi = require("./Routes/Api")

router.use('/Api', CommonApi);

module.exports = router