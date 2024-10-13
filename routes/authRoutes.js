const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, loginUser, addUser, changeStatus } = require('../controllers/authControllers');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://traveltrove:1234@cluster0.3md4l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connected to MongoDB'))
   .catch((err) => console.error('Error connecting to MongoDB', err));


   const guideSchema = new mongoose.Schema({
    title: String,
    location: String,
    type: String,
    cost: Number,
    popularity: String,
    pricePerPerson: Number,
    imgUrl: String,
  });
  
  const Guide = mongoose.model('Guide', guideSchema);

router.use(
    cors({
        credentials : true,
        // origin : 'https://ridexcarrentals.vercel.app'
        origin: 'http://localhost:3000'
    })
);

router.get('/guides', async (req, res) => {
    try {
      const guides = await Guide.find();
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.get('/',test);
router.post('/loginUser',loginUser);
router.post('/signup', addUser);
router.post('/changeStatus', changeStatus);


module.exports = router;
