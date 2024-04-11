const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, loginUser, addUser, changeStatus } = require('../controllers/authControllers');

router.use(
    cors({
        credentials : true,
        origin : 'https://ridexcarrentals.vercel.app'
    })
);

router.get('/',test);
router.post('/loginUser',loginUser);
router.post('/signup', addUser);
router.post('/changeStatus', changeStatus);


module.exports = router;
