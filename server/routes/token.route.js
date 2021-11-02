const router = require('express').Router();
const tokenController = require("../controllers/token.controller");
 
router.post('/gettoken', tokenController);

module.exports = router;