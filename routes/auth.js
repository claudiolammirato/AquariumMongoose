const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authcontroller');

router.post('/register', AuthController.register, (req,res) => {
});
router.post('/login', AuthController.login);


module.exports = router;
